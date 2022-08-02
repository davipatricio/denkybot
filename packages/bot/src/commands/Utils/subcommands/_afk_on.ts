import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';

export default class AfkOnSubCommand extends Command {
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
    if (await this.client.databases.getAfk(interaction.user.id)) {
      interaction.editReply(t('command:afk/alreadySet', interaction.user));
      return;
    }

    const originalNick = interaction.inCachedGuild() ? interaction.member.nickname ?? interaction.user.username : undefined;

    await this.client.databases.createAfk({
      userId: interaction.user.id,
      guildId: interaction.guild!.id,
      reason: interaction.options.getString('reason') ?? undefined,
      originalNick,
      startTime: BigInt(Math.round(Date.now() / 1000))
    });

    if (interaction.inCachedGuild()) interaction.member.setNickname(`[AFK] ${originalNick?.slice(0, 19)}`, 'AFK').catch(() => {});

    interaction.editReply(t('command:afk/enabled', interaction.user));
  }
}
