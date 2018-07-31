
function cybermute(message, prefix, bot){

if (message.content.startsWith(prefix + "cybermute")) {
if (message.mentions.users.size === 0) {
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur ou celui-ci n'est pas présent sur ce serveur.**").then(message=>message.delete(6000));
}
let muteMember = message.guild.member(message.mentions.users.first())
if (!muteMember) {
  return message.channel.send("**:x: Je ne suis pas sur que cet utilisateur existe...**").then(message=>message.delete(6000));
}
 message.channel.overwritePermissions(muteMember, { SEND_MESSAGES: false })
  .then(member => {
  	message.delete().then(del=> {
    message.channel.send(`**${muteMember.user.username}** est désormais mute dans **#${message.channel.name}** :mute:`)
  	})
  })
}

}
    module.exports = cybermute