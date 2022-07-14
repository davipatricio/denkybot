import { parseTime } from '@bot/src/helpers/Timestamp';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SelectMenuBuilder, SelectMenuOptionBuilder } from 'discord.js';
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
      case 'criar':
        this.#createGiveaway({ t, interaction });
        break;
    }
  }

  async #createGiveaway({ interaction }: CommandRunOptions) {
    const title = interaction.options.getString('titulo', true);
    const description = interaction.options.getString('descricao') ?? 'Sorteio sem descrição.';
    const winnerAmount = interaction.options.getNumber('ganhadores', true);

    const row = new ActionRowBuilder<ButtonBuilder>().setComponents([
      new ButtonBuilder().setCustomId('giveaway_participate').setEmoji('📥').setLabel('Participar').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('giveaway_desist').setEmoji('📤').setLabel('Desistir').setStyle(ButtonStyle.Danger)
    ]);
    const row2 = new ActionRowBuilder<SelectMenuBuilder>().setComponents([
      new SelectMenuBuilder()
        .setCustomId('dropdown')
        .setPlaceholder('Opções adicionais')
        .addOptions([
          new SelectMenuOptionBuilder().setEmoji('🚫').setLabel('Sair do sorteio').setValue('sair').setDescription('Clique para sair do sorteio'),
          new SelectMenuOptionBuilder().setEmoji('❌').setLabel('Encerrar sorteio').setValue('encerrar').setDescription('Clique para encerrar o sorteio e sortear os ganhadores')
        ])
    ]);

    const { valid, type, value } = parseTime(interaction.options.getString('duracao', true));
    if (!valid || !value) {
      interaction.editReply({
        content: ''
      });
      return;
    }

    const endTimestamp = type === 'full' ? value : Date.now() + value;
    const embed = new EmbedBuilder()
      .setTitle(`🎁 ${title}`)
      .setDescription(`${description}\n\n🔢 **Ganhadores**: ${winnerAmount}\n⏲️ **Acaba**: <t:${Math.round(endTimestamp / 1000)}:R>`)
      .setColor('Yellow');

    const message = await interaction.editReply({ embeds: [embed], components: [row, row2] });

    this.client.databases.createGiveaway({
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
