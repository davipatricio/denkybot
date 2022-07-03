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
      guildOnly: false
    };
    this.permissions = { bot: [] };
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
