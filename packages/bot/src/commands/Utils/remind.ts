import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { generateUuid } from '@bot/src/helpers/IdGenerator';
import { parseTime } from '@bot/src/helpers/Timestamp';
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
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:giveaway/create/time-low')}`);
      return;
    }
    if (endTimestamp - now > ms('1y')) {
      interaction.editReply(`❌ ${interaction.user} **|** ${t('command:giveaway/create/time-big')}`);
      return;
    }

    interaction.editReply(`✅ ${interaction.user} **|** Lembrete criado com sucesso.`);
    await this.client.databases.createReminder({
      id: generateUuid(),
      authorId: interaction.user.id,
      text: interaction.options.getString('text', true),
      channelId: interaction.channel!.id,
      endTimestamp: BigInt(endTimestamp)
    });
  }
}
