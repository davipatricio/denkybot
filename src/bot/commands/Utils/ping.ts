import { ApplicationCommandType } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class PingCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'PING';
    this.rawCategory = 'UTILS';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
      guildOnly: false,
    };
    this.permissions = { bot: [], user: [] };

    this.addRawOptions({
      name: 'ping',
      type: ApplicationCommandType.ChatInput,
      description: client.languages.manager.get('en_US', 'commandDescriptions:ping'),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:ping'),
      },
    });
  }

  override async run({ t, interaction }: CommandRunOptions) {
    const start = Date.now();
    await interaction.editReply(`🤔 ${t('command:ping/calculating')}`);
    const apiPing = Date.now() - start;

    const dbPing = await this.client.databases.config.ping();
    interaction.editReply(`${t('command:ping/result', interaction.user, Math.round(this.client.ws.ping), apiPing, dbPing)}`);
  }
}
