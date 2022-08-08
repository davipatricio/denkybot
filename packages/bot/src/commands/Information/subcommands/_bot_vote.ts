import type { CommandRunOptions } from '#structures/Command';
import { SubCommand } from '#structures/SubCommand';

export default class BotVoteSubCommand extends SubCommand {
  run({ t, interaction }: CommandRunOptions) {
    interaction.editReply(t('command:bot/vote/vote', interaction.user, this.client.config.links.vote));
  }
}
