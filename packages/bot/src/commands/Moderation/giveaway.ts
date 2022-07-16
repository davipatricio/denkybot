import { parseTime } from '@bot/src/helpers/Timestamp';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import ms from 'ms';
import { Command, CommandRunOptions } from '../../structures/Command';
import type { DenkyClient } from '../../types/Client';

export default class GiveawayCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'BAN';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.BanMembers] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    if (!interaction.inCachedGuild()) return;
    switch (interaction.options.getSubcommand(true)) {
      case 'create':
        this.#createGiveaway({ t, interaction });
        break;
    }
  }

  async #createGiveaway({ t, interaction }: CommandRunOptions) {
    const title = interaction.options.getString('title', true);
    const description = interaction.options.getString('description') ?? t('command:giveaway/create/no-description');
    const winnerAmount = interaction.options.getNumber('winners', true);

    const { valid, type, value } = parseTime(interaction.options.getString('duration', true));
    if (!valid || !value) {
      interaction.editReply({
        content: t('command:giveaway/create/invalid-time')
      });
      return;
    }
    const now = Date.now();
    const endTimestamp = type === 'full' ? value : now + value;

    // allow giveaways with durations between 30 seconds and 1 year
    if (endTimestamp - now <= 0 || endTimestamp - now < ms('30s')) {
      interaction.editReply({
        content: t('command:giveaway/create/time-low')
      });
      return;
    }
    if (endTimestamp - now > ms('1y')) {
      interaction.editReply({
        content: t('command:giveaway/create/time-big')
      });
      return;
    }

    const row = new ActionRowBuilder<ButtonBuilder>().setComponents([
      new ButtonBuilder().setCustomId('giveaway_participate').setEmoji('📥').setLabel(t('command:giveaway/create/buttons/partipate')).setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('giveaway_desist').setEmoji('📤').setLabel(t('command:giveaway/create/buttons/desist')).setStyle(ButtonStyle.Secondary)
    ]);

    const embed = new EmbedBuilder()
      .setTitle(`🎁 ${title}`)
      .setDescription(
        `${description}\n\n🔢 **${t('command:giveaway/create/embed/winners')}**: ${winnerAmount}\n⏲️ **${t('command:giveaway/create/embed/ends-in')}**: <t:${Math.round(endTimestamp / 1000)}:R>`
      )
      .setColor('Yellow');

    const message = await interaction.editReply({ embeds: [embed], components: [row] });

    await this.client.databases.createGiveaway({
      messageId: message.id,
      authorId: interaction.user.id,
      channelId: interaction.channel!.id,
      title,
      description,
      winnerAmount,
      participants: [],
      endTimestamp: BigInt(endTimestamp),
      ended: false
    });
  }
}
