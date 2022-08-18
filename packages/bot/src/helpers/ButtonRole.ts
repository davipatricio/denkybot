import type { DenkyClient } from '#types/Client';
import type { ButtonInteraction, Interaction } from 'discord.js';
import { ButtonRoleType } from '../commands/Moderation/buttonrole';
import type { CommandLocale } from '../structures/Command';
import { recommendLocale } from './Locale';

async function handleSingleButtonRole(client: DenkyClient, interaction: ButtonInteraction) {
  if (!interaction.inCachedGuild()) return;

  const buttonRoleData = await client.databases.buttonRole.findFirst({ where: { messageId: interaction.message.id } });
  if (!buttonRoleData) return;

  const guildLocale = recommendLocale(interaction.guild!.preferredLocale);

  const t: CommandLocale = (path: Parameters<CommandLocale>[0], ...args: any) => {
    return client.languages.manager.get(guildLocale, path, ...args);
  };

  switch (buttonRoleData.type) {
    case ButtonRoleType.Add: {
      let content = '';
      buttonRoleData.roles.forEach(roleId => {
        if (interaction.member.roles.cache.has(roleId)) content += `❌ <@&${roleId}>\n`;
        else content += `➕ <@&${roleId}>\n`;
      });

      await interaction.member.roles.add(buttonRoleData.roles, 'Button Role');
      interaction.followUp({
        content: content.includes('❌') ? `${content}\n\n⚠️ **|** _${t('command:buttonroles/warn/had-roles')}_` : content,
        ephemeral: true
      });
      break;
    }

    case ButtonRoleType.Remove: {
      let content = '';
      buttonRoleData.roles.forEach(roleId => {
        if (interaction.member.roles.cache.has(roleId)) content += `➖ <@&${roleId}>\n`;
        else content += `❌ <@&${roleId}>\n`;
      });

      await interaction.member.roles.remove(buttonRoleData.roles, 'Button Role');
      interaction.followUp({
        content: content.includes('❌') ? `${content}\n\n⚠️ **|** _${t('command:buttonroles/warn/missing-roles')}_` : content,
        ephemeral: true
      });
      break;
    }

    case ButtonRoleType.Toggle: {
      let content = '';
      buttonRoleData.roles.forEach(roleId => {
        if (interaction.member.roles.cache.has(roleId)) {
          content += `➖ <@&${roleId}>\n`;
          interaction.member.roles.remove(roleId, 'Button Role');
        } else {
          content += `➕ <@&${roleId}>\n`;
          interaction.member.roles.add(roleId, 'Button Role');
        }
      });

      interaction.followUp({ content, ephemeral: true });
      break;
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
