import { PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class ConfigCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'CONFIG';
    this.rawCategory = 'CONFIG';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
      guildOnly: true
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'suggestions': {
        this.client.commands.get('_config_suggestions')?.run({ t, interaction });
        break;
      }
    }
  }
}
