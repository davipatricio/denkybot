import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { checkSingleEndedGiveaway } from '@bot/src/helpers/Giveaway';
import { parseTime } from '@bot/src/helpers/Timestamp';
import type { Giveaway } from '@prisma-client';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, TextBasedChannel } from 'discord.js';
import ms from 'ms';

export default class GiveawayCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'GIVEAWAY';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand(true)) {
      case 'create':
        this.#createGiveaway({ t, interaction });
        break;
      case 'end':
        this.#endGiveaway({ t, interaction });
        break;
    }
  }

  async #createGiveaway({ t, interaction }: CommandRunOptions) {
    const title = interaction.options.getString('title', true);
    const description = interaction.options.getString('description') ?? t('command:giveaway/create/no-description');
    const winnerAmount = interaction.options.getNumber('winners', true);
    const channel = (interaction.options.getChannel('channel') ?? interaction.channel!) as TextBasedChannel;

    const { valid, type, value } = parseTime(interaction.options.getString('duration', true));
    if (!valid || !value) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:giveaway/create/invalid-time')}`);
      return;
    }
    const now = Date.now();
    const endTimestamp = type === 'full' ? value : now + value;

    // allow giveaways with durations between 30 seconds and 1 year
    if (endTimestamp - now <= 0 || endTimestamp - now < ms('30s')) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:giveaway/create/time-low')}`);
      return;
    }
    if (endTimestamp - now > ms('1y')) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:giveaway/create/time-big')}`);
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

    const message = await channel.send({ embeds: [embed], components: [row] });
    if (channel.id !== interaction.channelId) interaction.editReply(`✅ ${interaction.user} **|** ${t('command:giveaway/create/created', message.url)}`);
    else interaction.editReply(`✅ ${interaction.user} **|** ${t('command:giveaway/create/created-same')}`);

    await this.client.databases.createGiveaway({
      messageId: message.id,
      authorId: interaction.user.id,
      channelId: channel.id,
      title,
      description,
      winnerAmount,
      participants: [],
      endTimestamp: BigInt(endTimestamp),
      ended: false
    });
  }

  async #endGiveaway({ t, interaction }: CommandRunOptions) {
    const messageId = interaction.options.getString('id', true);
    const giveaway = await this.client.databases.fetchGiveaway(messageId);
    if (!giveaway) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:giveaway/end/not-found')}`);
      return;
    }

    if (giveaway.ended) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:giveaway/end/already-ended')}`);
      return;
    }

    interaction.editReply(`✅ ${interaction.user} **|** ${t('command:giveaway/end/ended')}`);
    const fakeObject: Giveaway = {
      ...giveaway,
      endTimestamp: BigInt(Date.now())
    };
    checkSingleEndedGiveaway(this.client, fakeObject);
  }
}
