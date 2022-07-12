import { Command, CommandRunOptions } from '../../structures/Command';
import type { DenkyClient } from '../../types/Client';

export default class TextVaporwaveSubCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = '';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: false
    };
    this.permissions = { bot: [] };
  }

  override async run({ interaction }: CommandRunOptions) {
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
