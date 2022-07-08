import { EmbedBuilder } from 'discord.js';
import { request } from 'undici';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class WikipediaCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'WIKIPEDIA';
    this.rawCategory = 'UTILS';
    this.config = {
      autoDefer: true,
      ephemeral: false,
      showInHelp: true
    };
    this.permissions = { bot: [] };
  }

  override async run({ t, interaction }: CommandRunOptions) {
    const option = interaction.options.getString('search', true);
    const locale = interaction.options.getString('language') ?? 'en';

    const res = await request(`https://${locale}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(option)}`, { maxRedirections: 2 }).then(x => x.body.json());

    if (!res || !res.title || res.title === 'Not found.') {
      interaction.editReply(t('command:wikipedia/error/no-results'));
      return;
    }

    if (res.type === 'disambiguation') {
      interaction.editReply(t('command:wikipedia/error/disambiguation'));
      return;
    }

    const embed = new EmbedBuilder()
      .setTimestamp()
      .setColor('Purple')
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setTitle(`🌐 ${res.title}`)
      .setDescription(res.extract.slice(0, 2040))
      .addFields([
        {
          name: t('command:wikipedia/embeds/fields/title'),
          value: t('command:wikipedia/embeds/fields/value', res.content_urls.desktop.page, res.pageid)
        }
      ]);

    interaction.editReply({ embeds: [embed] });
  }
}
