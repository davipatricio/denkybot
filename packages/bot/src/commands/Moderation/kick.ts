import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits } from 'discord.js';

export default class KickCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'KICK';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: true,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.KickMembers] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    if (!interaction.inCachedGuild() || !interaction.guild.members.me) return;

    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') ?? t('command:kick/no-reason');

    if (!member) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:kick/error/not-member')}`);
      return;
    }

    if (member.id === this.client.user?.id) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:kick/error/kick-bot')}`);
      return;
    }
    if (member.id === interaction.user.id) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:kick/error/kick-self')}`);
      return;
    }

    if (member.roles) {
      if (!member.kickable || member.roles.highest.position >= interaction.guild.members.me.roles.highest.position) {
        interaction.editReply(`❌ ${interaction.user} **|** ${t('command:kick/error/not-kickable')}`);
        return;
      }
      if (interaction.member.roles.highest.position <= member.roles.highest.position) {
        interaction.editReply(`❌ ${interaction.user} **|** ${t('command:kick/error/no-permissions')}`);
        return;
      }
    }

    member
      .kick(`${t('command:kick/punished-by')} ${interaction.user.tag} - ${reason}`)
      .then(() => {
        interaction.editReply(`✅ ${interaction.user} **|** ${t('command:kick/complete', member.user.tag ?? member.id ?? member)}`);
      })
      .catch(err => {
        const error = err.toString().toLowerCase();
        if (error.includes('missing permission')) {
          return interaction.editReply(`❌ ${interaction.user} **|** ${t('command:kick/error/not-kickable')}`);
        }

        return interaction.editReply(`❌ ${interaction.user} **|** ${t('command:kick/error/unknown-error')}`);
      });
  }
}
