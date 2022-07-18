/* eslint-disable no-await-in-loop */
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ComponentType, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import ms from 'ms';
import { Command, CommandRunOptions } from '../../structures/Command';
import type { DenkyClient } from '../../types/Client';

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
      case 'ativar':
        this.#enableLockdown({ t, interaction });
        break;
      case 'desativar':
        this.#disableLockdown({ t, interaction });
        break;
    }
  }

  async #enableLockdown({ interaction }: CommandRunOptions) {
    const lockdown = await this.client.databases.getLockdown(interaction.guild!.id);
    if (lockdown) {
      interaction.editReply(`❌ ${interaction.user} **|** O servidor já está bloqueado.`);
      return;
    }
    let cooldown = Cooldowns.get(interaction.guild!.id);
    if (cooldown) {
      interaction.editReply(`❌ ${interaction.user} **|** O servidor realizou um lockdown recentemente. Aguarde ${ms(cooldown - Date.now())} para desbloqueá-lo.`);
      return;
    }

    const confirmationRow = new ActionRowBuilder<ButtonBuilder>().setComponents([
      new ButtonBuilder().setCustomId('enable').setEmoji('🔒').setLabel('Sim').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('cancel').setEmoji('❌').setLabel('Não').setStyle(ButtonStyle.Secondary)
    ]);

    const message = await interaction.editReply({
      content: `⚠️ ${interaction.user} **|** Você tem certeza que deseja bloquear **todos os canais** que membros podem atualmente enviar mensagens? Esta ação não poderá ser interrompida após iniciada.
⚙️ **|** Será possível reverter esta ação utilizando \`/lockdown desbloquear\`.
🛡️ **|** É possível iniciar 1 lockdown ou desfazer 1 lockdown a cada 5 minutos.`,
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
        interaction.editReply(`❌ ${interaction.user} **|** O servidor realizou um lockdown recentemente. Aguarde ${ms(cooldown - Date.now())} para desbloqueá-lo.`);
        return;
      }

      if (int.customId === 'cancel') {
        message.edit({ content: `❌ ${interaction.user} **|** Você decidiu não efetuar o lockdown.`, components: [] });
        Cooldowns.delete(interaction.guild!.id);
        return;
      }
      Cooldowns.set(interaction.guild!.id, Date.now() + ms('30s'));
      message.edit({ content: `⏲️ ${interaction.user} **|** Bloqueando canais que membros podem enviar mensagens, aguarde...`, components: [] });

      await this.client.databases.createLockdown({
        guildId: interaction.guild!.id,
        startTime: BigInt(Date.now()),
        blockedChannels: []
      });

      const blockedChannels: string[] = [];
      const couldNotBlockChannels: string[] = [];
      const alreadyBlocked: string[] = [];
      const noPerms: string[] = [];

      const allowedChannelTypes = [ChannelType.GuildText, ChannelType.GuildVoice, ChannelType.GuildVoice];
      const canais = (await interaction.guild!.channels.fetch()).filter(c => allowedChannelTypes.includes(c.type));

      if (!canais.size) {
        await this.client.databases.deleteLockdown(interaction.guild!.id);
        message.edit(`❌ ${interaction.user} **|** Não há canais para bloquear.`);
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
            .create(interaction.guild!.id, { SendMessages: false, Connect: false }, { reason: `[Lockdown] Bloqueando canais | Iniciado por: ${interaction.user.tag}` })
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
            .edit({ SendMessages: false, Connect: false }, `[Lockdown] Bloqueando canais | Iniciado por: ${interaction.user.tag}`)
            .then(() => blockedChannels.push(canal.id))
            .catch(() => couldNotBlockChannels.push(canal.id));
        } else alreadyBlocked.push(canal.id);
        continue;
      }

      const finalEmbed = new EmbedBuilder()
        .setTimestamp()
        .setTitle('Os seguintes canais foram bloqueados:')
        .setDescription(
          blockedChannels
            .slice(0, 15)
            .map(i => `<#${i}>`)
            .join(' ') || 'Nenhum'
        )
        .setColor('Blurple');
      await this.client.databases.deleteLockdown(interaction.guild!.id);

      if (blockedChannels.length) {
        await this.client.databases.createLockdown({
          guildId: interaction.guild!.id,
          startTime: BigInt(Date.now()),
          blockedChannels
        });
        finalEmbed.setFooter({ text: '⚠️ Será possível desfazer esta ação em 5 minutos.' });
      } else finalEmbed.setFooter({ text: '⚠️ Nenhum canal foi bloqueado.' });

      if (couldNotBlockChannels.length)
        finalEmbed.addFields([
          {
            name: 'Os seguintes canais não puderam ser bloqueados:',
            value:
              couldNotBlockChannels
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || 'Nenhum.'
          }
        ]);
      if (alreadyBlocked.length)
        finalEmbed.addFields([
          {
            name: 'Os seguintes canais já estavam bloqueados:',
            value:
              alreadyBlocked
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || 'Nenhum.'
          }
        ]);
      if (noPerms.length)
        finalEmbed.addFields([
          {
            name: 'Eu não tenho permissão para editar os canais:',
            value:
              noPerms
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || 'Nenhum.'
          }
        ]);

      Cooldowns.set(interaction.guild!.id, Date.now() + ms('5m'));
      setTimeout(() => Cooldowns.delete(interaction.guild!.id), ms('5m')).unref();
      message.edit({
        content: `✅ ${interaction.user} **|** ${blockedChannels.length} canais foram bloqueados com sucesso.
⏰ **|** Você pode agendar o desbloqueio automatico utilizando: \`/lockdown agendar desbloqueio\`.`,
        embeds: [finalEmbed]
      });
    });

    collector.on('end', collected => {
      if (!collected.size) message.edit({ content: `❌ ${interaction.user} **|** Você não respondeu em tempo suficiente.`, components: [] });
    });
  }

  async #disableLockdown({ interaction }: CommandRunOptions) {
    const lockdown = await this.client.databases.getLockdown(interaction.guild!.id);
    if (!lockdown) {
      interaction.editReply(`❌ ${interaction.user} **|** O servidor não está bloqueado.`);
      return;
    }
    let cooldown = Cooldowns.get(interaction.guild!.id);
    if (cooldown) {
      // TODO: use normal ints instead of BigInts
      interaction.editReply(`❌ ${interaction.user} **|** O servidor realizou um lockdown recentemente. Aguarde ${ms(cooldown - Date.now())} para desbloqueá-lo.`);
      return;
    }

    const confirmationRow = new ActionRowBuilder<ButtonBuilder>().setComponents([
      new ButtonBuilder().setCustomId('enable').setEmoji('🔒').setLabel('Sim').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('cancel').setEmoji('❌').setLabel('Não').setStyle(ButtonStyle.Secondary)
    ]);
    const message = await interaction.editReply({
      content: `⚠️ ${interaction.user} **|** Você tem certeza que deseja desbloquear **todos os canais** que foram bloqueados através do lockdown? Esta ação não poderá ser interrompida após iniciada.
🛡️ **|** É possível iniciar 1 lockdown ou desfazer 1 lockdown a cada 5 minutos.\n💡 **|** ${lockdown.blockedChannels.length} canais estão bloqueados pelo lockdown atualmente.`,
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
        interaction.editReply(`❌ ${interaction.user} **|** O servidor realizou um lockdown recentemente. Aguarde ${ms(cooldown - Date.now())} para desbloqueá-lo.`);
        return;
      }

      if (int.customId === 'nao') {
        message.edit({ content: `❌ ${interaction.user} **|** Você decidiu não desfazer o lockdown.`, components: [] });
        Cooldowns.delete(interaction.guild!.id);
        return;
      }
      Cooldowns.set(interaction.guild!.id, Date.now() + ms('30s'));
      message.edit({ content: `⏲️ ${interaction.user} **|** Desbloqueando canais que foram bloqueados pelo lockdown, aguarde...`, components: [] });

      const canais = (await interaction.guild!.channels.fetch()).filter(c => lockdown.blockedChannels.includes(c.id));
      if (!canais.size) {
        message.edit({ content: `✅ ${interaction.user} **|** Não há canais bloqueados pelo lockdown atualmente.` });
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
            .create(interaction.guild!.id, { SendMessages: null })
            .then(() => unblockedChannels.push(canal.id))
            .catch(() => couldNotUnBlockChannels.push(canal.id));
          continue;
        }
        if (permissionCached.deny.has(PermissionFlagsBits.SendMessages) || permissionCached.deny.has(PermissionFlagsBits.Connect)) {
          await permissionCached
            .edit({ SendMessages: null, Connect: null }, `[Lockdown] Desloquando canais | Iniciado por: ${interaction.user.tag}`)
            .then(() => unblockedChannels.push(canal.id))
            .catch(() => couldNotUnBlockChannels.push(canal.id));
        } else alreadyUnBlocked.push(canal.id);
      }

      const finalEmbed = new EmbedBuilder()
        .setTitle('Os seguintes canais foram desbloqueados:')
        .setDescription(
          unblockedChannels
            .slice(0, 15)
            .map(i => `<#${i}>`)
            .join(' ') || 'Nenhum'
        )
        .setColor('Blurple')
        .setTimestamp();

      await this.client.databases.deleteLockdown(interaction.guild!.id);
      if (unblockedChannels.length) finalEmbed.setFooter({ text: '⚠️ Para bloquear novamente, utilize /lockdown ativar' });
      else finalEmbed.setFooter({ text: '⚠️ Nenhum canal foi desbloqueado.' });

      if (couldNotUnBlockChannels.length)
        finalEmbed.addFields([
          {
            name: 'Os seguintes canais não puderam ser desbloqueados:',
            value:
              couldNotUnBlockChannels
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || 'Nenhum.'
          }
        ]);
      if (alreadyUnBlocked.length)
        finalEmbed.addFields([
          {
            name: 'Os seguintes canais já estavam desbloqueados:',
            value:
              alreadyUnBlocked
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || 'Nenhum.'
          }
        ]);
      if (noPerms.length)
        finalEmbed.addFields([
          {
            name: 'Eu não tenho permissão para editar os canais:',
            value:
              noPerms
                .slice(0, 15)
                .map(i => `<#${i}>`)
                .join(', ') || 'Nenhum.'
          }
        ]);

      Cooldowns.set(interaction.guild!.id, Date.now() + ms('5m'));
      setTimeout(() => Cooldowns.delete(interaction.guild!.id), ms('5m')).unref();
      message.edit({ content: `✅ ${interaction.user} **|** ${unblockedChannels.length} canais foram desbloqueados com sucesso.`, embeds: [finalEmbed] });
    });

    collector.on('end', collected => {
      if (!collected.size) message.edit({ content: `❌ ${interaction.user} **|** Você não respondeu em tempo suficiente.`, components: [] });
    });
  }
}
