import { PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class UserCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'USER';
    this.rawCategory = 'INFO';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
      guildOnly: false,
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks], user: [] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'avatar': {
        this.client.commands.get('_user_avatar')?.run({ t, interaction });
        break;
      }

      case 'info': {
        this.client.commands.get('_user_info')?.run({ t, interaction });
        break;
      }
    }
  }
}
