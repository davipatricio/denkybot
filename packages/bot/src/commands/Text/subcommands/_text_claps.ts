import type { CommandRunOptions } from '#structures/Command';
import { SubCommand } from '#structures/SubCommand';

export default class TextClapsSubCommand extends SubCommand {
  async run({ interaction }: CommandRunOptions) {
    await interaction.deferReply({ ephemeral: true });

    const text = interaction.options.getString('text', true);
    const claps = text.split(' ').join(' 👏 ').slice(0, 1500);
    interaction.editReply(claps);
  }
}
