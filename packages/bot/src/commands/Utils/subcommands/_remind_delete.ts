import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';

export default class ReminderDeleteSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.rawCategory = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    const reminder = await this.client.databases.getReminder(interaction.options.getString('reminder', true));
    if (!reminder) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:reminders/info/not-found')}`);
      return;
    }

    await this.client.databases.deleteReminder(reminder.id);
    interaction.editReply(`✅ ${interaction.user} **|** ${t('command:reminders/delete/deleted')}`);
  }
}
