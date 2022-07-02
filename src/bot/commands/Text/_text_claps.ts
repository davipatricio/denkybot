import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class TextClapsSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false,
      guildOnly: true
    };
    this.permissions = { bot: [], user: [] };
  }

  override async run({ interaction }: CommandRunOptions) {
    await interaction.deferReply({ ephemeral: true });

    const text = interaction.options.getString('text', true);
    const claps = text.split(' ').join(' 👏 ').slice(0, 1500);
    interaction.editReply(claps);
  }
}
