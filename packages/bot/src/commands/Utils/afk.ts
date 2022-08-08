import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';

export default class PingCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'AFK';
    this.rawCategory = 'UTILS';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'on':
        this.client.commands.get('_afk_on')?.run({ t, interaction });
        break;

      case 'off':
        this.client.commands.get('_afk_off')?.run({ t, interaction });
        break;
    }
  }
}
