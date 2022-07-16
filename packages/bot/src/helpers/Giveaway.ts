import dayjs from 'dayjs';
import { ActionRowBuilder, EmbedBuilder, Interaction, SelectMenuBuilder, SelectMenuOptionBuilder } from 'discord.js';
import { recommendLocale } from '@bot/src/helpers/Locale';
import type { CommandLocale } from '@bot/src/structures/Command';
import type { DenkyClient } from '#types/Client';

export async function handleInteraction(client: DenkyClient, interaction: Interaction) {
  const guildLocale = recommendLocale(interaction.guild!.preferredLocale);

  const t: CommandLocale = (path: Parameters<CommandLocale>[0], ...args: any) => {
    return client.languages.manager.get(guildLocale, path, ...args);
  };

  if (!interaction.isButton()) return;
  switch (interaction.customId) {
    case 'giveaway_participate': {
      await interaction.deferReply({ ephemeral: true });

      const giveawayData = await client.databases.getGiveaway(interaction.message.id);
      if (!giveawayData || giveawayData.ended) return;

      if (giveawayData.participants.includes(interaction.user.id)) {
        interaction.editReply({ content: `❌ **|** ${t('command:giveaway/helper/error/alreadyParticipating')}` });
        return;
      }

      await client.databases.updateGiveaway({
        ...giveawayData,
        participants: [...giveawayData.participants, interaction.user.id]
      });
      interaction.editReply({ content: `🎉 **|** ${t('command:giveaway/helper/participate')}` });
      break;
    }
    case 'giveaway_desist': {
      await interaction.deferReply({ ephemeral: true });

      const giveawayData = await client.databases.getGiveaway(interaction.message.id);
      if (!giveawayData || giveawayData.ended) return;

      if (!giveawayData.participants.includes(interaction.user.id)) {
        interaction.editReply({ content: `❌ **|** ${t('command:giveaway/helper/error/notParticipating')}` });
        return;
      }

      await client.databases.updateGiveaway({
        ...giveawayData,
        participants: giveawayData.participants.filter(id => id !== interaction.user.id)
      });
      interaction.editReply({ content: `👋 **|** ${t('command:giveaway/helper/exitGiveaway')}` });
      break;
    }
  }
}

export async function checkEndedGiveaways(client: DenkyClient) {
  const giveawaysArray = await client.databases.fetchGiveaways();
  giveawaysArray.forEach(async giveaway => {
    const { winnerAmount, participants, channelId, description, messageId, endTimestamp } = giveaway;
    // If current timestamp is lower than end timestamp, the giveaway is not ended
    if (BigInt(Date.now()) < endTimestamp) return;
    const channel = await client.channels.fetch(channelId).catch(() => {});
    if (!channel || !channel.isTextBased()) {
      await client.databases.deleteGiveaway(messageId);
      return;
    }
    const message = await channel.messages.fetch(messageId).catch(() => {});
    if (!message || !message.embeds[0]) {
      await client.databases.deleteGiveaway(messageId);
      return;
    }

    const guildLocale = recommendLocale(message.guild!.preferredLocale);

    const t: CommandLocale = (path: Parameters<CommandLocale>[0], ...args: any) => {
      return client.languages.manager.get(guildLocale, path, ...args);
    };

    await client.databases.updateGiveaway({
      ...giveaway,
      ended: true
    });

    const embed = new EmbedBuilder(message.embeds[0].toJSON())
      .setDescription(t('command:giveaway/helper/embed/description', description, winnerAmount, Math.round(Date.now() / 1000)))
      .setFooter({ text: `⏰ ${t('command:giveaway/helper/embed/footer')}` })
      .setColor('Green');

    const row = new ActionRowBuilder<SelectMenuBuilder>().setComponents([
      new SelectMenuBuilder()
        .setCustomId('dropdown')
        .setPlaceholder(t('command:giveaway/helper/button/placeholder'))
        .addOptions([
          new SelectMenuOptionBuilder().setEmoji('🔁').setLabel(t('command:giveaway/helper/button/label')).setValue('reroll').setDescription(t('command:giveaway/helper/button/description'))
        ])
    ]);

    if (participants.length) {
      if (participants.length >= winnerAmount) {
        // Get random X winners from participants
        const winners: string[] = [];
        // Shuffle participants 7 times to get a random order
        for (let i = 0; i < 7; i++) participants.sort(() => Math.random() - 0.5);

        winners.push(...participants.slice(0, winnerAmount));

        const winnerString = winners.length > 1 ? `${winners.map(m => `<@!${m}>`).join(', ')}` : `<@!${winners[0]}>`;
        embed.addFields([{ name: `🌟 ${t('command:giveaway/helper/embed/field/name')}`, value: winnerString }]);
      } else
        embed
          .addFields([
            {
              name: `🌟 ${t('command:giveaway/helper/embed/field/name')}`,
              value: t('command:giveaway/helper/embed/fieldTwo/value')
            }
          ])
          .setColor('Red');
    } else
      embed
        .addFields([
          {
            name: `🌟 ${t('command:giveaway/helper/embed/field/name')}`,
            value: t('command:giveaway/helper/embed/fieldThree/value')
          }
        ])
        .setColor('Red');

    message.edit({ embeds: [embed], components: [row] });
  });
}

export async function deleteOldGiveaways(client: DenkyClient) {
  const giveawaysArray = await client.databases.giveaway.findMany({
    where: {
      ended: true
    },
    take: 100
  });

  giveawaysArray.forEach(async giveaway => {
    const { endTimestamp, messageId } = giveaway;
    // If the giveaway is ended and if the giveaway is 2 months old, delete it
    if (Date.now() > dayjs(Number(endTimestamp)).add(2, 'month').valueOf()) {
      await client.databases.deleteGiveaway(messageId);
    }
  });
}
