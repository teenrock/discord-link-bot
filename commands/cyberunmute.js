
function cyberunmute(message, prefix, bot) {

if (message.content.startsWith(prefix + "cyberunmute")) {
if (message.mentions.users.size === 0) {
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur ou celui-ci n'est pas présent sur ce serveur.**").then(message=>message.delete(6000));
}
let unmuteMember = message.guild.member(message.mentions.users.first());
if (!unmuteMember) {
  return message.channel.send("**:x: Je ne suis pas sur que cet utilisateur existe...**").then(message=>message.delete(6000));
}
message.channel.overwritePermissions(unmuteMember, { SEND_MESSAGES: true })
.then(member => {
	message.delete().then(del=> {
  message.channel.send(`**${unmuteMember.user.username}** est désormais unmute dans **#${message.channel.name}** :loud_sound:`)
})
})
}

}
    module.exports = cyberunmute
