
function devCmds(message, prefix, bot, linkedChannels, linkedChans, fs, decache) {

  var command = message.content;

    if (command == "online"||command == "idle"||command == "dnd"||command == "invisible") {
        bot.channels.forEach(channel => {
          if (linkedChans) {
            channel.send(`**${message.author.username}** a changé le status de ${DLB} en **${DLBstatus}**`)
          }
        })
        bot.user.setStatus(`${commande}`);
      }

    if (command.startsWith('!rm serv')) {
      let arg = msg.split(" ")
      let channel = bot.channels.get(`${message.channel.id}`)
      var server = bot.guilds.find('id', `${arg[2]}`)
      if (server == undefined) return console.log(`Serveur Introuvable. Vérifiez que vous avez correctement tapé la commande ainsi que l\'ID du serveur`);
      server.leave().then(leave => {
        message.reply(`${bot.user.username} a quitté le serveur: ` + '**'+server.name+'**')
        console.log(` ${bot.user.username} a quitté le serveur: ` + server.name + '\n')
      })
    }

}

module.exports = devCmds