import type { AutocompleteRunOptions, CommandRunOptions } from '#structures/Command';
import { SubCommand } from '#structures/SubCommand';
import { Colors, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export default class BanInfoSubCommand extends SubCommand {
  async run({ t, interaction }: CommandRunOptions) {
    if (!interaction.inCachedGuild()) return;

    const user = interaction.options.getString('user', true);

    if (user === 'none') {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:ban/info/error/noGuildBans')}`);
      return;
    }

    const ban = await interaction.guild.bans.fetch({ user, cache: true }).catch(() => undefined);
    if (!ban) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:ban/info/error/userNotBanned')}`);
      return;
    }

    const embed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setThumbnail(ban.user.displayAvatarURL({ extension: 'png', size: 1024 }))
      .setTitle(t('command:ban/info/embed/title', ban.user))
      .setDescription(t('command:ban/info/embed/description', ban.reason ?? t('command:ban/info/noReason')))
      .addFields([
        {
          name: t('command:ban/info/embed/field/name'),
          value: t('command:ban/info/embed/field/value', ban.user)
        }
      ])
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });

    interaction.editReply({ embeds: [embed] });
  }

  async runAutocomplete({ t, interaction }: AutocompleteRunOptions) {
    if (!interaction.memberPermissions!.has(PermissionFlagsBits.BanMembers) && !interaction.guild!.members.me!.permissions.has(PermissionFlagsBits.BanMembers)) {
      interaction.respond([]);
      return;
    }

    const bans = await interaction.guild!.bans.fetch({ cache: true, limit: 25 }).catch(() => undefined);

    if (!bans || bans.size === 0) {
      interaction.respond([{ value: 'none', name: `❌ | ${t('command:ban/info/autocomplete/noBans')}` }]);
      return;
    }

    interaction.respond(bans.map(ban => ({ value: ban.user.id, name: `${ban.user.tag} | ${ban.user.id}` })));
  }
}
