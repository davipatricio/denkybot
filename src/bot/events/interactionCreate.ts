import { CommandInteraction, GuildMember, Interaction, Locale } from 'discord.js';
import type { Command, CommandLocale, CommandRunOptions } from '../../structures/Command';
import { Event } from '../../structures/Event';
import type { DenkyClient } from '../../types/Client';
import type { AllLocalePaths, SupportedLocales } from '../managers/LanguageManager';

export default class InteractionCreateEvent extends Event {
  constructor() {
    super();
    this.eventName = 'interactionCreate';
  }

  override async run(client: DenkyClient, interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const botCommand = client.commands.get(interaction.commandName);
    if (!botCommand) return;

    let userLocale: SupportedLocales = 'en_US';
    switch (interaction.locale) {
      case Locale.EnglishUS:
      case Locale.EnglishGB:
        userLocale = 'en_US';
        break;
      case Locale.PortugueseBR:
        userLocale = 'pt_BR';
        break;
      default:
        userLocale = 'en_US';
        break;
    }

    const t = (path: AllLocalePaths, ...args: unknown[]) => {
      return client.languages.manager.get(userLocale, path, ...args);
    };

    if (!InteractionCreateEvent.checkBotPermissions(interaction, botCommand, t)) return;
    if (!InteractionCreateEvent.checkMemberPermissions(interaction, botCommand, t)) return;

    if (botCommand.config.autoDefer) await interaction.deferReply({ ephemeral: botCommand.config.ephemeral });

    botCommand.run({ client, interaction, t } as CommandRunOptions);
  }

  static checkBotPermissions(interaction: CommandInteraction, command: Command, t: CommandLocale): boolean {
    if (command.permissions.bot.length === 0) return true;
    if (!interaction.guild?.me?.permissions.has(command.permissions.bot)) {
      interaction.reply({ content: `❌ ${interaction.user} **|** ${t('command:permissions/bot/missing', command.permissions.bot)}`, ephemeral: true });
      return false;
    }
    return true;
  }

  static checkMemberPermissions(interaction: CommandInteraction, command: Command, t: CommandLocale): boolean {
    if (command.permissions.user.length === 0) return true;
    if (!(interaction.member as GuildMember).permissions.has(command.permissions.user)) {
      interaction.reply({ content: `❌ ${interaction.user} **|** ${t('command:permissions/user/missing', command.permissions.user)}`, ephemeral: true });
      return false;
    }
    return true;
  }
}
