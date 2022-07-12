import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits, SelectMenuBuilder, SelectMenuInteraction, SelectMenuOptionBuilder } from 'discord.js';
import { Command, CommandRunOptions } from '../../structures/Command';
import type { DenkyClient } from '../../types/Client';
import { recommendLocale } from '../../helpers/Locale';
import type { CommandCategoriesKeys, CommandDescriptionsKeys, CommandNamesKeys } from '../../lib/managers/LanguageManager';

export default class HelpCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'HELP';
    this.rawCategory = 'UTILS';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    const Row1 = new ActionRowBuilder<ButtonBuilder>();
    Row1.addComponents([
      new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(this.client.config.links.invite).setLabel(t('command:help/button/add')),
      new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(this.client.config.links.support).setLabel(t('command:help/button/support')),
      new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(this.client.config.links.vote).setLabel(t('command:help/button/vote'))
    ]);

    const categories: Record<string, string[]> = {};
    const categoriesEmoji: Record<string, string> = {};

    const language = recommendLocale(interaction.locale);

    const initialEmbed = new EmbedBuilder()
      .setDescription(t('command:help/embed/description', this.client.config.links.support, this.client.config.links.invite, this.client.commands.size))
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setColor('Blurple');

    const Row = new ActionRowBuilder<SelectMenuBuilder>();
    const finalSelect = new SelectMenuBuilder().setCustomId('help').setPlaceholder(t('command:help/menu/placeholder'));

    for (const command of this.client.commands.values()) {
      if (!command.config.showInHelp) continue;

      const localizedCommandName = this.client.languages.manager.get(language, `commandNames:${command.rawName.toLowerCase() as CommandNamesKeys}`);
      const localizedCommandCategory = this.client.languages.manager.get(language, `commandCategories:${command.rawCategory as CommandCategoriesKeys}`);
      const localizedCommandDescription = this.client.languages.manager.get(language, `commandDescriptions:${command.rawName.toLowerCase() as CommandDescriptionsKeys}`);

      const categoryWithoutEmoji = localizedCommandCategory.slice(2).trim();

      let categoryEmoji = localizedCommandCategory.split(' ')[0].trim();

      // If the category don't have a emoji, set ❓ as default emoji
      categoryEmoji = categoryEmoji.length > 2 ? '❓' : categoryEmoji;

      if (!categories[localizedCommandCategory]) {
        categories[localizedCommandCategory] = [];
        finalSelect.addOptions([new SelectMenuOptionBuilder().setValue(categoryWithoutEmoji).setLabel(categoryWithoutEmoji).setEmoji(categoryEmoji)]);
      }

      categories[localizedCommandCategory].push(` → \`${localizedCommandName}\` ${localizedCommandDescription}`);
      categoriesEmoji[categoryWithoutEmoji] = localizedCommandCategory;
    }

    Row.setComponents([finalSelect]);

    const message = interaction.inGuild()
      ? await interaction.editReply({
          embeds: [initialEmbed],
          components: [Row, Row1]
        })
      : await interaction.editReply({
          content: t('command:help/warn/guildonly-commands'),
          embeds: [initialEmbed],
          components: [Row, Row1]
        });
    const collector = message.createMessageComponentCollector({
      filter: int => int.user.id === interaction.user.id,
      time: 300000 /* 5 minutes */
    });

    collector.on('collect', async (int: SelectMenuInteraction) => {
      await int.deferUpdate();

      const rawCategory = categoriesEmoji[int.values[0]];
      const embed = new EmbedBuilder().setTitle(rawCategory).setColor('Yellow');

      embed.setDescription(categories[rawCategory].join('\n'));
      interaction.inGuild()
        ? interaction.editReply({ embeds: [embed] })
        : interaction.editReply({
            content: t('command:help/warn/guildonly-commands'),
            embeds: [embed]
          });
    });

    collector.on('end', () => {
      interaction.inGuild()
        ? interaction.editReply({ embeds: [initialEmbed], components: [Row1] })
        : interaction.editReply({
            content: t('command:help/warn/guildonly-commands'),
            embeds: [initialEmbed],
            components: [Row1]
          });
    });
  }
}
