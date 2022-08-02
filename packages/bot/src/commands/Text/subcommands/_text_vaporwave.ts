import type { CommandRunOptions } from '#structures/Command';
import { SubCommand } from '#structures/SubCommand';

export default class TextVaporwaveSubCommand extends SubCommand {
  async run({ interaction }: CommandRunOptions) {
    await interaction.deferReply({ ephemeral: true });

    const text = interaction.options.getString('text', true);
    const vaporwaveText = text
      .split('')
      .map(str => {
        const char = str.charCodeAt(0);

        return char >= 33 && char <= 126 ? String.fromCharCode(char - 33 + 65_281) : str;
      })
      .join('')
      .slice(0, 1500);
    interaction.editReply(vaporwaveText);
  }
}
