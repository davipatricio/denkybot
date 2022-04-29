import { ApplicationCommandOptionType, ApplicationCommandSubCommandData, ApplicationCommandType } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

type PollAcceptableOptions = 1 | 2 | 3 | 4 | 5;

export default class PollCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'poll';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
    };
    this.permissions = { bot: [], user: [] };

    const opts: ApplicationCommandSubCommandData['options'] = [];
    for (let i: PollAcceptableOptions = 1; i <= 5; (i as PollAcceptableOptions)++) {
      opts.push({
        name: client.languages.manager.get('pt_BR', `commandNames:poll/create/option${i}`),
        nameLocalizations: {
          'en-US': client.languages.manager.get('en_US', `commandNames:poll/create/option${i}`),
        },
        type: ApplicationCommandOptionType.String,
        required: i === 1,
        description: client.languages.manager.get('pt_BR', `commandDescriptions:poll/create/option${i}`),
        descriptionLocalizations: {
          'en-US': client.languages.manager.get('en_US', `commandDescriptions:poll/create/option${i}`),
        },
      });
    }

    this.addRawOptions({
      name: client.languages.manager.get('pt_BR', 'commandNames:poll'),
      nameLocalizations: {
        'en-US': client.languages.manager.get('en_US', 'commandNames:poll'),
      },
      type: ApplicationCommandType.ChatInput,
      description: client.languages.manager.get('pt_BR', 'commandNames:poll'),
      options: [
        {
          name: client.languages.manager.get('pt_BR', 'commandNames:poll/create'),
          nameLocalizations: {
            'en-US': client.languages.manager.get('en_US', 'commandNames:poll/create'),
          },
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('pt_BR', 'commandDescriptions:poll/create'),
          descriptionLocalizations: {
            'en-US': client.languages.manager.get('en_US', 'commandDescriptions:poll/create'),
          },
          options: opts,
        },
      ],
    });
  }

  override async run({ t, interaction }: CommandRunOptions) {}
}
