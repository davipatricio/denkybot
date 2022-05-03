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
      if (int.isSelectMenu()) this.updateMessage('categorias', message, selectRow, interaction, updatedConfig, t);
      if (int.isButton()) {
        switch (int.customId) {
          // Enable suggestions
          case 'enable': {
            this.client.databases.config.set(`suggestions.${interaction.guild?.id}`, {
              addReactions: true,
              categories: [],
              cooldown: 0,
            });
            const newConfig = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
            this.updateMessage('categorias', message, selectRow, interaction, newConfig, t);
            int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/enabled')}`, ephemeral: true });
            break;
          }
          // Disable suggestions
          case 'disable': {
            this.client.databases.config.delete(`suggestions.${interaction.guild?.id}`);
            this.updateMessage('categorias', message, selectRow, interaction, undefined, t);
            break;
          }
          // Add category
          case 'add_category': {
            await int.followUp({ content: `📥 **|** ${t('command:config/suggestions/actions/category/askToAdd', interaction.channel)}`, ephemeral: true });
            message.channel
              .awaitMessages({ filter: m => m.author.id === interaction.user.id && m.mentions.channels.size === 1, max: 1, time: 120000 })
              .then(m => {
                const sentMsg = m.first();
                const mentionedChannel = sentMsg?.mentions.channels.first()?.id;
                updatedConfig.categories = updatedConfig.categories.filter(c => c !== mentionedChannel);
                updatedConfig.categories.push(mentionedChannel);
                this.client.databases.config.set(`suggestions.${interaction.guild?.id}`, updatedConfig);
                const newConfig = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
                int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/category/added')}`, ephemeral: true });
                this.updateMessage('categorias', message, selectRow, interaction, newConfig, t);
              })
              .catch(() => int.followUp({ content: `❌ **|** ${t('command:config/suggestions/actions/category/addError')}`, ephemeral: true }));
            break;
          }
          // Remove category
          case 'del_category': {
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

  generateEmbedPage(page: PageTypes, interaction: ChatInputCommandInteraction, configStatus: any, t: CommandLocale) {
    const embed = new EmbedBuilder()
      .setTimestamp()
      .setColor('Blurple')
      .setTitle(`🔧 ${t('command:config/suggestions/title')}`)
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
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
      default:
        return embed;
    }
  }

  generateButtonsFromPage(page: PageTypes, configStatus: any, t: CommandLocale) {
    const buttonRow = new ActionRowBuilder<ButtonBuilder>();
    switch (page) {
      case 'sugestoes': {
        if (configStatus)
          return buttonRow.setComponents([
            new ButtonBuilder().setLabel(t('command:config/suggestions/enable')).setDisabled(true).setStyle(ButtonStyle.Success).setCustomId('enable'),
            new ButtonBuilder().setLabel(t('command:config/suggestions/disable')).setDisabled(false).setStyle(ButtonStyle.Danger).setCustomId('disable'),
          ]);
        return buttonRow.setComponents([
          new ButtonBuilder().setLabel(t('command:config/suggestions/enable')).setDisabled(false).setStyle(ButtonStyle.Success).setCustomId('enable'),
          new ButtonBuilder().setLabel(t('command:config/suggestions/disable')).setDisabled(true).setStyle(ButtonStyle.Danger).setCustomId('disable'),
        ]);
      }
      case 'categorias': {
        if (!configStatus)
          return buttonRow.setComponents([
            new ButtonBuilder().setLabel('Adicionar categoria').setDisabled(true).setStyle(ButtonStyle.Success).setCustomId('add_category'),
            new ButtonBuilder().setLabel('Remover categoria').setDisabled(true).setStyle(ButtonStyle.Danger).setCustomId('del_category'),
          ]);
        return buttonRow.setComponents([
          new ButtonBuilder()
            .setLabel('Adicionar categoria')
            .setDisabled(configStatus.categories.length === 5)
            .setStyle(ButtonStyle.Success)
            .setCustomId('add_category'),
          new ButtonBuilder()
            .setLabel('Remover categoria')
            .setDisabled(configStatus.categories.length === 0)
            .setStyle(ButtonStyle.Danger)
            .setCustomId('del_category'),
        ]);
      }
      default:
        return buttonRow;
    }
  }
}
