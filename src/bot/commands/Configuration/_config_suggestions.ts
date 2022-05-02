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

    const embed = this.generateEmbedPage('sugestoes', interaction, configStatus, t);
    const buttonRow = this.generateButtonsFromPage('sugestoes', interaction, configStatus, t);

    const selectRow = new ActionRowBuilder<SelectMenuBuilder>();

    const paginationSelect = new UnsafeSelectMenuBuilder();
    paginationSelect
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
      ]);

    selectRow.setComponents([paginationSelect]);

    const message = (await interaction.editReply({ components: [selectRow, buttonRow], embeds: [embed] })) as Message;
    const collector = message.createMessageComponentCollector({
      filter: int => int.user.id === interaction.user.id,
      time: 120000,
    });

    collector.on('collect', async int => {
      const updatedConfig = this.client.databases.config.get(`suggestions.${interaction.guild?.id}`);
      await int.deferUpdate();
      if (int.isSelectMenu()) {
        const updatedEmbed = this.generateEmbedPage(int.values[0] as PageTypes, interaction, updatedConfig, t);
        const updatedButtons = this.generateButtonsFromPage(int.values[0] as PageTypes, interaction, updatedConfig, t);
        message.edit({ components: [selectRow, updatedButtons], embeds: [updatedEmbed] });
        return;
      }
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
            const updatedEmbed = this.generateEmbedPage('sugestoes', interaction, newConfig, t);
            const updatedButtons = this.generateButtonsFromPage('sugestoes', interaction, newConfig, t);
            message.edit({ components: [selectRow, updatedButtons], embeds: [updatedEmbed] });
            int.followUp({ content: `✅ **|** ${t('command:config/suggestions/actions/enabled')}`, ephemeral: true });
            break;
          }
          // Disable suggestions
          case 'disable': {
            this.client.databases.config.delete(`suggestions.${interaction.guild?.id}`);

            const updatedEmbed = this.generateEmbedPage('sugestoes', interaction, undefined, t);
            const updatedButtons = this.generateButtonsFromPage('sugestoes', interaction, undefined, t);
            message.edit({ components: [selectRow, updatedButtons], embeds: [updatedEmbed] });
            break;
          }
        }
      }
    });
  }

  generateEmbedPage(page: PageTypes, interaction: ChatInputCommandInteraction, configStatus: any, t: CommandLocale) {
    const embed = new EmbedBuilder()
      .setTimestamp()
      .setColor('Blurple')
      .setTitle(`🔧 ${t('command:config/suggestions/title')}`)
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
    switch (page) {
      case 'sugestoes': {
        if (configStatus) embed.setDescription(`✅ **|** ${t('command:config/suggestions/enabled')}`);
        else embed.setDescription(`❌ **|** ${t('command:config/suggestions/disabled')}`);
        return embed;
      }
      case 'categorias': {
        if (configStatus) {
          const { categories } = configStatus;
          embed.setDescription(`✅ **|** ${t('command:config/suggestions/enabled')}`);
          embed.addFields([
            {
              name: 'Categorias',
              value: categories.length >= 1 ? categories.map(catId => `<#${catId}>`).join('\n') : 'Não há categorias configuradas',
            },
          ]);
        } else embed.setDescription(`❌ **|** ${t('command:config/suggestions/disabled')}`);
        return embed;
      }
      default:
        return embed;
    }
  }

  generateButtonsFromPage(page: PageTypes, _interaction: ChatInputCommandInteraction, configStatus: any, t: CommandLocale) {
    const buttonRow = new ActionRowBuilder<ButtonBuilder>();
    switch (page) {
      case 'sugestoes': {
        if (configStatus) {
          buttonRow.setComponents([
            new ButtonBuilder().setLabel(t('command:config/suggestions/enable')).setDisabled(true).setStyle(ButtonStyle.Success).setCustomId('enable'),
            new ButtonBuilder().setLabel(t('command:config/suggestions/disable')).setDisabled(false).setStyle(ButtonStyle.Danger).setCustomId('disable'),
          ]);
        } else {
          buttonRow.setComponents([
            new ButtonBuilder().setLabel(t('command:config/suggestions/enable')).setDisabled(false).setStyle(ButtonStyle.Success).setCustomId('enable'),
            new ButtonBuilder().setLabel(t('command:config/suggestions/disable')).setDisabled(true).setStyle(ButtonStyle.Danger).setCustomId('disable'),
          ]);
        }
        return buttonRow;
      }
      case 'categorias': {
        if (configStatus) {
          buttonRow.setComponents([
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
        } else {
          buttonRow.setComponents([
            new ButtonBuilder().setLabel('Adicionar categoria').setDisabled(true).setStyle(ButtonStyle.Success).setCustomId('add_category'),
            new ButtonBuilder().setLabel('Remover categoria').setDisabled(true).setStyle(ButtonStyle.Danger).setCustomId('del_category'),
          ]);
        }
        return buttonRow;
      }
      default:
        return buttonRow;
    }
  }
}
