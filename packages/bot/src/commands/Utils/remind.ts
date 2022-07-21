import { AutocompleteRunOptions, Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { generateUuid } from '@bot/src/helpers/IdGenerator';
import { parseTime } from '@bot/src/helpers/Timestamp';
import { EmbedBuilder } from 'discord.js';
import ms from 'ms';

export default class ReminderCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'PING';
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
        this.#create({ t, interaction });
        break;
      case 'info':
        this.#info({ t, interaction });
        break;
      case 'delete':
        this.#delete({ t, interaction });
        break;
    }
  }

  async #create({ t, interaction }: CommandRunOptions) {
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
    await this.client.databases.createReminder({
      id: generateUuid(),
      authorId: interaction.user.id,
      text: interaction.options.getString('text', true),
      channelId: interaction.channel!.id,
      endTimestamp: BigInt(endTimestamp)
    });
  }

  async #info({ t, interaction }: CommandRunOptions) {
    const reminder = await this.client.databases.getReminder(interaction.options.getString('id', true));
    if (!reminder) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:reminders/info/not-found')}`);
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(`⏰ | ${t('command:reminders/info/embed/title')}`)
      .setColor('Yellow')
      .setTimestamp()
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setDescription(
        `💭 **${t('command:reminders/info/embed/description')}**: ${reminder.text}\n🕒 **${t('command:reminders/info/embed/ends-at')}**: <t:${Math.round(
          Number(reminder.endTimestamp) / 1000
        )}> (<t:${Math.round(Number(reminder.endTimestamp) / 1000)}:R>)`
      );

    interaction.editReply({ embeds: [embed] });
  }

  async #delete({ t, interaction }: CommandRunOptions) {
    const reminder = await this.client.databases.getReminder(interaction.options.getString('id', true));
    if (!reminder) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:reminders/info/not-found')}`);
      return;
    }

    await this.client.databases.deleteReminder(reminder.id);

    interaction.editReply(`✅ ${interaction.user} **|** ${t('command:reminders/delete/deleted')}`);
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
