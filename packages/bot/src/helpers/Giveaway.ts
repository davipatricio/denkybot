import type { Interaction } from 'discord.js';
import type { DenkyClient } from '../types/Client';

export async function handleInteraction(client: DenkyClient, interaction: Interaction) {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'participate') {
    interaction.reply({ content: '🎉 **|** Você está participando do sorteio! Boa sorte!' });
    const giveawayData = await client.databases.getGiveaway(interaction.message.id);
    if (!giveawayData) return;
    client.databases.updateGiveaway({
      ...giveawayData,
      participants: [...giveawayData.participants, interaction.user.id]
    });
  }
}

export function checkEndedGiveaways(client: DenkyClient) {
    for 
}
