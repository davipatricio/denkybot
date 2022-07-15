import { PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../structures/Command';
import type { DenkyClient } from '../../types/Client';

export default class BanCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'BAN';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.BanMembers] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'user':
        this.client.commands.get('_ban_user')?.run({ t, interaction });
        break;

      case 'list':
        this.client.commands.get('_ban_list')?.run({ t, interaction });
        break;

      case 'info':
        this.client.commands.get('_ban_info')?.run({ t, interaction });
        break;
    }
  }
}
