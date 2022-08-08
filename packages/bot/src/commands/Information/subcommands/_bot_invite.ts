import type { CommandRunOptions } from '#structures/Command';
import { SubCommand } from '#structures/SubCommand';

export default class BotInviteSubCommand extends SubCommand {
  run({ t, interaction }: CommandRunOptions) {
    interaction.editReply(t('command:bot/invite/invite', interaction.user, this.client.config.links.invite));
  }
}
