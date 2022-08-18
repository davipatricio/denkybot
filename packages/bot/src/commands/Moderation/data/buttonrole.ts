import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits, SlashCommandRoleOption, SlashCommandStringOption, SlashCommandSubcommandBuilder } from 'discord.js';

export default class ButtonRoleData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.setName('buttonrole')
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
      .setDescription('beta')
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('create')
          .setDescription('Create a button role')
          .addStringOption(
            new SlashCommandStringOption()
              .setName('tipo')
              .setDescription('Tipo deste button role')
              .setRequired(true)
              .addChoices(
                { name: 'Adicionar - Apenas adicionar o cargo ao usuário', value: 'Add' },
                { name: 'Remover - Apenas remover o cargo do usuário', value: 'Remove' },
                { name: 'Toggle - Adicionar ou remover o cargo do usuário', value: 'Toggle' }
              )
          )
          .addStringOption(
            new SlashCommandStringOption()
              .setName('cor')
              .setDescription('Cor do botão')
              .setRequired(true)
              .addChoices({ name: 'Vermelho', value: 'Danger' }, { name: 'Azul', value: 'Primary' }, { name: 'Cinza', value: 'Secondary' }, { name: 'Verde', value: 'Success' })
          )
          .addStringOption(new SlashCommandStringOption().setName('descrição').setDescription('Descrição da mensagem').setRequired(true).setMinLength(10).setMaxLength(1024))
          .addRoleOption(new SlashCommandRoleOption().setName('cargo').setDescription('Cargo para adicionar ou remover quando o botão for clicado').setRequired(true))
          .addRoleOption(new SlashCommandRoleOption().setName('cargo2').setDescription('Cargo para adicionar ou remover quando o botão for clicado'))
          .addRoleOption(new SlashCommandRoleOption().setName('cargo3').setDescription('Cargo para adicionar ou remover quando o botão for clicado'))
          .addRoleOption(new SlashCommandRoleOption().setName('cargo4').setDescription('Cargo para adicionar ou remover quando o botão for clicado'))
          .addRoleOption(new SlashCommandRoleOption().setName('cargo5').setDescription('Cargo para adicionar ou remover quando o botão for clicado'))
          .addStringOption(new SlashCommandStringOption().setName('título').setDescription('Título do botão').setMinLength(1).setMaxLength(80))
      );
  }
}
