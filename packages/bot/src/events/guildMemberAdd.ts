import { Event } from '#structures/Event';
import type { DenkyClient } from '#types/Client';
import type { GuildMember } from 'discord.js';

export default class GuildMemberAddEvent extends Event {
  constructor() {
    super();
    this.eventName = 'guildMemberAdd';
  }

  override run(client: DenkyClient, member: GuildMember) {
    this.handleAutoRole(client, member);
  }

  async handleAutoRole(client: DenkyClient, member: GuildMember) {
    const config = await client.databases.getAutoRole(member.guild.id);
    if (!config) return;
    if (config.ignoreBots && member.user.bot) return;

    setTimeout(() => member.roles.add(config.roles, 'Auto Role'), Number(config.delay));
  }
}
