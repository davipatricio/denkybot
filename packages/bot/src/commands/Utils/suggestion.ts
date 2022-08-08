import { Command, CommandLocale, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import type { Suggestion } from '@prisma-client';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  ChatInputCommandInteraction,
  Colors,
  Embed,
  EmbedBuilder,
  GuildTextBasedChannel,
  ModalBuilder,
  ModalSubmitInteraction,
  PermissionFlagsBits,
  PermissionsBitField,
  SelectMenuBuilder,
  SelectMenuInteraction,
  SelectMenuOptionBuilder,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
  User
} from 'discord.js';
import ms from 'ms';

const cooldowns = new Map<string, boolean>();

type CategoriesStructure = {
  name: string;
  id: string;
  topic?: string | null;
};

export default class SuggestionCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'SUGGESTION';
    this.rawCategory = 'UTILS';
    this.config = {
      autoDefer: false,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand(true)) {
      case 'send':
        this.sendSuggestion(t, interaction);
        break;
      case 'edit':
        this.editSuggestion(t, interaction);
        break;
      case 'accept':
        if (this.#verifyMemberPermissions(interaction, t)) this.acceptSuggestion(t, interaction);
        break;
      case 'deny':
        if (this.#verifyMemberPermissions(interaction, t)) this.denySuggestion(t, interaction);
        break;
    }
  }

  async denySuggestion(t: CommandLocale, interaction: ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) return;
    const config = await this.client.databases.getSuggestion(interaction.guild.id);
    if (!config) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/not-enabled')}`,
        ephemeral: true
      });
      return;
    }
    if (config.categories.length === 0) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/no-categories')}`,
        ephemeral: true
      });
      return;
    }

    const reason = interaction.options.getString('reason');
    const suggestionId = interaction.options.getString('id_suggestion', true);
    if (!this.#isValidId(suggestionId)) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/invalid-id')}`,
        ephemeral: true
      });
      return;
    }

    const categoriesName = this.#generateCategoriesArray(config, interaction);
    if (categoriesName.length === 0) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/no-categories')}`,
        ephemeral: true
      });
      return;
    }

    await interaction.deferReply();

    const categoriesRow = this.#generateCategoriesRow(categoriesName);
    const msg = await interaction.editReply({
      content: `📥 **|** ${t('command:suggestions/edit/choose-category')}`,
      components: [categoriesRow]
    });
    const collector = msg.createMessageComponentCollector({
      filter: m => m.user.id === interaction.user.id && m.isSelectMenu(),
      max: 1,
      time: 60000
    });
    collector.on('collect', async (i: SelectMenuInteraction) => {
      await i.deferUpdate();
      const channelId = i.values[0] as string;

      let shouldContinue = true;

      const suggestionChannel = interaction.guild?.channels.cache.get(channelId) as GuildTextBasedChannel;
      if (!suggestionChannel) {
        i.editReply({
          content: `❌ **|** ${t('command:suggestions/unknown-category')}`,
          components: []
        });
        return;
      }

      const suggestionMessage = await suggestionChannel.messages.fetch(suggestionId).catch(() => {
        i.editReply({
          content: `❌ **|** ${t('command:suggestions/invalid-id')}`,
          components: []
        });
        shouldContinue = false;
      });
      if (!shouldContinue || !suggestionMessage || suggestionMessage.embeds.length !== 1 || !this.#getIdFromFooter(suggestionMessage.embeds[0].footer?.text)) {
        i.editReply({
          content: `❌ **|** ${t('command:suggestions/invalid-id')}`,
          components: []
        });
        return;
      }

      if (this.#alreadyAnswered(suggestionMessage.embeds[0])) {
        i.editReply({
          content: `❌ **|** ${t('command:suggestions/management/answered')}`,
          components: []
        });
        return;
      }

      const suggesterId = this.#getIdFromFooter(suggestionMessage.embeds[0].footer?.text);

      const embed = new EmbedBuilder(suggestionMessage.embeds[0].toJSON())
        .setTitle(`❌ • ${t('command:suggestions/management/deny/embed/title')}`)
        .setColor(Colors.Green)
        .addFields([
          {
            name: t('command:suggestions/management/embed/answer'),
            value: `> ${interaction.user}: ${reason ?? t('command:suggestions/management/embed/answer/empty')}`
          }
        ]);
      await suggestionMessage.edit({ embeds: [embed] });
      suggestionMessage.reactions.removeAll().catch(() => {});
      if (i.channelId === suggestionMessage.channel.id) {
        i.editReply({
          content: `❌ **|** ${t('command:suggestions/management/deny/denied')}`,
          components: []
        });
        return;
      }

      if (config.sendNotices && suggesterId) {
        const noticeEmbed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTimestamp()
          .setDescription(`❌ **|** ${t('command:suggestions/management/deny/memberdm', embed.data.description?.replace('> ', '').slice(0, 15) ?? '', interaction.user, suggestionMessage.url)}`);
        interaction.guild.members
          .fetch(suggesterId)
          .then(m => {
            m.send({
              embeds: [noticeEmbed]
            }).catch(() => {});
          })
          .catch(() => {});
      }

      this.#askStaffToMove(t, i, embed, 'deny');
    });
  }

  async acceptSuggestion(t: CommandLocale, interaction: ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) return;
    const config = await this.client.databases.getSuggestion(interaction.guild.id);
    if (!config) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/not-enabled')}`,
        ephemeral: true
      });
      return;
    }
    if (config.categories.length === 0) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/no-categories')}`,
        ephemeral: true
      });
      return;
    }

    const reason = interaction.options.getString('reason');
    const suggestionId = interaction.options.getString('id_suggestion', true);
    if (!this.#isValidId(suggestionId)) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/invalid-id')}`,
        ephemeral: true
      });
      return;
    }

    const categoriesName = this.#generateCategoriesArray(config, interaction);
    if (categoriesName.length === 0) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/no-categories')}`,
        ephemeral: true
      });
      return;
    }

    await interaction.deferReply();

    const categoriesRow = this.#generateCategoriesRow(categoriesName);
    const msg = await interaction.editReply({
      content: `📥 **|** ${t('command:suggestions/edit/choose-category')}`,
      components: [categoriesRow]
    });
    const collector = msg.createMessageComponentCollector({
      filter: m => m.user.id === interaction.user.id && m.isSelectMenu(),
      max: 1,
      time: 60000
    });
    collector.on('collect', async (i: SelectMenuInteraction) => {
      await i.deferUpdate();
      const channelId = i.values[0] as string;

      let shouldContinue = true;

      const suggestionChannel = interaction.guild?.channels.cache.get(channelId) as GuildTextBasedChannel;
      if (!suggestionChannel) {
        i.editReply({
          content: `❌ **|** ${t('command:suggestions/unknown-category')}`,
          components: []
        });
        return;
      }

      const suggestionMessage = await suggestionChannel.messages.fetch(suggestionId).catch(() => {
        i.editReply({
          content: `❌ **|** ${t('command:suggestions/invalid-id')}`,
          components: []
        });
        shouldContinue = false;
      });
      if (!shouldContinue || !suggestionMessage || suggestionMessage.embeds.length !== 1 || !this.#getIdFromFooter(suggestionMessage.embeds[0].footer?.text)) {
        i.editReply({
          content: `❌ **|** ${t('command:suggestions/invalid-id')}`,
          components: []
        });
        return;
      }

      if (this.#alreadyAnswered(suggestionMessage.embeds[0])) {
        i.editReply({
          content: `❌ **|** ${t('command:suggestions/management/answered')}`,
          components: []
        });
        return;
      }

      const suggesterId = this.#getIdFromFooter(suggestionMessage.embeds[0].footer?.text);

      const embed = new EmbedBuilder(suggestionMessage.embeds[0].toJSON())
        .setTitle(`✅ • ${t('command:suggestions/management/accept/embed/title')}`)
        .setColor(Colors.Green)
        .addFields([
          {
            name: t('command:suggestions/management/embed/answer'),
            value: `> ${interaction.user}: ${reason ?? t('command:suggestions/management/embed/answer/empty')}`
          }
        ]);
      await suggestionMessage.edit({ embeds: [embed] });
      suggestionMessage.reactions.removeAll().catch(() => {});
      if (i.channelId === suggestionMessage.channel.id) {
        i.editReply({
          content: `✅ **|** ${t('command:suggestions/management/accept/accepted')}`,
          components: []
        });
        return;
      }

      if (config.sendNotices && suggesterId) {
        const noticeEmbed = new EmbedBuilder()
          .setColor(Colors.Green)
          .setTimestamp()
          .setDescription(`✅ **|** ${t('command:suggestions/management/accept/memberdm', embed.data.description?.replace('> ', '').slice(0, 15) ?? '', interaction.user, suggestionMessage.url)}`);
        interaction.guild.members
          .fetch(suggesterId)
          .then(m => {
            m.send({
              embeds: [noticeEmbed]
            }).catch(() => {});
          })
          .catch(() => {});
      }

      this.#askStaffToMove(t, i, embed, 'accept');
    });
  }

  async editSuggestion(t: CommandLocale, interaction: ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) return;
    const config = await this.client.databases.getSuggestion(interaction.guild.id);
    if (!config) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/not-enabled')}`,
        ephemeral: true
      });
      return;
    }

    if (config.categories.length === 0) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/no-categories')}`,
        ephemeral: true
      });
      return;
    }

    const suggestionId = interaction.options.getString('id', true);
    if (!this.#isValidId(suggestionId)) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/invalid-id')}`,
        ephemeral: true
      });
      return;
    }

    this.#generateAndShowModal(interaction, t, false);
    const eventFn = async (int: ModalSubmitInteraction) => {
      if (int.user.id !== interaction.user.id) return;
      if (int.customId !== 'edit_suggestion_modal') return;

      this.client.off('interactionCreate', eventFn);

      await int.deferReply();
      const text = int.fields.getTextInputValue('user_suggestion').trim();
      if (text.length < 5) {
        int.editReply({
          content: `❌ **|** ${t('command:suggestions/send/small-suggestion')}`
        });
        return;
      }

      const categoriesName = this.#generateCategoriesArray(config, interaction);
      if (categoriesName.length === 0) {
        int.editReply({
          content: `❌ **|** ${t('command:suggestions/no-categories')}`
        });
        return;
      }

      const categoriesRow = this.#generateCategoriesRow(categoriesName);

      const msg = await int.editReply({
        content: `📥 **|** ${t('command:suggestions/edit/choose-category')}`,
        components: [categoriesRow]
      });
      const collector = msg.createMessageComponentCollector({
        filter: m => m.user.id === int.user.id && m.isSelectMenu(),
        max: 1,
        time: 60000
      });
      collector.on('collect', async (i: SelectMenuInteraction) => {
        await i.deferUpdate();
        const channelId = i.values[0] as string;

        let shouldContinue = true;

        const suggestionChannel = interaction.guild?.channels.cache.get(channelId) as GuildTextBasedChannel;
        if (!suggestionChannel) {
          i.editReply({
            content: `❌ **|** ${t('command:suggestions/unknown-category')}`,
            components: []
          });
          return;
        }

        const suggestionMessage = await suggestionChannel.messages.fetch(suggestionId).catch(() => {
          i.editReply({
            content: `❌ **|** ${t('command:suggestions/invalid-id')}`,
            components: []
          });
          shouldContinue = false;
        });

        if (!shouldContinue || !suggestionMessage || suggestionMessage.embeds.length !== 1 || !this.#getIdFromFooter(suggestionMessage.embeds[0].footer?.text)) {
          i.editReply({
            content: `❌ **|** ${t('command:suggestions/invalid-id')}`,
            components: []
          });
          return;
        }
        if (!this.#isFromSameMember(suggestionMessage.embeds[0], interaction.user)) {
          i.editReply({
            content: `❌ **|** ${t('command:suggestions/not-same-member')}`,
            components: []
          });
          return;
        }

        const embed = new EmbedBuilder()
          .setTitle(`💡 • ${t('command:suggestions/embed/title')}`)
          .setDescription(`> ${text}`)
          .setColor(Colors.Yellow)
          .setTimestamp()
          .setFooter({
            text: `[${t('command:suggestions/edit/embed/edited')}] ${interaction.user.tag} (${interaction.user.id})`,
            iconURL: interaction.user.displayAvatarURL()
          });
        await suggestionMessage.edit({ embeds: [embed] });
        i.editReply({
          content: `📝 **|** ${t('command:suggestions/edit/edited', suggestionMessage.url)}`,
          components: []
        });
      });
    };

    this.client.on('interactionCreate', eventFn);
  }

  async sendSuggestion(t: CommandLocale, interaction: ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) return;
    const config = await this.client.databases.getSuggestion(interaction.guild.id);
    if (!config) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/not-enabled')}`,
        ephemeral: true
      });
      return;
    }

    if (config.categories.length === 0) {
      interaction.reply({
        content: `❌ **|** ${t('command:suggestions/no-categories')}`,
        ephemeral: true
      });
      return;
    }

    this.#generateAndShowModal(interaction, t, false);
    const eventFn = async (int: ModalSubmitInteraction) => {
      if (int.user.id !== interaction.user.id) return;
      if (int.customId !== 'suggestion_modal') return;

      this.client.off('interactionCreate', eventFn);

      await int.deferReply();
      const text = int.fields.getTextInputValue('user_suggestion').trim();
      if (text.length < 5) {
        int.editReply({
          content: `❌ **|** ${t('command:suggestions/send/small-suggestion')}`
        });
        return;
      }

      const categoriesName = this.#generateCategoriesArray(config, interaction);
      if (categoriesName.length === 0) {
        int.editReply({
          content: `❌ **|** ${t('command:suggestions/no-categories')}`
        });
        return;
      }

      const categoriesRow = this.#generateCategoriesRow(categoriesName);

      const msg = await int.editReply({
        content: `📥 **|** ${t('command:suggestions/send/choose-a-category')}`,
        components: [categoriesRow]
      });
      const collector = msg.createMessageComponentCollector({
        filter: m => m.user.id === int.user.id && m.isSelectMenu(),
        max: 1,
        time: 60000
      });
      collector.on('collect', async (i: SelectMenuInteraction) => {
        await i.deferUpdate();
        const channelId = i.values[0] as string;

        const userCooldown = cooldowns.get(`${interaction.user.id}.${channelId}`);
        if (userCooldown) {
          i.editReply({
            content: `😅 ${t('command:suggestions/send/in-cooldown', ms(config.cooldown))}`,
            components: []
          });
          return;
        }

        cooldowns.set(`${interaction.user.id}.${channelId}`, true);
        setTimeout(() => {
          cooldowns.delete(`${interaction.user.id}.${channelId}`);
        }, config.cooldown + 1);

        const finalChannel = int.guild?.channels.cache.get(channelId) as GuildTextBasedChannel;
        if (!finalChannel) {
          i.editReply({
            content: t('command:suggestions/unknown-category'),
            components: []
          });
          return;
        }

        const embed = new EmbedBuilder()
          .setTitle(`💡 • ${t('command:suggestions/embed/title')}`)
          .setDescription(`> ${text}`)
          .setColor(Colors.Yellow)
          .setTimestamp()
          .setFooter({
            text: `${interaction.user.tag} (${interaction.user.id})`,
            iconURL: interaction.user.displayAvatarURL()
          });
        const message = await finalChannel.send({ embeds: [embed] });
        i.editReply({
          content: `✅ **|** ${t('command:suggestions/send/sent', message.url)}`,
          components: []
        });

        if (config.useThreads) {
          if ([ChannelType.GuildText, ChannelType.GuildNews].includes(finalChannel.type))
            message.startThread({
              name: t('command:suggestions/send/thread-name')
            });
        }

        if (config.addReactions) {
          await message.react('👍');
          message.react('👎');
        }
      });
    };

    this.client.on('interactionCreate', eventFn);
  }

  #askStaffToMove(t: CommandLocale, i: SelectMenuInteraction, finalEmbed: EmbedBuilder, type: 'deny' | 'accept') {
    return new Promise<boolean>(resolve => {
      const suggestionKey = type === 'deny' ? 'deny/denied' : 'accept/accepted';

      const buttonRow = new ActionRowBuilder<ButtonBuilder>().setComponents([
        new ButtonBuilder().setCustomId('sim').setEmoji('✅').setLabel(t('command:suggestions/management/buttons/move/yes')).setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('nao').setEmoji('❌').setLabel(t('command:suggestions/management/buttons/move/no')).setStyle(ButtonStyle.Danger)
      ]);

      i.editReply({
        content: t(`command:suggestions/management/${suggestionKey}/move`),
        components: [buttonRow]
      });
      i.message
        .awaitMessageComponent({
          time: 30000,
          filter: m => m.user.id === i.user.id
        })
        .then(async m => {
          await m.deferUpdate();
          resolve(true);
          if (m.customId !== 'sim') return;
          i.editReply({
            content: `✅ **|** ${t(`command:suggestions/management/${suggestionKey}/moved`)}`,
            components: []
          });
          i.channel?.send({ embeds: [finalEmbed] });
        })
        .catch(() => {
          i.editReply({
            content: `✅ **|** ${t(`command:suggestions/management/${suggestionKey}`)}`,
            components: []
          });

          resolve(false);
        });
    });
  }

  #isFromSameMember(embed: Embed, user: User) {
    return embed.footer?.text.endsWith(` (${user.id})`);
  }

  #alreadyAnswered(embed: Embed) {
    return !embed.title?.startsWith('💡 • ') || embed.color !== Colors.Yellow || (embed.fields ?? []).length >= 1;
  }

  #isValidId(id: string) {
    return !isNaN(Number(id));
  }

  #getIdFromFooter(footer?: string) {
    if (!footer) return null;
    const lastParenthesis = footer.lastIndexOf('(');
    if (lastParenthesis === -1) return null;
    return footer.substring(lastParenthesis + 1, footer.length - 1);
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
    const categoriesRow = new ActionRowBuilder<SelectMenuBuilder>().setComponents([
      new SelectMenuBuilder().setCustomId('categorias').setOptions(
        categories.map(cat => {
          const d = new SelectMenuOptionBuilder().setLabel(cat.name).setValue(cat.id).setEmoji('💬');
          return cat.topic ? d.setDescription(cat.topic) : d;
        })
      )
    ]);

    return categoriesRow;
  }

  #generateCategoriesArray(config: Suggestion, int: ChatInputCommandInteraction) {
    const categories: CategoriesStructure[] = [];
    for (const categoryId of config.categories) {
      const channel = int.guild?.channels.cache.get(categoryId) as TextChannel;
      if (channel)
        categories.push({
          name: channel.name,
          id: channel.id,
          topic: channel.topic
        });
    }

    return categories;
  }

  #verifyMemberPermissions(interaction: ChatInputCommandInteraction, t: CommandLocale) {
    if (!interaction.appPermissions?.has([PermissionFlagsBits.ManageMessages])) {
      const permissions = new PermissionsBitField([PermissionFlagsBits.ManageMessages])
        .toArray()
        .map(p => t(`permissions:${p}`))
        .join(', ');
      interaction.reply({
        content: `❌ ${interaction.user} **|** ${t('command:permissions/bot/missing', permissions)}`,
        ephemeral: true
      });
      return false;
    }
    return true;
  }
}
