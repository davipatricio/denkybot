import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { Colors, EmbedBuilder } from 'discord.js';

export default class ReminderInfoSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.rawCategory = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false
    };
    this.permissions = { bot: [] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    const reminder = await this.client.databases.getReminder(interaction.options.getString('reminder', true));
    if (!reminder) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:reminders/info/not-found')}`);
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(`⏰ | ${t('command:reminders/info/embed/title')}`)
      .setColor(Colors.Yellow)
      .setTimestamp()
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setDescription(
        `💭 **${t('command:reminders/info/embed/description')}**: ${reminder.text}\n🕒 **${t('command:reminders/info/embed/ends-at')}**: <t:${Math.round(
          Number(reminder.endTimestamp) / 1000
        )}> (<t:${Math.round(Number(reminder.endTimestamp) / 1000)}:R>)`
      );

    interaction.editReply({ embeds: [embed] });
  }
}
