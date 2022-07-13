import type { Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction, PermissionResolvable } from 'discord.js';
import type { AllLocalePaths, CommandCategoriesKeys, CommandNamesKeys } from '../lib/managers/LanguageManager';
import type { DenkyClient } from '../types/Client';

class Command {
  /** The client that instanced this command */
  client: DenkyClient;

  /** The raw command name. A user-friendly name will be shown through i18n. */
  rawName: Uppercase<CommandNamesKeys | ''>;
  /** The raw category name, uppercase. A user-friendly name will be shown through i18n. */
  rawCategory: CommandCategoriesKeys | '';
  /** Required permissions to execute the command. */
  permissions: {
    /** Which permissions the bot needs to have. */
    bot: PermissionResolvable[];
  };

  /** Internal command configuration */
  config: {
    /** If `autoDefer` is true, whether this command will be an ephemeral message */
    ephemeral: boolean;
    /** Whether the bot should automatically call `interaction.deferReply()` */
    autoDefer: boolean;
    /** Whether this command should be hidden from the help command */
    showInHelp: boolean;
  };

  /** Command options to be posted to Discord */
  options: ChatInputApplicationCommandData;

  constructor(client: DenkyClient) {
    this.client = client;

    this.rawName = '';
    this.rawCategory = '';
    this.permissions = {
      bot: []
    };
    this.config = {
      ephemeral: false,
      autoDefer: true,
      showInHelp: true
    };
  }

  run({ t, interaction }: CommandRunOptions): Awaitable<any> {
    return { t, interaction };
  }
}

export type CommandLocale = (path: AllLocalePaths, ...args: unknown[]) => string;
export type CommandRunOptions = { t: CommandLocale; interaction: ChatInputCommandInteraction };

export { Command };
