import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';

export default class AfkOffSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.rawCategory = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false
    };
    this.permissions = { bot: [] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    const data = await this.client.databases.getAfk(interaction.user.id);
    if (!data) {
      interaction.editReply(t('command:afk/notAfk', interaction.user));
      return;
    }

    await this.client.databases.deleteAfk(interaction.user.id);

    if (interaction.inCachedGuild()) interaction.member.setNickname(data.originalNick).catch(() => {});

    interaction.editReply(t('command:afk/manuallyRemoved', interaction.user));
  }
}
