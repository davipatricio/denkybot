import type { CommandRunOptions } from '@bot/src/structures/Command';
import { SubCommand } from '@bot/src/structures/SubCommand';

export default class AutoRoleSubCommand extends SubCommand {
  run({ t, interaction }: CommandRunOptions) {
    return { t, interaction };
  }
}
