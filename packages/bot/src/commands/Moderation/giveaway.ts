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
      ephemeral: true,
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
    const description = interaction.options.getString('descricao') ?? '🎉 Meu lindo sorteio.';
    const winnerAmount = interaction.options.getNumber('ganhadores', true);

    const endTimestamp = Date.now() + 15000;

    const embed = new EmbedBuilder().setTitle(`🎉 ${title}`).setDescription(`${description}\n\n🎉 Ganhadores: ${winnerAmount}\nAcaba em: <t:${Math.round(endTimestamp / 1000)}:R>`);
    const row = new ActionRowBuilder<ButtonBuilder>().setComponents([new ButtonBuilder().setCustomId('participate').setEmoji('🎉').setLabel('Participar').setStyle(ButtonStyle.Success)]);
    const row2 = new ActionRowBuilder<SelectMenuBuilder>().setComponents([
      new SelectMenuBuilder()
        .setCustomId('dropdown')
        .setPlaceholder('Opções adicionais')
        .addOptions([
          new SelectMenuOptionBuilder().setEmoji('🚫').setLabel('Sair do sorteio').setValue('sair').setDescription('Clique para sair do sorteio'),
          new SelectMenuOptionBuilder().setEmoji('❌').setLabel('Encerrar sorteio').setValue('encerrar').setDescription('Clique para encerrar o sorteio e sortear os ganhadores'),
          new SelectMenuOptionBuilder().setEmoji('📝').setLabel('Editar sorteio').setValue('editar').setDescription('Clique para editar o sorteio')
        ])
    ]);

    const message = await interaction.editReply({ embeds: [embed], components: [row, row2] });

    this.client.databases.createGiveaway({
      messageId: message.id,
      authorId: interaction.user.id,
      channelId: interaction.channel!.id,
      guildId: interaction.guild!.id,
      title,
      description,
      winnerAmount,
      participants: [],
      endTimestamp,
      ended: false
    });
  }
}
