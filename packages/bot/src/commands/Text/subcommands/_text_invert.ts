import type { CommandRunOptions } from '#structures/Command';
import { SubCommand } from '#structures/SubCommand';

export default class TextInvertSubCommand extends SubCommand {
  async run({ interaction }: CommandRunOptions) {
    await interaction.deferReply({ ephemeral: true });

    const text = interaction.options.getString('text', true);
    const reverse = text.split('').reverse().join('').slice(0, 1500);
    interaction.editReply(reverse);
  }
}
