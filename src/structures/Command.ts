import type { Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction, PermissionResolvable } from 'discord.js';
import type { AllLocalePaths, CommandCategoriesKeys } from '../bot/managers/LanguageManager';
import type { DenkyClient } from '../types/Client';

class Command {
  /** The client that instantied this command */
  client: DenkyClient;

  /** The raw command name. A user-friedly name will be shown through i18n. */
  rawName: string;
  /** The raw category name, uppercase. A user-friedly name will be shown through i18n. */
  rawCategory: CommandCategoriesKeys;
  /** Required permissions to execute the command. */
  permissions: {
    /** Which permissions the user needs to have. */
    user: PermissionResolvable[];
    /** Which permissions the bot needs to have. */
    bot: PermissionResolvable[];
  };

  /** Internal command configuration */
  config: {
    /** If `autoDefer` is true, whether this command will be a ephemeral message */
    ephemeral: boolean;
    /** Whether the bot should automatically call `interaction.deferReply()` */
    autoDefer: boolean;
    /** Whether this command should be hidden from the help command */
    showInHelp: boolean;
    /** Whether this command should only be available in guilds */
    guildOnly: boolean;
  };

  /** Command options to be posted to Discord */
  options: ChatInputApplicationCommandData;

  constructor(client: DenkyClient) {
    this.client = client;

    this.rawName = '';
    this.permissions = {
      user: [],
      bot: [],
    };
    this.config = {
      ephemeral: false,
      autoDefer: true,
      showInHelp: true,
      guildOnly: true,
    };
  }

  run({ t, interaction }: CommandRunOptions): Awaitable<any> {
    return { t, interaction };
  }

  addRawOptions(options: ChatInputApplicationCommandData) {
    this.options = options;
  }
}

export type CommandLocale = (path: AllLocalePaths, ...args: unknown[]) => string;

export type CommandRunOptions = { t: CommandLocale; interaction: ChatInputCommandInteraction };

export { Command };
