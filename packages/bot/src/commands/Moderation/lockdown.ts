import { PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../structures/Command';
import type { DenkyClient } from '../../types/Client';

export default class LockdownCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'LOCKDOWN';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageGuild] };
  }

  override run({ interaction }: CommandRunOptions) {
    if (interaction.guild!.memberCount < 30) {
      interaction.editReply(`❌ ${interaction.user} **|** O servidor possui menos de 30 membros, não é possível bloquear todos os canais.`);
      return;
    }

    switch (interaction.options.getSubcommand(true)) {
      case 'enable':
        this.#enableLockdown();
        break;
      case 'disable':
        this.#disableLockdown();
        break;
    }
  }

  #enableLockdown() {
    return undefined;
  }

  #disableLockdown() {
    return undefined;
  }
}
