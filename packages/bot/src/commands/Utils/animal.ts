import { Command, CommandRunOptions } from '#structures/Command';
import type { DenkyClient } from '#types/Client';
import { Colors, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

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

  override async run({ t, interaction }: CommandRunOptions) {
    const baseEmbed = new EmbedBuilder().setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() }).setTimestamp().setColor(Colors.Purple);

    switch (interaction.options.getSubcommand(true)) {
      case 'bunny':
        baseEmbed.setTitle(t('command:animal/bunny')).setImage(await this.client.apis.animals.getRandomBunny());
        break;
      case 'cat':
        baseEmbed.setTitle(t('commandNames:animal/cat')).setImage(await this.client.apis.animals.getRandomCat());
        break;
      case 'dog':
        baseEmbed.setTitle(t('command:animal/dog')).setImage(await this.client.apis.animals.getRandomCat());
        break;
      case 'duck':
        baseEmbed.setTitle(t('command:animal/duck')).setImage(await this.client.apis.animals.getRandomDuck());
        break;
      case 'foxy':
        baseEmbed.setTitle(t('command:animal/foxy')).setImage(await this.client.apis.animals.getRandomFoxy());
        break;
      case 'koala':
        baseEmbed.setTitle(t('command:animal/koala')).setImage(await this.client.apis.animals.getRandomKoala());
        break;
      case 'panda':
        baseEmbed.setTitle(t('command:animal/bunny')).setImage(await this.client.apis.animals.getRandomPanda());
        break;
    }

    interaction.editReply({ embeds: [baseEmbed] });
  }
}
