
function usersCmds(message, prefix, bot, fs, decache) {

  let command = message.content;

  if (command === '!ici') {
    var ici_msg = `**${message.author.username}** se trouve sur le serveur **${message.guild.name}**`;
    var ici_msg_inf = `Tous les serveurs du link ont été informés du nom du serveur sur lequel vous vous trouvez :\n[ **${message.guild.name}** ]`;
    linkedChannels.forEach(channel=> {
      if ((channel != undefined) && (channel != message.channel)) channel.send(ici_msg)
      else if (channel == message.channel) channel.send(ici_msg_inf)
    })
    message.delete(500).catch(err => console.log(err))
  }

  if (command === '!myid') {
    var myid_msg = `**${message.author.username}** a pour identifiant **${message.author.id}**`;
    var myid_msg_inf = `Tous les serveurs du link ont été informés de votre identifiant : **${message.author.id}**`;
    linkedChannels.forEach(channel=> {
      if ((channel != undefined) && (channel != message.channel)) channel.send(myid_msg)
      else if (channel == message.channel) channel.send(myid_msg_inf)
    })
    message.delete(500).catch(err => console.log(err))
  }

  if (command === '!invitation') {
    message.guild.channels.get(message.channel.id).createInvite().catch(err => console.log(err))
    .then(invite => {
      linkedChannels.forEach(channel=> {
        if (channel != undefined) {
          channel.send(invite.url)
          .then(msg=> delete(10000)).catch(err => console.log(err))
        }
      })
      console.log(' ' + invite.url)
    })
    message.delete(500).catch(err => console.log(err))
  }

  if (command.startsWith('!avatar' + ' ')) {
    let args = command.split(" ");
    var userid = bot.users.get(args[1]);
    var member = message.mentions.members.first();
    if ((!member) && (userid === undefined)) {
      message.channel.send(`:warning: **Vous n'avez pas spécifié un UserID valide**\n**La commande est:**\n**\`!avatar ID_UTILISATEUR\`**\n**Si vous ne savez pas comment obtenir le UserID, Google vous aidera**`);
    } else {
      if (member) userid = member.user;
      if (!member && (userid != undefined)) userid = bot.users.get(args[1]);

      if ((member) || (userid.avatarURL != null)) {
        var avatarAns = `**${message.author.username}** a demandé l'avatar de **${userid.username}** : ${userid.avatarURL}`;

        if ((member) && (args[1] == member)) {
          linkedChannels.forEach(channel=> {
            if (channel != undefined) {
              channel.send(avatarAns).then(send => delete(500))
            }
          })

        } else if ((!member) && (userid.avatarURL != null)) {
          linkedChannels.forEach(channel=> {
            if (channel != undefined) {
              channel.send(avatarAns).then(send => delete(500))
            }
          })
        }

      } else {
        message.channel.send(`:warning: Cet utilisateur n'a pas d'avatar définit`);
      }
    }
  }

  // All Servers Members List File (Send in DMs)
  if (command == '!list members') {
    var file = `./temp_files/${message.author.id}_UL.txt`;

    bot.guilds.forEach(guild => {
      guild.members.forEach(member => {
        username = member.user.username;
        userID = member.id;
        userInfo = `${username} : ${userID}\r\n`;
        fullMembersList.push(userInfo)
      })
    })

    function removeDuplicates(arr){
      let unique_array = []
      for(let i = 0; i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
          unique_array.push(arr[i])
        }
      }
      return unique_array
    }
    var membersList = removeDuplicates(fullMembersList);
    var membersListStr = membersList.toString()

    console.log(membersListStr.split(",").join(""))

    fs.createFile(file).then(writeFileSync => {
      membersList.forEach(user => {
        fs.appendFile(file, "\n" + user)
      })

      message.author.send(` ﾠ`, {files:[file]})
      console.log(file)

      setTimeout(function() {
        fullMembersList = []
        membersList = []
        fs.unlink(file)
      }, 1*1000)
    })
  }

  if (command == "list ytLinks") {
    ytLinks.forEach(link => {
      message.channel.send(link)
    })
    console.log(ytLinks)
  }

}

module.exports = usersCmds