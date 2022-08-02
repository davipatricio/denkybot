import { SubCommand } from '#structures/SubCommand';

export default class AfkOffSubCommand extends SubCommand {
  async run({ t, interaction }) {
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
