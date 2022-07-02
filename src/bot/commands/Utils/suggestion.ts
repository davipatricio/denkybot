import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildTextBasedChannel,
  InteractionType,
  Message,
  ModalBuilder,
  ModalSubmitInteraction,
  PermissionFlagsBits,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
  UnsafeSelectMenuBuilder,
  UnsafeSelectMenuOptionBuilder
} from 'discord.js';
import { Command, CommandLocale, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

type CategoriesStructure = {
  name: string;
  id: string;
  topic?: string | null;
};

export default class PingCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'SUGGESTION';
    this.rawCategory = 'UTILS';
    this.config = {
      autoDefer: false,
      ephemeral: false,
      showInHelp: true,
      guildOnly: true
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks], user: [] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    if (!interaction.guild) return;
    switch (interaction.options.getSubcommand(true)) {
      case 'send':
        this.sendSuggestion(t, interaction);
        break;
    }
  }

  sendSuggestion(t: CommandLocale, interaction: ChatInputCommandInteraction) {
    const config = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
    if (!config) return interaction.reply({ content: t('command:suggestions/not-enabled'), ephemeral: true });
    if (config.categories.length === 0) return interaction.reply({ content: t('command:suggestions/no-categories'), ephemeral: true });

    const modal = new ModalBuilder().setCustomId('suggestion_modal').setTitle(t('command:suggestions/send/modal/title'));
    const userSuggestion = new TextInputBuilder()
      .setCustomId('user_suggestion')
      .setLabel(t('command:suggestions/send/modal/label'))
      .setMaxLength(1500)
      .setMinLength(5)
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder(t('command:suggestions/send/modal/placeholder'));

    const row1 = new ActionRowBuilder<TextInputBuilder>().setComponents([userSuggestion]);

    modal.setComponents([row1]);
    interaction.showModal(modal);
    const eventFn = async (int: ModalSubmitInteraction) => {
      if (int.user.id !== interaction.user.id) return;
      if (int.type !== InteractionType.ModalSubmit) return;
      if (int.customId !== 'suggestion_modal') return;
      this.client.off('interactionCreate', eventFn);

      await int.deferReply();
      const text = int.fields.getTextInputValue('user_suggestion').trim();
      if (text.length < 5) {
        interaction.reply({ content: t('command:suggestions/send/small-suggestion'), ephemeral: true });
        return;
      }

      const categoriesName: CategoriesStructure[] = [];
      for (const categoryId of config.categories) {
        const channel = int.guild?.channels.cache.get(categoryId) as TextChannel;
        if (channel) categoriesName.push({ name: channel.name, id: channel.id, topic: channel.topic });
      }

      const categoriesRow = new ActionRowBuilder<UnsafeSelectMenuBuilder>().setComponents([
        new UnsafeSelectMenuBuilder().setCustomId('categorias').setOptions(
          categoriesName.map(cat =>
            new UnsafeSelectMenuOptionBuilder()
              .setLabel(cat.name)
              .setValue(cat.id)
              .setEmoji({ name: '💬' })
              .setDescription(cat.topic ?? '')
          )
        )
      ]);

      const msg = (await int.editReply({ content: `📥 **|** ${t('command:suggestions/send/choose-a-category')}`, components: [categoriesRow] })) as Message;
      const collector = msg.createMessageComponentCollector({ filter: m => m.user.id === int.user.id, max: 1, time: 60000 });
      collector.on('collect', async i => {
        if (!i.isSelectMenu()) return;
        await i.deferUpdate();
        const channelId = i.values[0] as string;
        const finalChannel = int.guild?.channels.cache.get(channelId) as GuildTextBasedChannel;
        if (!finalChannel) {
          interaction.editReply({ content: t('command:suggestions/unknown-category'), components: [] });
          return;
        }

        const embed = new EmbedBuilder()
          .setTitle(`💡 ${t('command:suggestions/embed/title')}`)
          .setDescription(`> ${text}`)
          .setColor('Yellow')
          .setTimestamp()
          .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
        i.editReply({ content: t('command:suggestions/send/sent'), components: [] });
        const message = await finalChannel.send({ embeds: [embed] });

        if (config.addReactions) {
          await message.react('👍');
          message.react('👎');
        }
      });
    };

    return this.client.on('interactionCreate', eventFn);
  }
}
