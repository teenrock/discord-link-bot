
function usersCmds(message, prefix, bot) {

  let msg = message.content;

  if (msg === '!ici') {
    var ici_msg = `**${message.author.username}** se trouve sur le serveur **${message.guild.name}**`;
    linkedChannels.forEach(channel=> {
      if (channel != undefined) channel.send(ici_msg)
    })
    message.delete(1000)
  }

  if (msg === '!myid') {
    var myid_msg = `**${message.author.username}** a pour identifiant **${message.author.id}**`;
    linkedChannels.forEach(channel=> {
      if (channel != undefined) channel.send(myid_msg)
    })
    message.delete(1000)
  }

  if (msg === '!invitation') {
    message.delete(1000).catch(err => console.log(err))
    message.guild.channels.get(message.channel.id).createInvite().catch(err => console.log(err))
    .then(invite => {
      linkedChannels.forEach(channel=> {
        if (channel != undefined) channel.send(invite.url).then(msg=>message.delete(10000).catch(err => console.log(err)))
      })
    })
  }

  if (msg.startsWith('!avatar' + ' ')) {
    let args = msg.split(" ");
    var userid = bot.users.get(args[1]);
    if (userid === undefined) {
      message.channel.send(`:warning: **Vous n'avez pas spécifié un UserID valide**\n**La commande est:**\n**\`!avatar ID_UTILISATEUR\`**\n**Si vous ne savez pas comment obtenir le UserID, Google vous aidera**`);
    } else {
      if (userid.avatarURL != null) {
        let avatarAns = `**${message.author.username}** a demandé l'avatar de **${userid.username}** : ${userid.avatarURL}`;
        bot.channels.forEach(channel=> {
          if (linkedChannels) {
            if (channel != undefined) channel.send(avatarAns).then(send=>message.delete(1000))
          }
        })
      } else {
        message.channel.send(`:warning: Cet utilisateur n'a pas d'avatar définit`);
      }
    }
  }

}

module.exports = usersCmds