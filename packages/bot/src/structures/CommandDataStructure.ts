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
  options?: DenkyApplicationCommandOptionData[];
};

const removeCmdArgs = (cmd: string): string => cmd.split(' ')[0];

export class CommandDataStructure {
  data: ChatInputApplicationCommandData;
  constructor(client: DenkyClient);
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

  protected parseData(client: DenkyClient, rawData: DenkyChatInputApplicationCommandData) {
    this.data = {
      ...rawData,
      name: removeCmdArgs(client.languages.manager.get('en_US', `commandNames:${rawData.name}`)),
      nameLocalizations: {
        'pt-BR': removeCmdArgs(client.languages.manager.get('pt_BR', `commandNames:${rawData.name}`))
      },
      description: client.languages.manager.get('en_US', `commandDescriptions:${rawData.description}`),
      descriptionLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', `commandDescriptions:${rawData.description}`)
      },
      type: ApplicationCommandType.ChatInput
    };

    if (rawData.options) this.data.options = rawData.options.map((option: DenkyApplicationCommandOptionData) => CommandDataStructure.parseOptions(client, option));
  }

  static parseOptions(client: DenkyClient, rawData: DenkyApplicationCommandOptionData) {
    const finalObject = {
      ...rawData,
      name: removeCmdArgs(client.languages.manager.get('en_US', `commandNames:${rawData.name}`)),
      nameLocalizations: {
        'pt-BR': removeCmdArgs(client.languages.manager.get('pt_BR', `commandNames:${rawData.name}`))
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
        name: removeCmdArgs(client.languages.manager.get('en_US', `commandNames:${option.name}`)),
        nameLocalizations: {
          'pt-BR': removeCmdArgs(client.languages.manager.get('pt_BR', `commandNames:${option.name}`))
        },
        description: client.languages.manager.get('en_US', `commandDescriptions:${option.description}`),
        descriptionLocalizations: {
          'pt-BR': client.languages.manager.get('pt_BR', `commandDescriptions:${option.description}`)
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
          name: removeCmdArgs(client.languages.manager.get('en_US', `commandNames:${rawData.name}`)),
          nameLocalizations: {
            'pt-BR': removeCmdArgs(client.languages.manager.get('pt_BR', `commandNames:${rawData.name}`))
          },
          description: client.languages.manager.get('en_US', `commandDescriptions:${rawData.description}`),
          descriptionLocalizations: {
            'pt-BR': client.languages.manager.get('pt_BR', `commandDescriptions:${rawData.description}`)
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
