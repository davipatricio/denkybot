import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Message,
  SelectMenuBuilder,
  UnsafeSelectMenuBuilder,
  UnsafeSelectMenuOptionBuilder,
} from 'discord.js';
import { Command, CommandLocale, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

type PageTypes = 'sugestoes' | 'categorias' | 'reacoes' | 'cooldown';

export default class SuggestionsSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.rawCategory = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false,
      guildOnly: true,
    };
    this.permissions = { bot: [], user: [] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    if (!interaction.guild) return;
    const configStatus = this.client.databases.config.get(`suggestions.${interaction.guild.id}`);

    const selectRow = new ActionRowBuilder<SelectMenuBuilder>();
    const { embed, buttons: buttonRow } = this.updateMessage('sugestoes', null, selectRow, interaction, configStatus, t);

    const paginationSelect = new UnsafeSelectMenuBuilder()
      .setCustomId('pagination')
      .setPlaceholder(t('command:config/suggestions/pages'))
      .setOptions([
        new UnsafeSelectMenuOptionBuilder()
          .setDescription(t('command:config/suggestions/pages/suggestions'))
          .setLabel(t('command:config/suggestions/pages/suggestions/title'))
          .setValue('sugestoes')
          .setEmoji({ name: '💡' }),
        new UnsafeSelectMenuOptionBuilder()
          .setDescription(t('command:config/suggestions/pages/categories'))
          .setLabel(t('command:config/suggestions/pages/categories/title'))
          .setValue('categorias')
          .setEmoji({ name: '📰' }),
        new UnsafeSelectMenuOptionBuilder()
          .setDescription(t('command:config/suggestions/pages/reactions'))
          .setLabel(t('command:config/suggestions/pages/reactions/title'))
          .setValue('reacoes')
          .setEmoji({ name: '👍' }),
        new UnsafeSelectMenuOptionBuilder()
          .setDescription(t('command:config/suggestions/pages/cooldowns'))
          .setLabel(t('command:config/suggestions/pages/cooldowns/title'))
          .setValue('cooldown')
          .setEmoji({ name: '⏲️' }),
        new UnsafeSelectMenuOptionBuilder()
          .setDescription(t('command:config/suggestions/pages/threads'))
          .setLabel(t('command:config/suggestions/pages/threads/title'))
          .setValue('threads')
          .setEmoji({ name: '💭' }),
      ]);

    selectRow.setComponents([paginationSelect]);

    const message = (await interaction.editReply({ components: [selectRow, buttonRow], embeds: [embed] })) as Message;
    const collector = message.createMessageComponentCollector({ filter: int => int.user.id === interaction.user.id, time: 120000 });

    collector.on('collect', async int => {
      const updatedConfig = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
      await int.deferUpdate();
      if (int.isSelectMenu()) this.updateMessage(int.values[0] as PageTypes, message, selectRow, interaction, updatedConfig, t);
      if (int.isButton()) {
        switch (int.customId) {
          // Enable suggestions
          case 'enable': {
            this.client.databases.config.set(`suggestions.${interaction.guild?.id}`, {
              addReactions: true,
              categories: [],
              cooldown: 0,
              useThreads: false,
            });
            const newConfig = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
            this.updateMessage('categorias', message, selectRow, interaction, newConfig, t);
            int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/enabled')}`, ephemeral: true });
            break;
          }
          // Disable suggestions
          case 'disable':
            this.client.databases.config.delete(`suggestions.${interaction.guild?.id}`);
            this.updateMessage('categorias', message, selectRow, interaction, undefined, t);
            break;
          // Add category
          case 'add_category':
            await int.followUp({ content: `📥 **|** ${t('command:config/suggestions/actions/category/askToAdd', interaction.channel)}`, ephemeral: true });
            message.channel
              .awaitMessages({ filter: m => m.author.id === interaction.user.id && m.mentions.channels.size === 1, max: 1, time: 120000 })
              .then(m => {
                const sentMsg = m.first();
                const mentionedChannel = sentMsg?.mentions.channels.first()?.id;
                updatedConfig.categories = updatedConfig.categories.filter(c => c !== mentionedChannel).slice(0, 5);
                updatedConfig.categories.push(mentionedChannel);
                this.client.databases.config.set(`suggestions.${interaction.guild?.id}`, updatedConfig);
                const newConfig = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
                int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/category/added')}`, ephemeral: true });
                this.updateMessage('categorias', message, selectRow, interaction, newConfig, t);
              })
              .catch(() => int.followUp({ content: `❌ **|** ${t('command:config/suggestions/actions/category/addError')}`, ephemeral: true }));
            break;
          // Remove category
          case 'del_category':
            await int.followUp({ content: `📥 **|** ${t('command:config/suggestions/actions/category/askToRemove', interaction.channel)}`, ephemeral: true });
            message.channel
              .awaitMessages({ filter: m => m.author.id === interaction.user.id && m.mentions.channels.size === 1, max: 1, time: 120000 })
              .then(m => {
                const sentMsg = m.first();
                const mentionedChannel = sentMsg?.mentions.channels.first()?.id;
                updatedConfig.categories = updatedConfig.categories.filter(c => c !== mentionedChannel);
                this.client.databases.config.set(`suggestions.${interaction.guild?.id}`, updatedConfig);
                const newConfig = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
                int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/category/removed')}`, ephemeral: true });
                this.updateMessage('categorias', message, selectRow, interaction, newConfig, t);
              })
              .catch(() => int.followUp({ content: `❌ **|** ${t('command:config/suggestions/actions/category/delError')}`, ephemeral: true }));
            break;
          // Enable reactions
          case 'enable_reactions': {
            this.client.databases.config.set(`suggestions.${interaction.guild?.id}`, {
              ...updatedConfig,
              addReactions: true,
            });
            const newConfig = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
            this.updateMessage('reacoes', message, selectRow, interaction, newConfig, t);
            int.followUp({
              content: `✅ **|** ${t('command:config/suggestions/actions/reactions/enabled')}\n💡 **|** ${t('command:config/suggestions/actions/reactions/enabledTip')}`,
              ephemeral: true,
            });
            break;
          }
          // Disable reactions
          case 'disable_reactions': {
            this.client.databases.config.set(`suggestions.${interaction.guild?.id}`, {
              ...updatedConfig,
              addReactions: false,
            });
            const newConfig = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
            this.updateMessage('reacoes', message, selectRow, interaction, newConfig, t);
            int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/reactions/disabled')}`, ephemeral: true });
            break;
          }
        }
      }
    });
  }

  updateMessage(page: PageTypes, message: Message | null, selectRow: ActionRowBuilder<UnsafeSelectMenuBuilder>, interaction: ChatInputCommandInteraction, config: any, t: CommandLocale) {
    const embed = this.generateEmbedPage(page, interaction, config, t);
    const buttons = this.generateButtonsFromPage(page, config, t);
    message?.edit({ components: [selectRow, buttons], embeds: [embed] });
    return { embed, buttons };
  }

  generateEmbedPage(page: PageTypes, { user }: ChatInputCommandInteraction, configStatus: any, t: CommandLocale) {
    const embed = new EmbedBuilder({ timestamp: Date.now(), footer: { text: user.tag, iconURL: user.displayAvatarURL() } }).setColor('Blurple').setTitle(`🔧 ${t('command:config/suggestions/title')}`);
    switch (page) {
      case 'sugestoes':
        return embed.setDescription(configStatus ? `✅ **|** ${t('command:config/suggestions/enabled')}` : `❌ **|** ${t('command:config/suggestions/disabled')}`);
      case 'categorias': {
        if (!configStatus) return embed.setDescription(`❌ **|** ${t('command:config/suggestions/disabled')}`);
        const { categories } = configStatus;
        return embed.setDescription(`✅ **|** ${t('command:config/suggestions/enabled')}`).addFields([
          {
            name: 'Categorias',
            value: categories.length >= 1 ? categories.map(catId => `<#${catId}>`).join('\n') : t('command:config/suggestions/noCategories'),
          },
        ]);
      }
      case 'reacoes':
        return embed.setDescription(
          configStatus
            ? `✅ **|** ${t('command:config/suggestions/enabled')}\n👍 **|** ${t('command:config/suggestions/reactions', configStatus.addReactions)}`
            : `❌ **|** ${t('command:config/suggestions/disabled')}`,
        );
      default:
        return embed;
    }
  }

  generateButtonsFromPage(page: PageTypes, configStatus: any, t: CommandLocale) {
    const buttonRow = new ActionRowBuilder<ButtonBuilder>();
    switch (page) {
      case 'sugestoes':
        return buttonRow.setComponents([
          new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/enable')).setDisabled(!!configStatus).setStyle(ButtonStyle.Success).setCustomId('enable'),
          new ButtonBuilder().setLabel(t('command:config/suggestions/buttons/disable')).setDisabled(!configStatus).setStyle(ButtonStyle.Danger).setCustomId('disable'),
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
      default:
        return buttonRow;
    }
  }
}
