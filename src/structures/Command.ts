import type { Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction, PermissionResolvable } from 'discord.js';
import type { FunctionKeys, NonFunctionKeys } from 'utility-types';
import type { CommandCategoriesKeys, CommandDescriptionsKeys, CommandLocaleKeysObject, CommandLocaleKeysObjectGeneric, CommandNamesKeys, PermissionLocaleKeys } from '../bot/managers/LanguageManager';
import type { DenkyClient } from '../types/Client';

class Command {
  /** The client that instantied this command */
  client: DenkyClient;

  /** The raw command name. A user-friedly name will be shown through i18n. */
  rawName: Uppercase<CommandNamesKeys | ''>;
  /** The raw category name, uppercase. A user-friedly name will be shown through i18n. */
  rawCategory: CommandCategoriesKeys | '';
  /** Required permissions to execute the command. */
  permissions: {
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

function t<K extends FunctionKeys<CommandLocaleKeysObject>>(path: `command:${K}`, ...rest: Parameters<CommandLocaleKeysObjectGeneric<K>>): string;
function t<K extends NonFunctionKeys<CommandLocaleKeysObject>>(path: `command:${K}`): string;
function t(path: `commandDescriptions:${CommandDescriptionsKeys}`): string;
function t(path: `commandCategories:${CommandCategoriesKeys}`): string;
function t(path: `commandNames:${CommandNamesKeys}`): string;
function t(path: `permissions:${PermissionLocaleKeys}`): string;

function t(path: string, ...rest: unknown[]) {
  return `${path}${rest}`;
}

export type CommandLocale = typeof t;
export type CommandRunOptions = { t: typeof t; interaction: ChatInputCommandInteraction };

export { Command };
