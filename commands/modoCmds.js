
function modoCmds(message, prefix, bot, linkedChans, fs) {

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
  if (command.startsWith('!say')) {
    //if (channel.id == undefined) return;
    let args = message.content.split(" ")
    var answer = args.slice(1).join(" ")

    linkedChannels.forEach(channel => {
      if (channel.id != message.channel.id) {
        channel.send(`${message.author.username} a envoyé une commande temporisée: ${command}.\nElle sera executée dans **10 secondes** ...`)
        .then(msg=> {
          let delay = setInterval(function() {
            channel.send(answer)
            clearInterval(delay)
          },10 * 1000)
        })
      }
    })
      console.log('Temp 10 secondes')
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

    if (command === '!clear link') {
      clearLink()
      console.log('Temp 10 secondes');

    }

}

module.exports = modoCmds