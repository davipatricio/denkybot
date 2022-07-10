import type { Suggestion } from '@prisma/client';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ChatInputCommandInteraction, EmbedBuilder, Message, SelectMenuBuilder, SelectMenuOptionBuilder } from 'discord.js';
import ms from 'ms';
import { Command, CommandLocale, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

type PageTypes = 'sugestoes' | 'categorias' | 'reacoes' | 'cooldown' | 'threads' | 'notices';

export default class SuggestionsSubCommand extends Command {
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
    if (!interaction.inCachedGuild()) return;
    const configStatus = (await this.client.databases.getSuggestion(interaction.guild.id)) ?? undefined;

    const selectRow = new ActionRowBuilder<SelectMenuBuilder>();
    const { embed, buttonRow } = this.updateMessage('sugestoes', null, selectRow, interaction, configStatus, t);

    const CATEGORY_MANAGE_FILTER = (m: Message) =>
      m.author.id === interaction.user.id &&
      m.mentions.channels.filter(c =>
        [ChannelType.GuildText, ChannelType.GuildNews, ChannelType.GuildForum, ChannelType.GuildNewsThread, ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread].includes(c.type)
      ).size === 1;

    const paginationSelect = new SelectMenuBuilder()
      .setCustomId('pagination')
      .setPlaceholder(t('command:config/suggestions/pages'))
      .setOptions([
        new SelectMenuOptionBuilder()
          .setDescription(t('command:config/suggestions/pages/suggestions'))
          .setLabel(t('command:config/suggestions/pages/suggestions/title'))
          .setValue('sugestoes')
          .setEmoji('💡'),
        new SelectMenuOptionBuilder()
          .setDescription(t('command:config/suggestions/pages/categories'))
          .setLabel(t('command:config/suggestions/pages/categories/title'))
          .setValue('categorias')
          .setEmoji('📰'),
        new SelectMenuOptionBuilder()
          .setDescription(t('command:config/suggestions/pages/reactions'))
          .setLabel(t('command:config/suggestions/pages/reactions/title'))
          .setValue('reacoes')
          .setEmoji('👍'),
        new SelectMenuOptionBuilder()
          .setDescription(t('command:config/suggestions/pages/cooldowns'))
          .setLabel(t('command:config/suggestions/pages/cooldowns/title'))
          .setValue('cooldown')
          .setEmoji('⏲️'),
        new SelectMenuOptionBuilder().setDescription(t('command:config/suggestions/pages/threads')).setLabel(t('command:config/suggestions/pages/threads/title')).setValue('threads').setEmoji('💭'),
        new SelectMenuOptionBuilder().setDescription(t('command:config/suggestions/pages/notices')).setLabel(t('command:config/suggestions/pages/notices/title')).setValue('notices').setEmoji('🗣️')
      ]);

    selectRow.setComponents([paginationSelect]);

    const message = await interaction.editReply({ components: [selectRow, buttonRow], embeds: [embed] });
    const collector = message.createMessageComponentCollector({ filter: int => int.user.id === interaction.user.id, time: 120000 });

    collector.on('collect', async int => {
      let updatedConfig = (await this.client.databases.getSuggestion(interaction.guild.id)) as Suggestion;
      await int.deferUpdate();
      if (int.isSelectMenu()) {
        if (int.customId === 'set_cooldown') {
          const time = Number(int.values[0]);
          updatedConfig = await this.client.databases.updateSuggestion({
            ...updatedConfig,
            cooldown: time
          });
          this.updateMessage('cooldown', message, selectRow, interaction, updatedConfig, t);
          int.followUp({ content: `${t('command:config/suggestions/actions/cooldowns/set')} \`${ms(time)}\``, ephemeral: true });
          return;
        }
        this.updateMessage(int.values[0] as PageTypes, message, selectRow, interaction, updatedConfig, t);
      }
      if (int.isButton()) {
        switch (int.customId) {
          // Enable suggestions
          case 'enable': {
            updatedConfig = await this.client.databases.createSuggestion({
              guildId: interaction.guild.id,
              addReactions: true,
              categories: [],
              cooldown: 0,
              useThreads: false
            });
            this.updateMessage('categorias', message, selectRow, interaction, updatedConfig, t);
            int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/enabled')}`, ephemeral: true });
            break;
          }
          // Disable suggestions
          case 'disable':
            await this.client.databases.deleteSuggestion(interaction.guild.id);
            this.updateMessage('sugestoes', message, selectRow, interaction, undefined, t);
            break;
          // Add category
          case 'add_category':
            await int.followUp({ content: `📥 **|** ${t('command:config/suggestions/actions/category/askToAdd', interaction.channel)}`, ephemeral: true });
            message.channel
              .awaitMessages({ filter: CATEGORY_MANAGE_FILTER, max: 1, time: 120000 })
              .then(async m => {
                const sentMsg = m.first();
                const mentionedChannel = sentMsg?.mentions.channels.first()?.id as string;
                updatedConfig.categories = updatedConfig.categories.filter(c => c !== mentionedChannel).slice(0, 5);
                updatedConfig.categories.push(mentionedChannel);
                updatedConfig = await this.client.databases.updateSuggestion({
                  ...updatedConfig
                });
                int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/category/added')}`, ephemeral: true });
                this.updateMessage('categorias', message, selectRow, interaction, updatedConfig, t);
              })
              .catch(() => int.followUp({ content: `❌ **|** ${t('command:config/suggestions/actions/category/addError')}`, ephemeral: true }));
            break;
          // Remove category
          case 'del_category':
            await int.followUp({ content: `📥 **|** ${t('command:config/suggestions/actions/category/askToRemove', interaction.channel)}`, ephemeral: true });
            message.channel
              .awaitMessages({ filter: CATEGORY_MANAGE_FILTER, max: 1, time: 120000 })
              .then(async m => {
                const sentMsg = m.first();
                const mentionedChannel = sentMsg?.mentions.channels.first()?.id;
                updatedConfig.categories = updatedConfig.categories.filter(c => c !== mentionedChannel);
                updatedConfig = await this.client.databases.updateSuggestion({
                  ...updatedConfig
                });
                int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/category/removed')}`, ephemeral: true });
                this.updateMessage('sugestoes', message, selectRow, interaction, updatedConfig, t);
              })
              .catch(() => int.followUp({ content: `❌ **|** ${t('command:config/suggestions/actions/category/delError')}`, ephemeral: true }));
            break;
          // Enable reactions
          case 'enable_reactions': {
            updatedConfig = await this.client.databases.updateSuggestion({
              ...updatedConfig,
              addReactions: true
            });
            this.updateMessage('reacoes', message, selectRow, interaction, updatedConfig, t);
            int.followUp({
              content: `✅ **|** ${t('command:config/suggestions/actions/reactions/enabled')}\n💡 **|** ${t('command:config/suggestions/actions/reactions/enabledTip')}`,
              ephemeral: true
            });
            break;
          }
          // Disable reactions
          case 'disable_reactions': {
            updatedConfig = await this.client.databases.updateSuggestion({
              ...updatedConfig,
              addReactions: false
            });
            this.updateMessage('reacoes', message, selectRow, interaction, updatedConfig, t);
            int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/reactions/disabled')}`, ephemeral: true });
            break;
          }
          // Enable threads
          case 'enable_threads': {
            updatedConfig = await this.client.databases.updateSuggestion({
              ...updatedConfig,
              useThreads: true
            });
            this.updateMessage('threads', message, selectRow, interaction, updatedConfig, t);
            int.followUp({
              content: `✅ **|** ${t('command:config/suggestions/actions/threads/enabled')}`,
              ephemeral: true
            });
            break;
          }
          // Disable threads
          case 'disable_threads': {
            updatedConfig = await this.client.databases.updateSuggestion({
              ...updatedConfig,
              useThreads: false
            });
            this.updateMessage('threads', message, selectRow, interaction, updatedConfig, t);
            int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/threads/disabled')}`, ephemeral: true });
            break;
          }
          // Enable notices
          case 'enable_notices': {
            updatedConfig = await this.client.databases.updateSuggestion({
              ...updatedConfig,
              sendNotices: true
            });
            this.updateMessage('notices', message, selectRow, interaction, updatedConfig, t);
            int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/notices/enabled')}`, ephemeral: true });
            break;
          }
          // Disable notices
          case 'disable_notices': {
            updatedConfig = await this.client.databases.updateSuggestion({
              ...updatedConfig,
              sendNotices: false
            });
            this.updateMessage('notices', message, selectRow, interaction, updatedConfig, t);
            int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/notices/disabled')}`, ephemeral: true });
            break;
          }
        }
      }
    });
  }

  updateMessage(page: PageTypes, message: Message | null, selectRow: ActionRowBuilder<SelectMenuBuilder>, interaction: ChatInputCommandInteraction, config: Suggestion | undefined, t: CommandLocale) {
    const embed = this.generateEmbedPage(page, interaction, config, t);
    const buttonRow = this.generateButtonsFromPage(page, config, t);
    message?.edit({ components: [selectRow, buttonRow], embeds: [embed] });
    return { embed, buttonRow };
  }

  generateEmbedPage(page: PageTypes, { user }: ChatInputCommandInteraction, configStatus: Suggestion | undefined, t: CommandLocale) {
    const embed = new EmbedBuilder({ timestamp: Date.now(), footer: { text: user.tag, iconURL: user.displayAvatarURL() } }).setColor('Blurple').setTitle(`🔧 ${t('command:config/suggestions/title')}`);
    switch (page) {
      case 'sugestoes':
        return embed.setDescription(configStatus ? `✅ **|** ${t('command:config/suggestions/enabled')}` : `❌ **|** ${t('command:config/suggestions/disabled')}`);
      case 'cooldown':
        return embed.setDescription(
          configStatus
            ? `✅ **|** ${t('command:config/suggestions/enabled')}\n⏲️ **|** ${t('command:config/suggestions/cooldowns')} ${ms(configStatus.cooldown)}`
            : `❌ **|** ${t('command:config/suggestions/disabled')}`
        );
      case 'categorias': {
        if (!configStatus) return embed.setDescription(`❌ **|** ${t('command:config/suggestions/disabled')}`);
        const { categories } = configStatus;
        return embed.setDescription(`✅ **|** ${t('command:config/suggestions/enabled')}`).addFields([
          {
            name: 'Categorias',
            value: categories.length >= 1 ? categories.map(catId => `<#${catId}>`).join('\n') : t('command:config/suggestions/noCategories')
          }
        ]);
      }
      case 'reacoes':
        return embed.setDescription(
          configStatus
            ? `✅ **|** ${t('command:config/suggestions/enabled')}\n👍 **|** ${t('command:config/suggestions/reactions', configStatus.addReactions)}`
            : `❌ **|** ${t('command:config/suggestions/disabled')}`
        );
      case 'threads':
        return embed.setDescription(
          configStatus
            ? `✅ **|** ${t('command:config/suggestions/enabled')}\n👍 **|** ${t('command:config/suggestions/threads', configStatus.useThreads)}`
            : `❌ **|** ${t('command:config/suggestions/disabled')}`
        );
      case 'notices':
        return embed.setDescription(
          configStatus
            ? `✅ **|** ${t('command:config/suggestions/enabled')}\n🗣️ **|** ${t('command:config/suggestions/notices', configStatus.sendNotices)}`
            : `❌ **|** ${t('command:config/suggestions/disabled')}`
        );
      default:
        return embed;
    }
  }

  generateButtonsFromPage(page: PageTypes, configStatus: Suggestion | undefined, t: CommandLocale) {
    if (page === 'cooldown') {
      const selectRow = new ActionRowBuilder<SelectMenuBuilder>();
      const selectMenu = new SelectMenuBuilder()
        .setCustomId('set_cooldown')
        .setPlaceholder('Escolha o tempo do cooldown')
        .setOptions([
          new SelectMenuOptionBuilder().setLabel(t('command:config/suggestions/cooldowns/no-cooldown')).setDescription(t('command:config/suggestions/cooldowns/no-cooldown/about')).setValue('0'),
          new SelectMenuOptionBuilder().setLabel(t('command:config/suggestions/cooldowns/15s-cooldown')).setDescription(t('command:config/suggestions/cooldowns/15s-cooldown/about')).setValue('15000'),
          new SelectMenuOptionBuilder().setLabel(t('command:config/suggestions/cooldowns/30s-cooldown')).setDescription(t('command:config/suggestions/cooldowns/30s-cooldown/about')).setValue('30000'),
          new SelectMenuOptionBuilder().setLabel(t('command:config/suggestions/cooldowns/1m-cooldown')).setDescription(t('command:config/suggestions/cooldowns/1m-cooldown/about')).setValue('60000'),
          new SelectMenuOptionBuilder().setLabel(t('command:config/suggestions/cooldowns/15m-cooldown')).setDescription(t('command:config/suggestions/cooldowns/15m-cooldown/about')).setValue('900000')
        ]);
      return selectRow.setComponents([selectMenu]);
    }
    const buttonRow = new ActionRowBuilder<ButtonBuilder>();
    switch (page) {
      case 'sugestoes':
        return buttonRow.setComponents([
          new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/enable')).setDisabled(!!configStatus).setStyle(ButtonStyle.Success).setCustomId('enable'),
          new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/disable')).setDisabled(!configStatus).setStyle(ButtonStyle.Danger).setCustomId('disable')
        ]);
      case 'categorias': {
        const addCat = new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/addCategory')).setStyle(ButtonStyle.Success).setCustomId('add_category');
        const delCat = new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/delCategory')).setStyle(ButtonStyle.Danger).setCustomId('del_category');
        if (!configStatus) return buttonRow.setComponents([addCat.setDisabled(true), delCat.setDisabled(true)]);
        return buttonRow.setComponents([addCat.setDisabled(configStatus.categories.length === 5), delCat.setDisabled(configStatus.categories.length === 0)]);
      }
      case 'reacoes': {
        const enableReact = new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/enableReact')).setStyle(ButtonStyle.Success).setCustomId('enable_reactions');
        const disableReact = new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/disableReact')).setStyle(ButtonStyle.Danger).setCustomId('disable_reactions');
        if (!configStatus) return buttonRow.setComponents([enableReact.setDisabled(true), disableReact.setDisabled(true)]);
        return buttonRow.setComponents([enableReact.setDisabled(!!configStatus.addReactions), disableReact.setDisabled(!configStatus.addReactions)]);
      }
      case 'threads': {
        const enableThreads = new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/enableThreads')).setStyle(ButtonStyle.Success).setCustomId('enable_threads');
        const disableThreads = new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/disableThreads')).setStyle(ButtonStyle.Danger).setCustomId('disable_threads');
        if (!configStatus) return buttonRow.setComponents([enableThreads.setDisabled(true), disableThreads.setDisabled(true)]);
        return buttonRow.setComponents([enableThreads.setDisabled(!!configStatus.useThreads), disableThreads.setDisabled(!configStatus.useThreads)]);
      }
      case 'notices': {
        const enableNotices = new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/enableNotices')).setStyle(ButtonStyle.Success).setCustomId('enable_notices');
        const disableNotices = new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/disableNotices')).setStyle(ButtonStyle.Danger).setCustomId('disable_notices');
        if (!configStatus) return buttonRow.setComponents([enableNotices.setDisabled(true), disableNotices.setDisabled(true)]);
        return buttonRow.setComponents([enableNotices.setDisabled(!!configStatus.sendNotices), disableNotices.setDisabled(!configStatus.sendNotices)]);
      }
      default:
        return buttonRow;
    }
  }
}
