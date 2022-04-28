import { Command, CommandRunOptions } from '../../../structures/Command';

export default class PingCommand extends Command {
  constructor() {
    super();
    this.rawName = 'PING';
    this.rawCategory = 'UTILS';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
    };
    this.permissions = {
      bot: [],
      user: [],
    };
  }

  override async run({ client, t, interaction }: CommandRunOptions) {
    const start = Date.now();
    await interaction.editReply(`🤔 ${t('command/ping:calculating')}`);
    const apiPing = Date.now() - start;

    const dbPing = await client.databases.config.ping();
    interaction.editReply(`${t('command/ping:result', Math.round(client.ws.ping), apiPing, dbPing)}`);
  }
}
