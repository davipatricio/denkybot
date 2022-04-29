import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class PingCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'AFK';
    this.rawCategory = 'UTILS';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
    };
    this.permissions = { bot: [], user: [] };

    this.addRawOptions({
      name: 'afk',
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: client.languages.manager.get('pt_BR', 'commandNames:afk/on'),
          nameLocalizations: {
            'en-US': client.languages.manager.get('en_US', 'commandNames:afk/on'),
          },
          description: client.languages.manager.get('pt_BR', 'commandDescriptions:afk/on'),
          descriptionLocalizations: {
            'en-US': client.languages.manager.get('en_US', 'commandDescriptions:afk/on'),
          },
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: client.languages.manager.get('pt_BR', 'commandNames:afk/reason'),
              nameLocalizations: {
                'en-US': client.languages.manager.get('pt_BR', 'commandNames:afk/reason'),
              },
              type: ApplicationCommandOptionType.String,
              description: client.languages.manager.get('pt_BR', 'commandDescriptions:afk/on/reason'),
              descriptionLocalizations: {
                'en-US': client.languages.manager.get('en_US', 'commandDescriptions:afk/on/reason'),
              },
            },
          ],
        },
        {
          name: client.languages.manager.get('pt_BR', 'commandNames:afk/off'),
          description: client.languages.manager.get('pt_BR', 'commandDescriptions:afk/off'),
          descriptionLocalizations: {
            'en-US': client.languages.manager.get('en_US', 'commandDescriptions:afk/off'),
          },
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
      description: client.languages.manager.get('pt_BR', 'commandNames:afk/on'),
    });
  }

  override async run({ t, interaction }: CommandRunOptions) {
    this.client.config.
  }
}
