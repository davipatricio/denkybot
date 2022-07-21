/* eslint-disable no-await-in-loop */
import { parseTime } from '#helpers/Timestamp';
import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Colors, ComponentType, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import ms from 'ms';

const Cooldowns = new Map<string, number>();

export default class LockdownCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'LOCKDOWN';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageGuild] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    // if (interaction.guild!.memberCount < 30) {
    //   interaction.editReply(`❌ ${interaction.user} **|** O servidor possui menos de 30 membros, não é possível bloquear todos os canais.`);
    //   return;
    // }

    switch (interaction.options.getSubcommand(true)) {
      case 'enable':
        this.#enableLockdown({ t, interaction });
        break;
      case 'disable':
        this.#disableLockdown({ t, interaction });
        break;
      case 'unlockdown':
        this.#scheduleUnlockdown({ t, interaction });
        break;
    }
  }

  async #scheduleUnlockdown({ t, interaction }: CommandRunOptions) {
    const lockdown = await this.client.databases.getLockdown(interaction.guild!.id);
    if (!lockdown) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:lockdown/sched/no-lockdown')}`);
      return;
    }
    const unlockdown = await this.client.databases.unlockdownTask.findFirst({ where: { guildId: interaction.guild!.id } }).catch(() => undefined);
    if (unlockdown) {
      interaction.editReply(`✅ ${interaction.user} **|** ${t('command:lockdown/sched/deleted')}`);
      await this.client.databases.unlockdownTask.delete({ where: { guildId: interaction.guild!.id } }).catch(() => {});
      return;
    }

    const { valid, type, value } = parseTime(interaction.options.getString('duration', true));
    if (!valid || !value) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:giveaway/create/invalid-time')}`);
      return;
    }
    const now = Date.now();
    const endTimestamp = type === 'full' ? value : now + value;

    // allow schedules with durations between 30 seconds and 7 days
    if (endTimestamp - now <= 0 || endTimestamp - now < ms('30s')) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:giveaway/create/time-low')}`);
      return;
    }
    if (endTimestamp - now > ms('7d')) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:giveaway/create/time-big')}`);
      return;
    }

    await this.client.databases.unlockdownTask.create({
      data: {
        guildId: interaction.guild!.id,
        endTimestamp
      }
    });
    interaction.editReply(`✅ ${interaction.user} **|** `);
  }

  async #enableLockdown({ t, interaction }: CommandRunOptions) {
    const lockdown = await this.client.databases.getLockdown(interaction.guild!.id);
    if (lockdown) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:lockdown/enable/blocked')}`);
      return;
    }
    let cooldown = Cooldowns.get(interaction.guild!.id);
    if (cooldown) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:lockdown/enable/cooldown', ms(cooldown - Date.now()))}`);
      return;
    }

    const confirmationRow = new ActionRowBuilder<ButtonBuilder>().setComponents([
      new ButtonBuilder().setCustomId('enable').setEmoji('🔒').setLabel(t('command:lockdown/buttons/yes')).setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('cancel').setEmoji('❌').setLabel(t('command:lockdown/buttons/no')).setStyle(ButtonStyle.Secondary)
    ]);

    const message = await interaction.editReply({
      content: `⚠️ ${interaction.user} **|** ${t('command:lockdown/enable/ask/line1')}
⚙️ **|** ${t('command:lockdown/enable/ask/line2')}
🛡️ **|** ${t('command:lockdown/enable/ask/line3')}`,
      components: [confirmationRow]
    });

    const collector = message.createMessageComponentCollector<ComponentType.Button>({
      filter: m => m.user.id === interaction.user.id,
      time: 60000,
      max: 1
    });

    collector.on('collect', async int => {
      await int.deferUpdate();
      cooldown = Cooldowns.get(interaction.guild!.id);
      if (cooldown) {
        message.edit({ content: `❌ ${interaction.user} **|** ${t('command:lockdown/enable/cooldown', ms(cooldown - Date.now()))}`, components: [] });
        return;
      }

      if (int.customId === 'cancel') {
        message.edit({ content: `❌ ${interaction.user} **|** ${t('command:lockdown/enable/cancelled')}`, components: [] });
        Cooldowns.delete(interaction.guild!.id);
        return;
      }
      Cooldowns.set(interaction.guild!.id, Date.now() + ms('30s'));
      message.edit({ content: `⏲️ ${interaction.user} **|** ${t('command:lockdown/enable/locking')}`, components: [] });

      await this.client.databases.createLockdown({ guildId: interaction.guild!.id, blockedChannels: [] });

      const blockedChannels: string[] = [];
      const couldNotBlockChannels: string[] = [];
      const alreadyBlocked: string[] = [];
      const noPerms: string[] = [];

      const allowedChannelTypes = [ChannelType.GuildText, ChannelType.GuildVoice, ChannelType.GuildVoice];
      const canais = (await interaction.guild!.channels.fetch()).filter(c => allowedChannelTypes.includes(c.type));

      if (!canais.size) {
        await this.client.databases.deleteLockdown(interaction.guild!.id);
        message.edit(`❌ ${interaction.user} **|** ${t('command:lockdown/enable/nochannels')}`);
        setTimeout(() => Cooldowns.delete(interaction.guild!.id), ms('20s')).unref();
        return;
      }

      for (const canal of canais.values()) {
        if (!canal.manageable) {
          noPerms.push(canal.id);
          continue;
        }

        const permissionCached = canal.permissionOverwrites.cache.get(interaction.guild!.id);
        if (!permissionCached) {
          await canal.permissionOverwrites
            .create(interaction.guild!.id, { SendMessages: false, Connect: false }, { reason: t('command:lockdown/enable/auditlog', interaction.user.tag) })
            .then(() => blockedChannels.push(canal.id))
            .catch(() => couldNotBlockChannels.push(canal.id));
          continue;
        }

        if (
          permissionCached.allow.has(PermissionFlagsBits.Connect) ||
          permissionCached.allow.has(PermissionFlagsBits.SendMessages) ||
          (!permissionCached.allow.has(PermissionFlagsBits.Connect) && !permissionCached.deny.has(PermissionFlagsBits.Connect)) ||
          (!permissionCached.allow.has(PermissionFlagsBits.SendMessages) && !permissionCached.deny.has(PermissionFlagsBits.SendMessages))
        ) {
          await permissionCached
            .edit({ SendMessages: false, Connect: false }, t('command:lockdown/enable/auditlog', interaction.user.tag))
            .then(() => blockedChannels.push(canal.id))
            .catch(() => couldNotBlockChannels.push(canal.id));
        } else alreadyBlocked.push(canal.id);
        continue;
      }

      const finalEmbed = new EmbedBuilder()
        .setTimestamp()
        .setTitle(t('command:lockdown/enable/embed/title'))
        .setDescription(
          blockedChannels
            .slice(0, 15)
            .map(i => `<#${i}>`)
            .join(' ') || t('command:lockdown/enable/embed/empty')
        )
        .setColor(Colors.Blurple);
      await this.client.databases.deleteLockdown(interaction.guild!.id);

      if (blockedChannels.length) {
        await this.client.databases.createLockdown({ guildId: interaction.guild!.id, blockedChannels });
        finalEmbed.setFooter({ text: `⚠️ ${t('command:lockdown/enable/embed/footer/done')}` });
      } else finalEmbed.setFooter({ text: `⚠️ ${t('command:lockdown/enable/embed/footer/nochannels')}` });

      if (couldNotBlockChannels.length)
        finalEmbed.addFields([
          {
            name: t('command:lockdown/enable/embed/couldnot-block'),
            value:
              couldNotBlockChannels
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || t('command:lockdown/enable/embed/empty')
          }
        ]);
      if (alreadyBlocked.length)
        finalEmbed.addFields([
          {
            name: t('command:lockdown/enable/embed/already-blocked'),
            value:
              alreadyBlocked
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || t('command:lockdown/enable/embed/empty')
          }
        ]);
      if (noPerms.length)
        finalEmbed.addFields([
          {
            name: t('command:lockdown/enable/embed/no-permission'),
            value:
              noPerms
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || t('command:lockdown/enable/embed/empty')
          }
        ]);

      Cooldowns.set(interaction.guild!.id, Date.now() + ms('5m'));
      setTimeout(() => Cooldowns.delete(interaction.guild!.id), ms('5m')).unref();
      message.edit({
        content: `✅ ${interaction.user} **|** ${t('command:lockdown/enable/done', blockedChannels.length)}
⏰ **|** ${t('command:lockdown/enable/done2')}`,
        embeds: [finalEmbed]
      });
    });

    collector.on('end', collected => {
      if (!collected.size) message.edit({ content: `❌ ${interaction.user} **|** ${t('command:lockdown/no-answer')}`, components: [] });
    });
  }

  async #disableLockdown({ t, interaction }: CommandRunOptions) {
    const lockdown = await this.client.databases.getLockdown(interaction.guild!.id);
    if (!lockdown) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:lockdown/disable/blocked')}`);
      return;
    }
    let cooldown = Cooldowns.get(interaction.guild!.id);
    if (cooldown) {
      // TODO: use normal ints instead of BigInts
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:lockdown/disable/cooldown', ms(cooldown - Date.now()))}`);
      return;
    }

    const confirmationRow = new ActionRowBuilder<ButtonBuilder>().setComponents([
      new ButtonBuilder().setCustomId('enable').setEmoji('🔒').setLabel(t('command:lockdown/buttons/yes')).setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('cancel').setEmoji('❌').setLabel(t('command:lockdown/buttons/no')).setStyle(ButtonStyle.Secondary)
    ]);
    const message = await interaction.editReply({
      content: `⚠️ ${interaction.user} **|** ${t('command:lockdown/disable/ask/line1')}
🛡️ **|** ${t('command:lockdown/disable/ask/line2')}
💡 **|** ${t('command:lockdown/disable/ask/line3', lockdown.blockedChannels.length)}`,
      components: [confirmationRow]
    });

    const collector = message.createMessageComponentCollector<ComponentType.Button>({
      filter: m => m.user.id === interaction.user.id,
      time: 60000,
      max: 1
    });

    collector.on('collect', async int => {
      await int.deferUpdate();
      cooldown = Cooldowns.get(interaction.guild!.id);
      if (cooldown) {
        message.edit({ content: `❌ ${interaction.user} **|** ${t('command:lockdown/disable/cooldown', ms(cooldown - Date.now()))}`, components: [] });
        return;
      }

      if (int.customId === 'nao') {
        message.edit({ content: `❌ ${interaction.user} **|** ${t('command:lockdown/disable/cancelled')}`, components: [] });
        Cooldowns.delete(interaction.guild!.id);
        return;
      }
      Cooldowns.set(interaction.guild!.id, Date.now() + ms('30s'));
      message.edit({ content: `⏲️ ${interaction.user} **|** ${t('command:lockdown/disable/unlocking')}`, components: [] });

      const canais = (await interaction.guild!.channels.fetch()).filter(c => lockdown.blockedChannels.includes(c.id));
      if (!canais.size) {
        message.edit({ content: `✅ ${interaction.user} **|** ${t('command:lockdown/disable/nochannels')}` });
        setTimeout(() => Cooldowns.delete(interaction.guild!.id), ms('20s')).unref();
        await this.client.databases.deleteLockdown(interaction.guild!.id);
        return;
      }

      const unblockedChannels: string[] = [];
      const couldNotUnBlockChannels: string[] = [];
      const alreadyUnBlocked: string[] = [];
      const noPerms: string[] = [];

      for (const canal of canais.values()) {
        if (!canal.manageable) {
          noPerms.push(canal.id);
          continue;
        }

        const permissionCached = canal.permissionOverwrites.cache.get(interaction.guild!.id);
        if (!permissionCached) {
          await canal.permissionOverwrites
            .create(interaction.guild!.id, { SendMessages: null }, { reason: t('command:lockdown/disable/auditlog', interaction.user.tag) })
            .then(() => unblockedChannels.push(canal.id))
            .catch(() => couldNotUnBlockChannels.push(canal.id));
          continue;
        }
        if (permissionCached.deny.has(PermissionFlagsBits.SendMessages) || permissionCached.deny.has(PermissionFlagsBits.Connect)) {
          await permissionCached
            .edit({ SendMessages: null, Connect: null }, t('command:lockdown/disable/auditlog', interaction.user.tag))
            .then(() => unblockedChannels.push(canal.id))
            .catch(() => couldNotUnBlockChannels.push(canal.id));
        } else alreadyUnBlocked.push(canal.id);
      }

      const finalEmbed = new EmbedBuilder()
        .setTitle(t('command:lockdown/disable/embed/title'))
        .setDescription(
          unblockedChannels
            .slice(0, 15)
            .map(i => `<#${i}>`)
            .join(' ') || t('command:lockdown/disable/embed/empty')
        )
        .setColor(Colors.Blurple)
        .setTimestamp();

      await this.client.databases.deleteLockdown(interaction.guild!.id);
      if (unblockedChannels.length) finalEmbed.setFooter({ text: `⚠️ ${t('command:lockdown/disable/embed/footer/done')}` });
      else finalEmbed.setFooter({ text: `⚠️ ${t('command:lockdown/disable/embed/footer/nochannels')}` });

      if (couldNotUnBlockChannels.length)
        finalEmbed.addFields([
          {
            name: t('command:lockdown/disable/embed/couldnot-unblock'),
            value:
              couldNotUnBlockChannels
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || t('command:lockdown/disable/embed/empty')
          }
        ]);
      if (alreadyUnBlocked.length)
        finalEmbed.addFields([
          {
            name: t('command:lockdown/disable/embed/already-unblocked'),
            value:
              alreadyUnBlocked
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || t('command:lockdown/disable/embed/empty')
          }
        ]);
      if (noPerms.length)
        finalEmbed.addFields([
          {
            name: t('command:lockdown/disable/embed/no-permission'),
            value:
              noPerms
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || t('command:lockdown/disable/embed/empty')
          }
        ]);

      Cooldowns.set(interaction.guild!.id, Date.now() + ms('5m'));
      setTimeout(() => Cooldowns.delete(interaction.guild!.id), ms('5m')).unref();
      message.edit({ content: `✅ ${interaction.user} **|** ${t('command:lockdown/disable/done', unblockedChannels.length)}`, embeds: [finalEmbed] });
    });

    collector.on('end', collected => {
      if (!collected.size) message.edit({ content: `❌ ${interaction.user} **|** ${t('command:lockdown/no-answer')}`, components: [] });
    });
  }
}
