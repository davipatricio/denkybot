import type { CommandCategoriesKeys, CommandNamesKeys, translateTuple } from '#lib/managers/LanguageManager';
import type { DenkyClient } from '#types/Client';
import type { AutocompleteInteraction, Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction, PermissionResolvable } from 'discord.js';

export type CommandLocale = typeof translateTuple;
export type CommandRunOptions = { t: CommandLocale; interaction: ChatInputCommandInteraction };
export type AutocompleteRunOptions = { t: CommandLocale; interaction: AutocompleteInteraction };

type baseConfig = {
  /** Whether this command should be hidden from the help command */
  showInHelp: boolean;
};
type ephemeralConfig = baseConfig & {
  /** Whether the bot should automatically call `interaction.deferReply()` */
  autoDefer: true;
  /** If `autoDefer` is true, whether this command will be an ephemeral message */
  ephemeral: boolean;
};
type nonEphemeralConfig = baseConfig & {
  /** Whether the bot should automatically call `interaction.deferReply()` */
  autoDefer: false;
  /** If `autoDefer` is true, whether this command will be an ephemeral message */
  ephemeral: false;
};

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
  config: ephemeralConfig | nonEphemeralConfig;

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

  runAutocomplete({ t, interaction }: AutocompleteRunOptions): Awaitable<any> {
    return { t, interaction };
  }
}

export { Command };
