import type { DenkyClient } from '#types/Client';
import {
  ApplicationCommandAutocompleteOption,
  ApplicationCommandChannelOptionData,
  ApplicationCommandChoicesData,
  ApplicationCommandNonOptionsData,
  ApplicationCommandNumericOptionData,
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
  ApplicationCommandStringOptionData,
  ApplicationCommandSubCommandData,
  ApplicationCommandSubGroupData,
  ApplicationCommandType,
  ChatInputApplicationCommandData
} from 'discord.js';
import type { CommandDescriptionsKeys, CommandNamesKeys, SupportedLocales } from '../lib/managers/LanguageManager';

type DenkyLocalizationFields = {
  name: `ignore:${string}` | CommandNamesKeys;
  description: `ignore:${string}` | CommandDescriptionsKeys;
};

type DenkyApplicationCommandSubCommandData = ApplicationCommandSubCommandData & DenkyLocalizationFields;
type DenkyApplicationCommandSubGroupData = ApplicationCommandSubGroupData &
  DenkyLocalizationFields & {
    options: DenkyApplicationCommandSubCommandData[];
  };

type DenkyApplicationCommandOptionData = (
  | DenkyApplicationCommandSubGroupData
  | ApplicationCommandNonOptionsData
  | ApplicationCommandChannelOptionData
  | ApplicationCommandChoicesData
  | ApplicationCommandAutocompleteOption
  | ApplicationCommandNumericOptionData
  | ApplicationCommandStringOptionData
  | DenkyApplicationCommandSubCommandData
) &
  DenkyLocalizationFields;

type DenkyChatInputApplicationCommandData = ChatInputApplicationCommandData & {
  name: `ignore:${string}` | CommandNamesKeys;
  description: `ignore:${string}` | CommandDescriptionsKeys;
  dmPermission: boolean;
  options?: DenkyApplicationCommandOptionData[];
};

const removeCmdArgs = (cmd: string) => cmd.split(' ')[0];

function translateCommandKey(client: DenkyClient, key: string, lang: SupportedLocales) {
  if (key.startsWith('ignore:')) return key.slice('ignore:'.length);
  return removeCmdArgs(client.languages.manager.get(lang, `commandNames:${key as CommandNamesKeys}`));
}

function translateDescriptionKey(client: DenkyClient, key: string, lang: SupportedLocales) {
  if (key.startsWith('ignore:')) return key.slice('ignore:'.length);
  return client.languages.manager.get(lang, `commandDescriptions:${key as CommandDescriptionsKeys}`);
}

export class CommandDataStructure {
  data: ChatInputApplicationCommandData;
  constructor(client: DenkyClient);
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

  protected parseData(client: DenkyClient, rawData: DenkyChatInputApplicationCommandData) {
    this.data = {
      ...rawData,
      name: translateCommandKey(client, rawData.name, 'en_US'),
      nameLocalizations: {
        'pt-BR': translateCommandKey(client, rawData.name, 'pt_BR')
      },
      description: translateCommandKey(client, rawData.name, 'en_US'),
      descriptionLocalizations: {
        'pt-BR': translateDescriptionKey(client, rawData.name, 'pt_BR')
      },
      type: ApplicationCommandType.ChatInput
    };

    if (rawData.options) this.data.options = rawData.options.map((option: DenkyApplicationCommandOptionData) => CommandDataStructure.parseOptions(client, option));
  }

  static parseOptions(client: DenkyClient, rawData: DenkyApplicationCommandOptionData) {
    const finalObject = {
      ...rawData,
      name: translateCommandKey(client, rawData.name, 'en_US'),
      nameLocalizations: {
        'pt-BR': translateCommandKey(client, rawData.name, 'pt_BR')
      },
      description: translateCommandKey(client, rawData.name, 'en_US'),
      descriptionLocalizations: {
        'pt-BR': translateDescriptionKey(client, rawData.name, 'pt_BR')
      }
    } as ApplicationCommandOptionData;

    switch (rawData.type) {
      case ApplicationCommandOptionType.SubcommandGroup: {
        if (finalObject.type !== ApplicationCommandOptionType.SubcommandGroup) break;
        finalObject.options = CommandDataStructure.#parseSubcommandGroup(client, rawData);
        break;
      }
      case ApplicationCommandOptionType.Subcommand: {
        if (finalObject.type !== ApplicationCommandOptionType.Subcommand) break;
        finalObject.options = CommandDataStructure.#parseSubcommand(client, rawData.options as unknown as DenkyApplicationCommandSubCommandData[]);
        break;
      }
    }

    return finalObject;
  }

  static #parseSubcommand(client: DenkyClient, options: DenkyApplicationCommandSubCommandData[]) {
    return (options?.map(option => {
      const subCommandFinalObject = {
        ...option,
        name: translateCommandKey(client, option.name, 'en_US'),
        nameLocalizations: {
          'pt-BR': translateCommandKey(client, option.name, 'pt_BR')
        },
        description: translateCommandKey(client, option.name, 'en_US'),
        descriptionLocalizations: {
          'pt-BR': translateDescriptionKey(client, option.name, 'pt_BR')
        }
      };

      return subCommandFinalObject;
    }) ?? []) as unknown as ApplicationCommandSubCommandData['options'];
  }

  static #parseSubcommandGroup(client: DenkyClient, rawData: DenkyApplicationCommandSubGroupData) {
    const finalObject = [] as ApplicationCommandSubCommandData[];

    finalObject.push(
      rawData.options.map((subOption: DenkyApplicationCommandSubCommandData) => {
        const subCommandGroupFinalObject = {
          ...subOption,
          name: translateCommandKey(client, rawData.name, 'en_US'),
          nameLocalizations: {
            'pt-BR': translateCommandKey(client, rawData.name, 'pt_BR')
          },
          description: translateCommandKey(client, rawData.name, 'en_US'),
          descriptionLocalizations: {
            'pt-BR': translateDescriptionKey(client, rawData.name, 'pt_BR')
          }
        };

        if (subOption.options)
          subCommandGroupFinalObject.options = subOption.options.map(subSubOption =>
            CommandDataStructure.parseOptions(client, subSubOption as unknown as DenkyApplicationCommandOptionData)
          ) as ApplicationCommandSubCommandData['options'];

        return subCommandGroupFinalObject;
      }) as unknown as ApplicationCommandSubCommandData
    );

    return finalObject;
  }
}
