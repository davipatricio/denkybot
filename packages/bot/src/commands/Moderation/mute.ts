import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import dayjs from 'dayjs';
import { PermissionFlagsBits } from 'discord.js';
import ms from 'ms';

export default class MuteCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'MUTE';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: true,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.ModerateMembers] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    if (!interaction.inCachedGuild() || !interaction.guild.members.me) return;

    const member = interaction.options.getMember('user');
    const user = member?.user ?? interaction.options.getUser('user', true);
    const date = ms(interaction.options.getString('time', true));
    const reason = interaction.options.getString('reason') ?? t('command:mute/no-reason');

    if (user.id === this.client.user?.id) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:mute/error/mute-bot')}`);
      return;
    }
    if (user.id === interaction.user.id) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:mute/error/mute-self')}`);
      return;
    }
    if (!member) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:mute/error/not-member')}`);
      return;
    }

    if (member.roles) {
      if (!member.moderatable || member.roles.highest.position >= interaction.guild.members.me.roles.highest.position) {
        interaction.editReply(`❌ ${interaction.user} **|** ${t('command:mute/error/not-moderatable')}`);
        return;
      }
      if (interaction.member.roles.highest.position <= member.roles.highest.position) {
        interaction.editReply(`❌ ${interaction.user} **|** ${t('command:mute/error/no-permissions')}`);
        return;
      }
    }

    const finalDate = dayjs().add(date, 'milliseconds').toDate();

    interaction.guild.members
      .edit(user.id, {
        reason: `${t('command:mute/punished-by')} ${interaction.user.tag} - ${reason}`,
        communicationDisabledUntil: finalDate
      })
      .then(() => {
        interaction.editReply(`✅ ${interaction.user} **|** ${t('command:mute/complete', user.tag ?? user.id ?? user)}`);
      })
      .catch(err => {
        const error = err.toString().toLowerCase();
        if (error.includes('missing permission')) {
          return interaction.editReply(`❌ ${interaction.user} **|** ${t('command:mute/error/not-moderatable')}`);
        }
        if (error.includes('unknown')) {
          return interaction.editReply(`❌ ${interaction.user} **|** ${t('command:mute/error/unknown-member')}`);
        }

        return interaction.editReply(`❌ ${interaction.user} **|** ${t('command:mute/error/unknown-error')}`);
      });
  }
}
