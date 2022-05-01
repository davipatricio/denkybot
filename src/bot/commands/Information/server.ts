import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class ServerCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'SERVER';
    this.rawCategory = 'INFO';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
      guildOnly: true,
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks], user: [] };

    this.addRawOptions({
      name: 'server',
      type: ApplicationCommandType.ChatInput,
      description: client.languages.manager.get('en_US', 'commandDescriptions:server'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:server'),
      },
      options: [
        {
          name: 'info',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:server/info'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:server/info'),
          },
        },
      ],
    });
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'info': {
        this.client.commands.get('_server_info')?.run({ t, interaction });
        break;
      }
    }
  }
}
