/* eslint-disable no-await-in-loop */
import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { PermissionFlagsBits } from 'discord.js';

export default class ButtonRoleCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.ManageChannels, PermissionFlagsBits.ManageGuild] };
  }

  override run({ interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand(true)) {
      case 'create':
        this.#createButtonRole();
        break;
    }
  }

  #createButtonRole() {
    this.client.databases.buttonRole.create({
      data: {
        actions: {
          create: [
            {
              customId: '',
              roleId: ''
            }
          ]
        }
      }
    });
  }
}
