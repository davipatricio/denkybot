import { AutocompleteRunOptions, Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';

export default class ReminderCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'REMIND';
    this.rawCategory = 'UTILS';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand(false)) {
      case 'create':
        this.client.commands.get('_remind_create')?.run({ t, interaction });
        break;
      case 'info':
        this.client.commands.get('_remind_info')?.run({ t, interaction });
        break;
      case 'delete':
        this.client.commands.get('_remind_delete')?.run({ t, interaction });
        break;
    }
  }

  override async runAutocomplete({ interaction }: AutocompleteRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'delete':
      case 'info': {
        const reminders = await this.client.databases.getReminders(interaction.user.id);
        if (!reminders.length) {
          interaction.respond([]);
          return;
        }
        interaction.respond(reminders.map(reminder => ({ name: `⏰ | ${reminder.text.slice(0, 30)}`, value: reminder.id })));
        break;
      }
    }
  }
}
