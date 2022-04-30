import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class UserCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'USER';
    this.rawCategory = 'INFO';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks], user: [] };

    this.addRawOptions({
      name: 'user',
      type: ApplicationCommandType.ChatInput,
      description: client.languages.manager.get('en_US', 'commandDescriptions:user'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user'),
      },
      options: [
        {
          name: 'info',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:user/info'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/info'),
          },
          options: [
            {
              name: client.languages.manager.get('en_US', 'commandNames:user/info/user'),
              type: ApplicationCommandOptionType.User,
              required: true,
              description: client.languages.manager.get('en_US', 'commandDescriptions:user/info/user'),
              descriptionLocalizations: {
                'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:user/info/user'),
              },
            },
          ],
        },
      ],
    });
  }

  override run({ interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'info': {
        const user = interaction.options.getUser('user', true);
        interaction.reply(`${user.tag} (${user.id})`);
      }
    }
  }
}
