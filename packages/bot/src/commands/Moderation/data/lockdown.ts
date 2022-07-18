import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from 'discord.js';

export default class LockdownData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.data = {
      name: client.languages.manager.get('en_US', 'commandNames:lockdown'),
      nameLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:lockdown')
      },
      type: ApplicationCommandType.ChatInput,
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageGuild],
      description: client.languages.manager.get('en_US', 'commandDescriptions:lockdown'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:lockdown')
      },
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:lockdown/enable'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:lockdown/enable')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:lockdown/enable'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:lockdown/enable')
          },
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:lockdown/disable'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:lockdown/disable')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:lockdown/disable'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:lockdown/disable')
          },
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    };
  }
}
