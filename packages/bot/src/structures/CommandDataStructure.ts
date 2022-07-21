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
import type { CommandDescriptionsKeys, CommandNamesKeys } from '../lib/managers/LanguageManager';

type DenkyLocalizationFields = {
  name: CommandNamesKeys;
  description: CommandDescriptionsKeys;
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
  name: CommandNamesKeys;
  description: CommandDescriptionsKeys;
  dmPermission: boolean;
  type: ApplicationCommandType.ChatInput;
  options?: DenkyApplicationCommandOptionData[];
};

export class CommandDataStructure {
  data: ChatInputApplicationCommandData;
  constructor(client: DenkyClient);
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

  parseData(client: DenkyClient, rawData: DenkyChatInputApplicationCommandData) {
    this.data = {
      ...rawData,
      name: client.languages.manager.get('en_US', `commandNames:${rawData.name}`),
      nameLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', `commandNames:${rawData.name}`)
      },
      description: client.languages.manager.get('en_US', `commandDescriptions:${rawData.description}`),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', `commandDescriptions:${rawData.description}`)
      },
      type: ApplicationCommandType.ChatInput
    };

    if (rawData.options) {
      this.data.options = rawData.options.map((option: DenkyApplicationCommandOptionData) => CommandDataStructure.parseOptions(client, option));
    }
  }

  static parseOptions(client: DenkyClient, rawData: DenkyApplicationCommandOptionData) {
    const finalObject = {
      ...rawData,
      name: client.languages.manager.get('en_US', `commandNames:${rawData.name}`),
      nameLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', `commandNames:${rawData.name}`)
      },
      description: client.languages.manager.get('en_US', `commandDescriptions:${rawData.description}`),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', `commandDescriptions:${rawData.description}`)
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
        finalObject.options = ((rawData.options as DenkyApplicationCommandSubCommandData[] | undefined)?.map(subOption => {
          const subCommandFinalObject: ApplicationCommandSubCommandData = {
            ...subOption,
            name: client.languages.manager.get('en_US', `commandNames:${subOption.name}`),
            nameLocalizations: {
              'pt-BR': client.languages.manager.get('pt_BR', `commandNames:${subOption.name}`)
            },
            description: client.languages.manager.get('en_US', `commandDescriptions:${subOption.description}`),
            descriptionLocalizations: {
              'pt-BR': client.languages.manager.get('pt_BR', `commandDescriptions:${subOption.description}`)
            }
          } as unknown as ApplicationCommandSubCommandData;

          return subCommandFinalObject;
        }) ?? undefined) as ApplicationCommandSubCommandData['options'];

        break;
      }
    }

    return finalObject;
  }

  static #parseSubcommandGroup(client: DenkyClient, rawData: DenkyApplicationCommandSubGroupData) {
    const finalObject = [] as ApplicationCommandSubCommandData[];

    finalObject.push(
      rawData.options.map((subOption: DenkyApplicationCommandSubCommandData) => {
        const subCommandGroupFinalObject = {
          ...subOption,
          name: client.languages.manager.get('en_US', `commandNames:${rawData.name}`),
          nameLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', `commandNames:${rawData.name}`)
          },
          description: client.languages.manager.get('en_US', `commandDescriptions:${rawData.description}`),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', `commandDescriptions:${rawData.description}`)
          }
        };

        if (subOption.options) {
          subCommandGroupFinalObject.options = subOption.options.map(subSubOption =>
            CommandDataStructure.parseOptions(client, subSubOption as unknown as DenkyApplicationCommandOptionData)
          ) as ApplicationCommandSubCommandData['options'];
        }

        return subCommandGroupFinalObject;
      }) as unknown as ApplicationCommandSubCommandData
    );

    return finalObject;
  }
}
