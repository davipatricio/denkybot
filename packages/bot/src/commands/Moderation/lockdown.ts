import { PermissionFlagsBits } from 'discord.js';
import ms from 'ms';
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

  override run({ t, interaction }: CommandRunOptions) {
    // if (interaction.guild!.memberCount < 30) {
    //   interaction.editReply(`❌ ${interaction.user} **|** O servidor possui menos de 30 membros, não é possível bloquear todos os canais.`);
    //   return;
    // }

    switch (interaction.options.getSubcommand(true)) {
      case 'ativar':
        this.#enableLockdown({ t, interaction });
        break;
      case 'desativar':
        this.#disableLockdown({ t, interaction });
        break;
    }
  }

  async #enableLockdown({ interaction }: CommandRunOptions) {
    const lockdown = await this.client.databases.getLockdown(interaction.guild!.id);
    if (lockdown) {
      interaction.editReply(`❌ ${interaction.user} **|** O servidor já está bloqueado.`);
      return;
    }

    interaction.editReply(`✅ ${interaction.user} **|** O servidor foi bloqueado com sucesso.`);
    await this.client.databases.createLockdown({
      guildId: interaction.guild!.id,
      startTime: BigInt(Date.now()),
      blockedChannels: [interaction.channelId]
    });
  }

  async #disableLockdown({ interaction }: CommandRunOptions) {
    const lockdown = await this.client.databases.getLockdown(interaction.guild!.id);
    if (!lockdown) {
      interaction.editReply(`❌ ${interaction.user} **|** O servidor não está bloqueado.`);
      return;
    }
    // Check if lockdown is 5 minutes old through the startTime property
    const diff = BigInt(Date.now()) - BigInt(lockdown?.startTime ?? 0);
    if (lockdown && diff < ms('30s')) {
      // TODO: use normal ints instead of BigInts
      interaction.editReply(`❌ ${interaction.user} **|** O servidor realizou um lockdown recentemente. Aguarde ${ms(Number(BigInt(ms('30s')) - BigInt(diff)))} para desbloqueá-lo.`);
      return;
    }

    interaction.editReply(`✅ ${interaction.user} **|** O servidor foi desbloqueado com sucesso.`);
    await this.client.databases.deleteLockdown(interaction.guild!.id);
  }
}
