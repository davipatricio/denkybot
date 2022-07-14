import { PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../structures/Command';
import type { DenkyClient } from '../../types/Client';

export default class AnimalCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'ANIMAL';
    this.rawCategory = 'UTILS';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [PermissionFlagsBits.EmbedLinks] };
  }

  override run({ t, interaction }: CommandRunOptions) {
    switch (interaction.options.getSubcommand()) {
      case 'panda':
        this.client.commands.get('_animal_panda')?.run({ t, interaction });
        break;

      case 'dog':
        this.client.commands.get('_animal_dog')?.run({ t, interaction });
        break;

      case 'koala':
        this.client.commands.get('_animal_koala')?.run({ t, interaction });
        break;

      case 'bunny':
        this.client.commands.get('_animal_bunny')?.run({ t, interaction });
        break;

      case 'cat':
        this.client.commands.get('_animal_cat')?.run({ t, interaction });
        break;

      case 'duck':
        this.client.commands.get('_animal_duck')?.run({ t, interaction });
        break;

      case 'foxy':
        this.client.commands.get('_animal_foxy')?.run({ t, interaction });
        break;
    }
  }
}
