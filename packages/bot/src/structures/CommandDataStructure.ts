import type { DenkyClient } from '#types/Client';
import { ChatInputApplicationCommandData, SlashCommandBuilder } from 'discord.js';
import type { CommandDescriptionsKeys, CommandNamesKeys } from '../lib/managers/LanguageManager';

function localizationObject(client: DenkyClient, path: `commandNames:${CommandNamesKeys}` | `commandDescriptions:${CommandDescriptionsKeys}`) {
  return {
    'pt-BR': client.languages.manager.get('pt_BR', path as never),
    'en-US': client.languages.manager.get('en_US', path as never)
  };
}

export class CommandDataStructure extends SlashCommandBuilder {
  client: DenkyClient;
  data: ChatInputApplicationCommandData;
  constructor(client: DenkyClient);
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor(client: DenkyClient) {
    super();
    this.client = client;
  }

  t(path: `commandNames:${CommandNamesKeys}` | `commandDescriptions:${CommandDescriptionsKeys}`) {
    return this.client.languages.manager.get('en_US', path as never);
  }

  localizations(path: `commandNames:${CommandNamesKeys}` | `commandDescriptions:${CommandDescriptionsKeys}`) {
    return localizationObject(this.client, path);
  }
}
