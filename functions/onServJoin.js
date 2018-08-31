  function onServJoin(bot, guild, message, channel, fs, decache, lettersChoice) {

  var serverCount = bot.guilds.size;
  var maxServCount = 9

  var createLink = function letterNumber(serverCount, fs, decache, lettersChoice) {
    if (serverCount == 0) newLetter = 'null'
    if (serverCount == 1) newLetter = 'A'
    if (serverCount == 2) newLetter = 'B'
    if (serverCount == 3) newLetter = 'C'
    if (serverCount == 4) newLetter = 'A1'
    if (serverCount == 5) newLetter = 'B1'
    if (serverCount == 6) newLetter = 'C1'
    if (serverCount == 7) newLetter = 'A2'
    if (serverCount == 8) newLetter = 'B2'
    if (serverCount == 9) newLetter = 'C2'

    servLetter = newLetter

    if ((newLetter == 'null')||(serverCount >= (maxServCount + 1))) return console.log(` New serverCount is : ${serverCount}\n ServerCount is [NULL] or [Limit Exceeded]\n AutoLink Function Has Not Been Executed.`)

    const letterChoiceMsg = "la syntaxe de la commande est incorrecte.\nVous n'avez associé aucune lettre au serveur ou il ne s'agit pas d'un caractère standard.";
    const cyberNameTemp = 'cyberespace-is-being-created';
    var bot_ID = bot.users.get(`${bot.user.id}`);
    var bot_avatar = bot_ID.avatarURL;

    guild.createChannel(cyberNameTemp, "text").then(channel=> {
      cyberChanTemp = bot.channels.find('name', cyberNameTemp);

      setTimeout(function() {
        cyberChan = bot.channels.get(`${cyberChanTemp.id}`)

        cyberChan.createWebhook(`${bot_ID.username}`, `${bot_avatar}`).then(wb=> {
      	  var newWebHookMsg =  `**${bot.user.username}** vient de créer le WebHook pour le link sur le serveur : ${guild.name}`;
          var newServMsg = `Un nouveau serveur vient de rejoindre le link !\n`;
          var newChannelMsg = `Le salon textuel **${cyberChanTemp.name}** vient d'être créé sur le serveur : **${guild.name}**`;
          newHook_ID = wb.id;
          newHook_TOKEN = wb.token;

          cyberChan.send(`Le WebHook pour le link vient d'être créé par **${bot.user.username}**`)
      	  console.log(`\n New WebHook ID : ${newHook_ID}\n New WebHook Token : ${newHook_TOKEN}\n`)

          linkedChannels.forEach(channel => {
            if (channel != undefined) {
              let cyberChanTemp = "cyberespace"

              channel.send(newChannelMsg + '\n' + newWebHookMsg + '\n\n' + '**' + newServMsg + '**')
            } // else console.log(` Channel (link) does not exist. Message has not been sent.`)    
          })
          console.log(' ' + newChannelMsg + '\n' + newWebHookMsg + '\n' + newServMsg + '\n')

          const newLinkFunc = require("./newLinkFunc.js")
          newLinkFunc(servLetter, message, cyberChanTemp, letterChoiceMsg, newHook_ID, newHook_TOKEN, bot, fs)

          cyberChan.setName('cyberespace').then(send => {
            var renameChanMsg = `Le salon textuel **#` + cyberNameTemp + `** vient d'être renommé en : `;
            
            cyberChan.send(renameChanMsg + cyberChan)
            console.log(' ' + renameChanMsg + cyberChan.name + '\n')

            var fileServ = `../linkedChans/server${servLetter}.js`;
            var fileHook = `../hooks/hook${servLetter}.js`
            var loadFileServ = require(fileServ)
            var loadFileHook = require(fileHook)

            loadFileServ(bot)
            loadFileHook
            hooksList.push(loadFileHook)
            
            cyberChan.send(`Le salon ${cyberChan} a rejoint le reste de la communauté !\n\n**Bienvenue @everyone !**`)
          })

      	})
       
      }, 1 * 500);

    })
    bot.user.setActivity(`${serverCount} serveurs`, {type: "WATCHING"});
    console.log(` ${bot.user.username} a rejoint un nouveau serveur: ${guild.name} (ID: ${guild.id}).\n Ce serveur compte ${guild.memberCount} membres.\n`);

  }

  createLink(serverCount, fs, decache, lettersChoice)

}

module.exports = onServJoin