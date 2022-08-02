import type { CommandRunOptions } from '#structures/Command';
import { SubCommand } from '#structures/SubCommand';

export default class ReminderDeleteSubCommand extends SubCommand {
  async run({ t, interaction }: CommandRunOptions) {
    const reminder = await this.client.databases.getReminder(interaction.options.getString('reminder', true));
    if (!reminder) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:reminders/info/not-found')}`);
      return;
    }

    await this.client.databases.deleteReminder(reminder.id);
    interaction.editReply(`✅ ${interaction.user} **|** ${t('command:reminders/delete/deleted')}`);
  }
}
