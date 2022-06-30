import { PermissionFlagsBits } from 'discord.js';
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
      guildOnly: true
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks], user: [] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'info': {
        this.client.commands.get('_server_info')?.run({ t, interaction });
        break;
      }

      case 'icon': {
        this.client.commands.get('_server_icon')?.run({ t, interaction });
        break;
      }

      case 'banner': {
        this.client.commands.get('_server_banner')?.run({ t, interaction });
        break;
      }
    }
  }
}
