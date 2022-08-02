import { PermissionFlagsBits } from 'discord.js';
import { AutocompleteRunOptions, Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';

export default class BanRemoveSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false
    };
    this.permissions = { bot: [PermissionFlagsBits.BanMembers] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    if (!interaction.inCachedGuild()) return;

    const userId = interaction.options.getString('user', true);
    const reason = interaction.options.getString('reason') ?? t('command:ban/remove/noReason');

    if (userId === 'none') {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:ban/remove/error/noGuildBans')}`);
      return;
    }

    const userBanned = await interaction.guild.bans.fetch(userId).catch(() => undefined);

    if (!userBanned) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:ban/remove/error/noUserBanned')}`);
      return;
    }

    interaction.guild.bans
      .remove(userId, `${t('command:ban/remove/unbanned-by')} ${interaction.user.tag} - ${reason}`)
      .then(() => {
        interaction.editReply(`✅ ${interaction.user} **|** ${t('command:ban/remove/complete', userId)}`);
      })
      .catch(() => {
        interaction.editReply(`❌ ${interaction.user} **|** ${t('command:ban/remove/error/unknownError')}`);
      });
  }

  override async runAutocomplete({ t, interaction }: AutocompleteRunOptions) {
    if (!interaction.memberPermissions!.has(PermissionFlagsBits.BanMembers) && !interaction.guild!.members.me!.permissions.has(PermissionFlagsBits.BanMembers)) {
      interaction.respond([]);
      return;
    }

    const bans = await interaction.guild!.bans.fetch({ cache: true, limit: 25 }).catch(() => undefined);

    if (!bans || bans.size === 0) {
      interaction.respond([{ value: 'none', name: `❌ | ${t('command:ban/remove/autocomplete/noBans')}` }]);
      return;
    }

    interaction.respond(bans.map(ban => ({ value: ban.user.id, name: `${ban.user.tag} | ${ban.user.id}` })));
  }
}
