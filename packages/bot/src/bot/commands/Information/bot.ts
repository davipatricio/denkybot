import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class BotCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'BOT';
    this.rawCategory = 'INFO';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'invite': {
        this.client.commands.get('_bot_invite')?.run({ t, interaction });
        break;
      }

      case 'vote': {
        this.client.commands.get('_bot_vote')?.run({ t, interaction });
        break;
      }
    }
  }
}
