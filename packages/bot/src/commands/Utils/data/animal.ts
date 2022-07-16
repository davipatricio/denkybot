import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

export default class AnimalData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);
    this.data = {
      name: 'animal',
      type: ApplicationCommandType.ChatInput,
      dmPermission: true,
      description: client.languages.manager.get('en_US', 'commandDescriptions:animal'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:animal')
      },
      options: [
        {
          name: 'panda',
          description: client.languages.manager.get('en_US', 'commandDescriptions:animal/panda'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:animal/panda')
          },
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:animal/dog'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:animal/dog')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:animal/dog'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:animal/dog')
          },
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:animal/koala'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:animal/koala')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:animal/koala'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:animal/koala')
          },
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:animal/bunny'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:animal/bunny')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:animal/bunny'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:animal/bunny')
          },
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:animal/cat'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:animal/cat')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:animal/cat'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:animal/cat')
          },
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:animal/duck'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:animal/duck')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:animal/duck'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:animal/duck')
          },
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:animal/foxy'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:animal/foxy')
          },
          description: client.languages.manager.get('en_US', 'commandDescriptions:animal/foxy'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:animal/foxy')
          },
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    };
  }
}
