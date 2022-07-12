import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

const MappedNumericEmojis = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
  6: '6️⃣',
  7: '7️⃣',
  8: '8️⃣',
  9: '9️⃣'
};

export default class PollCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'POLL';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'create': {
        const pollOptions: string[] = [];
        let duplicatedOptionsDetected = false;

        for (let i = 1; i <= 9; i++) {
          const option = interaction.options.getString(`option${i}`);
          if (!option) continue;

          if (pollOptions.includes(option)) {
            duplicatedOptionsDetected = true;
            continue;
          }

          pollOptions.push(option);
        }

        const embed = new EmbedBuilder()
          .setTitle(`📊 ${t('command:poll/create/title')}`)
          .setColor('Blurple')
          .setFooter({
            text: t('command:poll/create/footer', interaction.user.tag),
            iconURL: interaction.user.displayAvatarURL()
          })
          .setDescription(`**${t('command:poll/create/options')}:**\n${pollOptions.map((opt, index) => `${MappedNumericEmojis[index + 1]} **-** ${opt.slice(0, 200)}`).join('\n')}`);

        const message = await interaction.editReply({ embeds: [embed] });
        if (duplicatedOptionsDetected)
          interaction.followUp({
            content: `⚠️ **|** ${t('command:poll/create/duplicatedWarning')}`,
            ephemeral: true
          });

        // eslint-disable-next-line no-await-in-loop
        for (let i = 1; i <= pollOptions.length; i++) await message.react(MappedNumericEmojis[i]);
        break;
      }
    }
  }
}
