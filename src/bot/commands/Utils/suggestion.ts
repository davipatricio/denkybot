import {
  ActionRowBuilder,
  ChannelType,
  ChatInputCommandInteraction,
  Embed,
  EmbedBuilder,
  GuildTextBasedChannel,
  Message,
  ModalBuilder,
  ModalSubmitInteraction,
  PermissionFlagsBits,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
  UnsafeSelectMenuBuilder,
  UnsafeSelectMenuOptionBuilder,
  User
} from 'discord.js';
import ms from 'ms';
import { Command, CommandLocale, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

const cooldowns = new Map<string, boolean>();

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
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    if (!interaction.guild) return;
    switch (interaction.options.getSubcommand(true)) {
      case 'send':
        this.sendSuggestion(t, interaction);
        break;
      case 'edit':
        this.editSuggestion(t, interaction);
        break;
    }
  }

  editSuggestion(t: CommandLocale, interaction: ChatInputCommandInteraction) {
    const config = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
    if (!config) return interaction.reply({ content: t('command:suggestions/not-enabled'), ephemeral: true });
    if (config.categories.length === 0) return interaction.reply({ content: t('command:suggestions/no-categories'), ephemeral: true });

    const suggestionId = interaction.options.getString('id', true);
    if (!this.#isValidId(suggestionId)) {
      return interaction.reply({ content: t('command:suggestions/invalid-id'), ephemeral: true });
    }

    this.#generateAndShowModal(interaction, t, false);
    const eventFn = async (int: ModalSubmitInteraction) => {
      if (int.user.id !== interaction.user.id) return;
      if (int.customId !== 'edit_suggestion_modal') return;

      this.client.off('interactionCreate', eventFn);

      await int.deferReply();
      const text = int.fields.getTextInputValue('user_suggestion').trim();
      if (text.length < 5) {
        interaction.reply({ content: t('command:suggestions/send/small-suggestion'), ephemeral: true });
        return;
      }

      const categoriesName = this.#generateCategoriesArray(config, interaction);
      if (categoriesName.length === 0) {
        interaction.reply({ content: t('command:suggestions/no-categories'), ephemeral: true });
        return;
      }

      const categoriesRow = this.#generateCategoriesRow(categoriesName);

      const msg = (await int.editReply({ content: `📥 **|** ${t('command:suggestions/edit/choose-category')}`, components: [categoriesRow] })) as Message;
      const collector = msg.createMessageComponentCollector({ filter: m => m.user.id === int.user.id, max: 1, time: 60000 });
      collector.on('collect', async i => {
        if (!i.isSelectMenu()) return;
        await i.deferUpdate();
        const channelId = i.values[0] as string;

        let shouldContinue = true;

        const suggestionChannel = interaction.guild?.channels.cache.get(channelId) as GuildTextBasedChannel;
        if (!suggestionChannel) {
          i.editReply({ content: t('command:suggestions/unknown-category'), components: [] });
          return;
        }

        const suggestionMessage = await suggestionChannel.messages.fetch(suggestionId).catch(() => {
          i.editReply({ content: t('command:suggestions/invalid-id'), components: [] });
          shouldContinue = false;
        });

        if (!shouldContinue || !suggestionMessage) return;

        if (!this.#isFromSameMember(suggestionMessage.embeds[0], interaction.user)) {
          i.editReply({ content: `❌ **|** ${t('command:suggestions/not-same-member')}`, components: [] });
          return;
        }

        const embed = new EmbedBuilder()
          .setTitle(`💡 • ${t('command:suggestions/embed/title')}`)
          .setDescription(`> ${text}`)
          .setColor('Yellow')
          .setTimestamp()
          .setFooter({ text: `[${t('command:suggestions/edit/embed/edited')}] ${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() });
        await suggestionMessage.edit({ embeds: [embed] });
        i.editReply({ content: `📝 **|** ${t('command:suggestions/edit/edited', suggestionMessage.url)}`, components: [] });
      });
    };

    return this.client.on('interactionCreate', eventFn);
  }

  sendSuggestion(t: CommandLocale, interaction: ChatInputCommandInteraction) {
    const config = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
    if (!config) return interaction.reply({ content: t('command:suggestions/not-enabled'), ephemeral: true });
    if (config.categories.length === 0) return interaction.reply({ content: t('command:suggestions/no-categories'), ephemeral: true });

    this.#generateAndShowModal(interaction, t, false);
    const eventFn = async (int: ModalSubmitInteraction) => {
      if (int.user.id !== interaction.user.id) return;
      if (int.customId !== 'suggestion_modal') return;

      this.client.off('interactionCreate', eventFn);

      await int.deferReply();
      const text = int.fields.getTextInputValue('user_suggestion').trim();
      if (text.length < 5) {
        interaction.reply({ content: t('command:suggestions/send/small-suggestion'), ephemeral: true });
        return;
      }

      const categoriesName = this.#generateCategoriesArray(config, interaction);
      if (categoriesName.length === 0) {
        interaction.reply({ content: t('command:suggestions/no-categories'), ephemeral: true });
        return;
      }

      const categoriesRow = this.#generateCategoriesRow(categoriesName);

      const msg = (await int.editReply({ content: `📥 **|** ${t('command:suggestions/send/choose-a-category')}`, components: [categoriesRow] })) as Message;
      const collector = msg.createMessageComponentCollector({ filter: m => m.user.id === int.user.id, max: 1, time: 60000 });
      collector.on('collect', async i => {
        if (!i.isSelectMenu()) return;
        await i.deferUpdate();
        const channelId = i.values[0] as string;

        const userCooldown = cooldowns.get(`${interaction.user.id}.${channelId}`);
        if (userCooldown) {
          i.editReply({ content: `😅 ${t('command:suggestions/send/in-cooldown', ms(config.cooldown))}`, components: [] });
          return;
        }

        cooldowns.set(`${interaction.user.id}.${channelId}`, true);
        setTimeout(() => {
          cooldowns.delete(`${interaction.user.id}.${channelId}`);
        }, config.cooldown + 1);

        const finalChannel = int.guild?.channels.cache.get(channelId) as GuildTextBasedChannel;
        if (!finalChannel) {
          i.editReply({ content: t('command:suggestions/unknown-category'), components: [] });
          return;
        }

        const embed = new EmbedBuilder()
          .setTitle(`💡 • ${t('command:suggestions/embed/title')}`)
          .setDescription(`> ${text}`)
          .setColor('Yellow')
          .setTimestamp()
          .setFooter({ text: `${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() });
        const message = await finalChannel.send({ embeds: [embed] });
        i.editReply({ content: `✅ **|** ${t('command:suggestions/send/sent', message.url)}`, components: [] });

        if (config.useThreads) {
          if ([ChannelType.GuildText, ChannelType.GuildNews].includes(finalChannel.type)) message.startThread({ name: t('command:suggestions/send/thread-name') });
        }

        if (config.addReactions) {
          await message.react('👍');
          message.react('👎');
        }
      });
    };

    return this.client.on('interactionCreate', eventFn);
  }

  #isFromSameMember(embed: Embed, user: User) {
    return embed.footer?.text.endsWith(` (${user.id})`);
  }

  #isValidId(id: string) {
    return id.length >= 18 && id.length <= 20 && !isNaN(Number(id));
  }

  #generateAndShowModal(interaction: ChatInputCommandInteraction, t: CommandLocale, edit = false) {
    const modal = new ModalBuilder().setCustomId('suggestion_modal').setTitle(edit ? t('command:suggestions/edit/modal/title') : t('command:suggestions/send/modal/title'));
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

    return modal;
  }

  #generateCategoriesRow(categories: CategoriesStructure[]) {
    const categoriesRow = new ActionRowBuilder<UnsafeSelectMenuBuilder>().setComponents([
      new UnsafeSelectMenuBuilder().setCustomId('categorias').setOptions(
        categories.map(cat =>
          new UnsafeSelectMenuOptionBuilder()
            .setLabel(cat.name)
            .setValue(cat.id)
            .setEmoji({ name: '💬' })
            .setDescription(cat.topic ?? '')
        )
      )
    ]);

    return categoriesRow;
  }

  #generateCategoriesArray(config: any, int: ChatInputCommandInteraction) {
    const categories: CategoriesStructure[] = [];
    for (const categoryId of config.categories) {
      const channel = int.guild?.channels.cache.get(categoryId) as TextChannel;
      if (channel) categories.push({ name: channel.name, id: channel.id, topic: channel.topic });
    }

    return categories;
  }
}
