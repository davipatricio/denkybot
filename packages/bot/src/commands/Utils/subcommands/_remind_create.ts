import { parseTime } from '#helpers/Timestamp';
import type { CommandRunOptions } from '#structures/Command';
import { SubCommand } from '#structures/SubCommand';
import ms from 'ms';

export default class ReminderCreateSubCommand extends SubCommand {
  async run({ t, interaction }: CommandRunOptions) {
    const { valid, type, value } = parseTime(interaction.options.getString('duration', true));
    if (!valid || !value) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:giveaway/create/invalid-time')}`);
      return;
    }

    const now = Date.now();
    const endTimestamp = type === 'full' ? value : now + value;

    // allow giveaways with durations between 30 seconds and 1 year
    if (endTimestamp - now <= 0 || endTimestamp - now < ms('1s')) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:reminders/create/time-low')}`);
      return;
    }
    if (endTimestamp - now > ms('1y')) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:reminders/create/time-big')}`);
      return;
    }

    interaction.editReply(`✅ ${interaction.user} **|** ${t('command:reminders/create/created', Math.round(endTimestamp / 1000))}`);
    await this.client.databases.reminder.create({
      data: {
        authorId: interaction.user.id,
        text: interaction.options.getString('description', true),
        channelId: interaction.channel!.id,
        endTimestamp: BigInt(endTimestamp)
      }
    });
  }
}
