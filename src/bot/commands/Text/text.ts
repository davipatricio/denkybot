import { ApplicationCommandOptionType, ApplicationCommandSubCommandData, ApplicationCommandType } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class TextCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'TEXT';
    this.rawCategory = 'TEXT';
    this.config = {
      autoDefer: false,
      ephemeral: false,
      showInHelp: true,
      guildOnly: false,
    };
    this.permissions = { bot: [], user: [] };

    const baseTextOption: ApplicationCommandSubCommandData['options'] = [
      {
        name: client.languages.manager.get('en_US', 'commandNames:text'),
        nameLocalizations: {
          'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:text'),
        },
        type: ApplicationCommandOptionType.String,
        required: true,
        description: client.languages.manager.get('en_US', 'commandDescriptions:text/text'),
        descriptionLocalizations: {
          'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text/text'),
        },
      },
    ];

    this.addRawOptions({
      name: client.languages.manager.get('en_US', 'commandNames:text'),
      nameLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:text'),
      },
      type: ApplicationCommandType.ChatInput,
      description: client.languages.manager.get('en_US', 'commandDescriptions:text'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text'),
      },
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:text/claps'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:text/claps'),
          },
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:text/claps'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text/claps'),
          },
          options: baseTextOption,
        },
        {
          name: 'emojify',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:text/emojify'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text/emojify'),
          },
          options: baseTextOption,
        },
        {
          name: client.languages.manager.get('en_US', 'commandNames:text/invert'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:text/invert'),
          },
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:text/invert'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text/invert'),
          },
          options: baseTextOption,
        },
        {
          name: 'vaporwave',
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:text/vaporwave'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:text/vaporwave'),
          },
          options: baseTextOption,
        },
      ],
    });
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'claps': {
        this.client.commands.get('_text_claps')?.run({ t, interaction });
        break;
      }
      case 'invert': {
        this.client.commands.get('_text_invert')?.run({ t, interaction });
        break;
      }
      case 'emojify': {
        this.client.commands.get('_text_emojify')?.run({ t, interaction });
        break;
      }
      case 'vaporwave': {
        this.client.commands.get('_text_vaporwave')?.run({ t, interaction });
        break;
      }
    }
  }
}
