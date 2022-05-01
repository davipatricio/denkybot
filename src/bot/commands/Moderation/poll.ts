import { ApplicationCommandOptionType, ApplicationCommandSubCommandData, ApplicationCommandType, EmbedBuilder, Message, PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

type PollAcceptableOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const MappedNumericEmojis = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
  6: '6️⃣',
  7: '7️⃣',
  8: '8️⃣',
  9: '9️⃣',
};

export default class PollCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'poll';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true,
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks], user: [] };

    const opts: ApplicationCommandSubCommandData['options'] = [];
    for (let i: PollAcceptableOptions = 1; i <= 9; (i as PollAcceptableOptions)++) {
      opts.push({
        name: client.languages.manager.get('en_US', `commandNames:poll/create/option${i}`),
        nameLocalizations: {
          'pt-BR': client.languages.manager.get('pt_BR', `commandNames:poll/create/option${i}`),
        },
        type: ApplicationCommandOptionType.String,
        required: i === 1,
        description: client.languages.manager.get('en_US', `commandDescriptions:poll/create/option${i}`),
        descriptionLocalizations: {
          'pt-BR': client.languages.manager.get('pt_BR', `commandDescriptions:poll/create/option${i}`),
        },
      });
    }

    this.addRawOptions({
      name: client.languages.manager.get('en_US', 'commandNames:poll'),
      nameLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:poll'),
      },
      type: ApplicationCommandType.ChatInput,
      description: client.languages.manager.get('en_US', 'commandNames:poll'),
      options: [
        {
          name: client.languages.manager.get('en_US', 'commandNames:poll/create'),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:poll/create'),
          },
          type: ApplicationCommandOptionType.Subcommand,
          description: client.languages.manager.get('en_US', 'commandDescriptions:poll/create'),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', 'commandDescriptions:poll/create'),
          },
          options: opts,
        },
      ],
    });
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
          .setFooter({ text: t('command:poll/create/footer', interaction.user.tag), iconURL: interaction.user.displayAvatarURL() })
          .setDescription(`**${t('command:poll/create/options')}:**\n${pollOptions.map((opt, index) => `${MappedNumericEmojis[index + 1]} **-** ${opt.slice(0, 200)}`).join('\n')}`);

        const message = (await interaction.editReply({ embeds: [embed] })) as Message;
        if (duplicatedOptionsDetected) interaction.followUp({ content: `⚠️ **|** ${t('command:poll/create/duplicatedWarning')}`, ephemeral: true });

        // eslint-disable-next-line no-await-in-loop
        for (let i = 1; i <= pollOptions.length; i++) await message.react(MappedNumericEmojis[i]);
        break;
      }
    }
  }
}
