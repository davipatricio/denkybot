/* eslint-disable no-await-in-loop */
import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, PermissionFlagsBits, Role } from 'discord.js';

export enum ButtonRoleType {
  Add,
  Remove,
  Toggle
}

export default class ButtonRoleCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageGuild] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand(true)) {
      case 'create':
        this.#createButtonRole({ t, interaction });
        break;
    }
  }

  async #createButtonRole({ interaction }: CommandRunOptions) {
    // const actionType = interaction.options.getString('tipo', true) as keyof typeof ButtonRoleType;
    const buttonColor = interaction.options.getString('cor', true) as keyof typeof ButtonStyle;
    const embedDescription = interaction.options.getString('descrição', true);
    const role = interaction.options.getRole('cargo', true);
    const role2 = interaction.options.getRole('cargo2');
    const role3 = interaction.options.getRole('cargo3');
    const role4 = interaction.options.getRole('cargo4');
    const role5 = interaction.options.getRole('cargo5');

    const roles = [role, role2, role3, role4, role5].filter(Boolean) as Role[];
    const buttonLabel = interaction.options.getString('título') ?? roles.length === 1 ? `"${role.name}"` : 'Obter cargos';

    if (roles.some(r => r.managed) || roles.some(r => r.id === interaction.guild!.id)) {
      interaction.editReply(`❌ **|** ${interaction.user} Não é possível adicionar o cargo @everyone ou cargos gerenciados por integrações.`);
      return;
    }

    if (roles.some(r => r.position > interaction.guild!.members.me!.roles.highest.position)) {
      interaction.editReply(`❌ **|** ${interaction.user} Há cargos com posição superior que meu maior cargo.`);
      return;
    }

    const embed = new EmbedBuilder().setColor(Colors.Yellow).setDescription(embedDescription);
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setLabel(buttonLabel).setCustomId('button_role_single').setEmoji('➰').setStyle(ButtonStyle[buttonColor]));

    await interaction.editReply('Criado.');

    const message = await interaction.channel!.send({
      embeds: [embed],
      components: [row]
    });

    this.client.databases.buttonRole.create({
      data: {
        actions: {
          create: roles.map(r => ({ roleId: r.id }))
        },
        messageId: message.id,
        type: ButtonRoleType.Toggle
      }
    });
  }
}
