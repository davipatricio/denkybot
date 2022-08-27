import type { CommandLocale, CommandRunOptions } from '@bot/src/structures/Command';
import { SubCommand } from '@bot/src/structures/SubCommand';
import type { AutoRole } from '@prisma/client';
import { ActionRowBuilder, ChatInputCommandInteraction, Colors, EmbedBuilder, Message, SelectMenuBuilder } from 'discord.js';

type PageTypes = 'autorole' | 'roles' | 'delay' | 'bots';

export default class AutoRoleSubCommand extends SubCommand {
  async run({ t, interaction }: CommandRunOptions) {
    if (!interaction.inCachedGuild()) return;
    const configStatus = (await this.client.databases.getAutoRole(interaction.guild.id)) ?? undefined;

    const selectRow = new ActionRowBuilder<SelectMenuBuilder>();
    const { embed /* , buttonRow */ } = this.updateMessage('autorole', null, selectRow, interaction, configStatus, t);

    await interaction.editReply({
      components: [selectRow /* , buttonRow */],
      embeds: [embed]
    });
  }

  updateMessage(page: PageTypes, message: Message | null, selectRow: ActionRowBuilder<SelectMenuBuilder>, interaction: ChatInputCommandInteraction, config: AutoRole | undefined, t: CommandLocale) {
    const embed = this.generateEmbedPage(page, interaction, config, t);
    // const buttonRow = this.generateButtonsFromPage(page, config, t);
    message?.edit({ components: [selectRow /* buttonRow */], embeds: [embed] });
    return { embed /* , buttonRow */ };
  }

  generateEmbedPage(page: PageTypes, { user }: ChatInputCommandInteraction, configStatus: AutoRole | undefined, t: CommandLocale) {
    const embed = new EmbedBuilder({
      timestamp: Date.now(),
      footer: { text: user.tag, iconURL: user.displayAvatarURL() }
    })
      .setColor(Colors.Blurple)
      .setTitle('🔧 AutoRole');
    switch (page) {
      case 'autorole':
        return embed.setDescription(configStatus ? `✅ **|** ${t('command:config/suggestions/enabled')}` : `❌ **|** ${t('command:config/suggestions/disabled')}`);
      default:
        return embed;
    }
  }

  // generateButtonsFromPage(page: PageTypes, configStatus: AutoRole | undefined, t: CommandLocale) {}
}
