import { CommandDataStructure } from '#structures/CommandDataStructure';
import type { DenkyClient } from '#types/Client';
import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from 'discord.js';

export default class LockdownData extends CommandDataStructure {
  constructor(client: DenkyClient) {
    super(client);

    this.data = {
      name: client.languages.manager.get('en_US', 'commandNames:lockdown'),
      nameLocalizations: {
        'pt-BR': client.languages.manager.get('pt_BR', 'commandNames:lockdown')
      },
      type: ApplicationCommandType.ChatInput,
      dmPermission: false,
      defaultMemberPermissions: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageGuild],
      description: 'Bloqueia todos os canais que membros podem conversar ou desbloqueia esses que foram bloqueados por mim.',
      options: [
        {
          name: 'ativar',
          description: 'Bloqueia todos os canais que membros podem conversar.',
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: 'desativar',
          description: 'Desbloqueia todos os canais que foram bloqueados por mim.',
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    };
  }
}
