
function adminCmds(message, prefix, bot, linkedChans, fs) {

  var command = message.content;
  var DLBstatus = command;

  banListMSG = `Les identifiants suivants sont bannis du link:\n\n` + banIDs;
  banIdMSG = `L'identifiant de **${arg[2]}** a été ajouté à la liste des utilisateurs bannis du link.`;

  function clearLink() {
    bot.channels.forEach(channel => {
        if (linkedChans) {

          channel.send(`${message.author.username} a envoyé une commande temporisée: ${command}.\nElle sera executée dans **10 secondes** ...`)

          setTimeout(function() {
              channel.send('!clear');
              console.log('Le contenu de chaque salon en link est en cours de suppression...');

              let clrCycle = setInterval(function() {
                channel.send('!clear');
                console.log('Le contenu de chaque salon en link est en cours de suppression...');
              },5 * 1000 );

              let clearTimer = setTimeout(function() {
                clearInterval(clrCycle)
                channel.send('La purge est à présent terminée !');
                console.log('La purge des salons en link est terminée.')
              }, 62 * 1000);

            }, 10 * 1000);
        }
      })
  };  

// CODE TEST
  if (command === '!test') {
    //if (channel.id == undefined) return;
    bot.channels.forEach(channel => {

      if (linkedChans) {
        channel.send(`${message.author.username} a envoyé une commande temporisée: ${command}.\nElle sera executée dans **10 secondes** ...`).then(msg=> {
          let delay = setInterval(function() {
            channel.send('Delayed commande');
            clearInterval(delay);
          },10 * 1000);
        });
      };
    });
      console.log('Temp 10 secondes');
  }
// END OF CODE TEST

  if (command.startsWith('!add ban')) {
    let banMember = message.mentions.members.first();
    if (arg[2] != banMember) return message.reply(' syntaxe incorrecte !')
      banIDs.push(`${banMember.id}`)
      message.channel.send(banIdMSG)
      console.log(banIdMSG)
    }

    if (command.startsWith('!banlist')) {
      message.channel.send(banListMSG)
      console.log(banListMSG)
    }

    if (message.content.startsWith('!cybermute')) {
      bot.channels.forEach(channel => {
        if (linkedChans) {
          let muteMember = message.mentions.members.first();
          channel.send(`!cybermute `+ muteMember)
        }
      })
    }

    if (command.startsWith('!cyberunmute')) {
      bot.channels.forEach(channel => {
        if (linkedChans) {
          let unmuteMember = message.mentions.members.first();
          channel.send(`!cyberunmute `+ unmuteMember)
        }
      })
    }

    if (command == '!clear') {
            if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            message.channel.send("Message(s) éffacé(s) avec succès. " + "Total: " + messagesDeleted);
            console.log('Suppression des messages effectuée. Total: '+messagesDeleted)
          })
          .catch(err => {
            console.log('Erreur pendant la procédure de suppression');
            console.log(err);
          });
      }
    }

    if (command == '!clean all') { // clear messages
      if (message == undefined) return;
      let count = 0;
      message.channel.fetchMessages({limit: 100})
      .then(messages => {
          let messagesArr = messages.array();
          let messageCount = messagesArr.length;
          for(let i = 0; i < messageCount; i++) {
          messagesArr[i].delete()
          .then(function() {
            count = count + 1;
            if(count >= 100) {
              deleteStuff();
            }
          })
          .catch(function() {
            count = count + 1;
            if(count >= 100) {
              deleteStuff();
            }
          })
       } 
     })
     .catch(function(err) {
       console.log('error thrown');
       console.log(err);
     });

    }

    if (command === '!clear all') {
      clearLink()
      console.log('Temp 10 secondes');

    }

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

module.exports = adminCmds