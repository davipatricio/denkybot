import type { DenkyClient } from '#types/Client';
import type { ButtonInteraction, Interaction } from 'discord.js';
import { ButtonRoleType } from '../commands/Moderation/buttonrole';

async function handleSingleButtonRole(client: DenkyClient, interaction: ButtonInteraction) {
  if (!interaction.inCachedGuild()) return;

  const buttonRoleData = await client.databases.buttonRole.findFirst({ where: { messageId: interaction.message.id } });
  if (!buttonRoleData) return;

  switch (buttonRoleData.type) {
    case ButtonRoleType.Add: {
      let finalStr = '';
      buttonRoleData.roles.forEach(roleId => {
        if (interaction.member.roles.cache.has(roleId)) finalStr += `❌ <@&${roleId}>\n`;
        else finalStr += `➕ <@&${roleId}>\n`;
      });

      await interaction.member.roles.add(buttonRoleData.roles, 'Button Role');
      interaction.followUp({
        content: finalStr.includes('❌') ? `${finalStr}\n\n⚠️ **|** _Você já possuia alguns cargos que foram incluidos neste botão_` : finalStr,
        ephemeral: true
      });
    }
  }
}

export async function handleInteraction(client: DenkyClient, interaction: Interaction) {
  if (!interaction.isButton()) return;

  switch (interaction.customId) {
    case 'button_role_single':
      await interaction.deferUpdate();
      handleSingleButtonRole(client, interaction);
      break;
  }
}
