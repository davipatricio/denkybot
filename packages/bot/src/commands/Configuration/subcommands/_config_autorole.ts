import type { CommandRunOptions } from '@bot/src/structures/Command';
import { SubCommand } from '@bot/src/structures/SubCommand';
import type { Role } from 'discord.js';
import ms from 'ms';

export default class AutoRoleSubCommand extends SubCommand {
  run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'enable':
        this.enable({ t, interaction });
        break;
    }
  }

  async enable({ t, interaction }: CommandRunOptions) {
    const role = interaction.options.getRole('role', true);
    const role2 = interaction.options.getRole('role2');
    const role3 = interaction.options.getRole('role3');
    const role4 = interaction.options.getRole('role4');
    const role5 = interaction.options.getRole('role5');

    const delay = interaction.options.getString('delay') ?? '0s';
    const ignoreBots = interaction.options.getBoolean('ignore-bots') ?? false;

    const roles = [role, role2, role3, role4, role5].filter(Boolean) as Role[];
    if (roles.some(r => r.managed) || roles.some(r => r.id === interaction.guild!.id)) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:buttonroles/managed-role')}`);
      return;
    }

    if (roles.some(r => r.position >= interaction.guild!.members.me!.roles.highest.position)) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:buttonroles/higher-role')}`);
      return;
    }

    interaction.editReply(`✅ ${interaction.user} **|** Cargos automáticos habilitados com sucesso!`);

    await this.client.databases.createAutoRole({
      guildId: interaction.guild!.id,
      roles: roles.map(r => r.id),
      delay: BigInt(ms(delay) as number),
      ignoreBots
    });
  }
}
