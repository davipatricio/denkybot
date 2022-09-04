import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits } from 'discord.js';

export default class ConfigCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'CONFIG';
    this.rawCategory = 'CONFIG';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'suggestions':
        this.client.commands.get('_config_suggestions')?.run({ t, interaction });
        break;
      case 'autorole':
        this.client.commands.get('_config_autorole')?.run({ t, interaction });
        break;
      case 'reports':
        this.client.commands.get('_config_reports')?.run({ t, interaction });
        break;
    }
  }
}
