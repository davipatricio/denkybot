import { PermissionFlagsBits } from 'discord.js';
import { Command, CommandRunOptions } from '../../../structures/Command';
import type { DenkyClient } from '../../../types/Client';

export default class PingCommand extends Command {
  constructor(client: DenkyClient) {
    super(client);
    this.rawName = 'BAN';
    this.rawCategory = 'MODERATION';
    this.config = {
      autoDefer: true,
      ephemeral: true,
      showInHelp: true,
      guildOnly: true
    };
    this.permissions = { bot: [PermissionFlagsBits.BanMembers] };
  }

  override run({ interaction }: CommandRunOptions) {
    if (!interaction.inCachedGuild() || !interaction.guild.members.me) return;

    const deleteMessageDays = Number(interaction.options.getString('delete_messages') ?? 0);
    const reason = interaction.options.getString('reason') ?? 'Sem motivo.';

    const membro = interaction.options.getMember('usuario');
    const user = membro?.user ?? interaction.options.getUser('usuario', true);

    if (user.id === this.client.user?.id) {
      interaction.reply(`❌ ${interaction.user} **|** Eu não posso me banir.`);
      return;
    }
    if (user.id === interaction.user.id) {
      interaction.reply(`❌ ${interaction.user} **|** Você não pode se banir.`);
      return;
    }

    if (membro?.roles) {
      if (!membro.bannable || membro.roles.highest?.position >= interaction.guild.members.me.roles.highest.position) {
        interaction.reply(`❌ ${interaction.user} **|** Não posso punir este usuário, pois meu maior cargo está abaixo ou na mesma posição do maior cargo do membro.`);
        return;
      }
      if (interaction.member.roles.highest?.position <= membro.roles.highest?.position) {
        interaction.reply(`❌ ${interaction.user} **|** Você não pode punir este usuário, pois seu maior cargo está abaixo ou na mesma posição do maior cargo do membro.`);
        return;
      }
    }

    interaction.guild.bans
      .create(user.id, { deleteMessageDays, reason: `Punido por: ${interaction.user.tag} - ${reason}` })
      .then(() => {
        interaction.editReply(`✅ ${interaction.user} **|** Usuário ${user.tag ?? user.id ?? user} foi banido do servidor.`);
      })
      .catch(err => {
        const error = err.toString().toLowerCase();
        if (error.includes('missing permission')) {
          return interaction.editReply(`❌ ${interaction.user} **|** Não posso punir este usuário, pois meu maior cargo está abaixo ou na mesma posição do maior cargo do membro.`);
        }
        if (error.includes('unknown')) {
          return interaction.editReply(`❌ ${interaction.user} **|** Membro desconhecido.`);
        }
        if (error.includes('max')) {
          return interaction.editReply(`❌ ${interaction.user} **|** Este servidor já baniu muitos membros que nunca entraram no servidor.`);
        }

        return interaction.editReply(`❌ ${interaction.user} **|** Ocorreu um erro ao banir o usuário.`);
      });
  }
}
