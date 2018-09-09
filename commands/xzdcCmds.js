
function xzdcCmds(message, prefix, bot, linkedChannels, linkedChans, fs, decache) {

let command = message.content;

  ////////////////////
 // CODE TEST ///////
////////////////////

// All Hooks List
if (command == '!hooks list') {
  console.log(hooksList)
}

// All Channels List
if (command == '!channels list') {
  console.log(bot.channels);
} 

  /////////////////////////
 // END OF CODE TEST /////
/////////////////////////

// generate bot invitation url
if (command === '!bot invite') {
    message.author.send(`https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=2080767185`);
}

// Create Hook Error Test
if (command == '!hook test') {
  function hookTest() {
    message.channel.createWebhook(`Information`, `${default_avatar}`)
    .then(wb => {
      wb.send('Ce serveur n\'est pas saturé de webhooks.\nLe système est donc bien oppérationnel chef ! :wink:')
      wb.delete()
    })
  }
  hookTest()
}

// create new channel
if (command.startsWith('!newchan')) {
  channelName = command.split(' ').slice(1).join(' ').split(' ').join('-');
  message.guild.createChannel(`${channelName}`, "text").then(send => {
    newChannel = bot.channels.find('name', `${channelName}`);
    const newChannelMsg = `Le salon textuel **#${channelName}** vient d'être créé sur le serveur : **${message.guild.name}**`;
    message.channel.send(newChannelMsg).then(log=> {
      console.log(' ' + newChannelMsg + '\n')
    })
  })
}

// delete channel
if (command.startsWith('!delchan')) {
  channelName = command.split(' ').slice(1).join(' ').split(' ').join('-');
  newChannel = bot.channels.find('name', `${channelName}`);
  newChannel.delete().then(send => {
    const newChannelMsg = `Le salon textuel **#${channelName}** vient d'être supprimé du serveur : **${message.guild.name}**`;
    message.channel.send(newChannelMsg).then(log=> {
      console.log(' ' + newChannelMsg + '\n')
    })
  })
}

if (command === "!new webhook") {
  var serverCount = bot.guilds.size;

  if (serverCount == 0) newLetter = 'null'
  if (serverCount == 1) newLetter = 'A'
  if (serverCount == 2) newLetter = 'B'
  if (serverCount == 3) newLetter = 'C'
  if (serverCount == 4) newLetter = 'D'
  if (serverCount == 5) newLetter = 'E'
  if (serverCount == 6) newLetter = 'F'
  if (serverCount == 7) newLetter = 'G'
  if (serverCount == 8) newLetter = 'H'
  if (serverCount == 9) newLetter = 'I'
  if (serverCount == 10) newLetter = 'J'
  if (serverCount == 11) newLetter = 'K'
  if (serverCount == 12) newLetter = 'L'
  if (serverCount == 13) newLetter = 'M'
  if (serverCount == 14) newLetter = 'N'
  if (serverCount == 15) newLetter = 'O'
  if (serverCount == 16) newLetter = 'P'
  if (serverCount == 17) newLetter = 'Q'
  if (serverCount == 18) newLetter = 'R'
  if (serverCount == 19) newLetter = 'S'
  if (serverCount == 20) newLetter = 'T'
  if (serverCount == 21) newLetter = 'U'
  if (serverCount == 22) newLetter = 'V'
  if (serverCount == 23) newLetter = 'W'
  if (serverCount == 24) newLetter = 'X'
  if (serverCount == 25) newLetter = 'Y'
  if (serverCount == 26) newLetter = 'Z'

  message.channel.createWebhook(`Utilisateur`, `${default_avatar}`)
  .then(webhook=> {
    var newHook_ID = webhook.id;
    var newHook_TOKEN = webhook.token;
    var wb_infos = ` New WebHook ID : ${newHook_ID}\n New WebHook Token : ${newHook_TOKEN}\n`;
    var newHookMan = `Hook${newLetter} = new Discord.WebhookClient("${newHook_ID}", "${newHook_TOKEN}");

module.exports = Hook${newLetter}

`;
    webhook.send(`Le nouveau **webhook** a bien été créé sur le salon **#${message.channel.name}**`)
    var newHookFile = `./hooks/hook${newLetter}.js`;
    fs.createFile(newHookFile).then(writeFileSync => {
      fs.writeFileSync(newHookFile, newHookMan)
    })
    message.author.send(wb_infos), console.log(wb_infos)
    
  })
}

if (command.startsWith(prefix + "create link")) {
  var servLetter = message.content.split(" ")[2];
  lettersChoice = ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const letterChoiceMsg = "la syntaxe de la commande est incorrecte.\nVous n'avez associé aucune lettre au serveur ou il ne s'agit pas d'un caractère standard.";
  
  const newLinkFunc = require("../functions/newLinkFunc.js")
  newLinkFunc(servLetter, message, letterChoiceMsg, bot, fs, prefix, command)
  //decache(newLinkFunc)
}

if (command == (prefix + "logout")) {

  const authorName = message.author.username;
  const stopMsg = `**${authorName}** a demandé l'arrêt de ${bot.user}`;
  const stopMsgBot = `${bot.user} s'arrête`;
  const time = 700;

  message.delete().then(del=>{
    bot.channels.forEach(channel => {
      if (linkedChans) {
        channel.send(stopMsg).then(msg=>{

          setTimeout(function() {
            const stopMsgBot2 = `${stopMsg}\n${stopMsgBot}`;
            msg.edit(stopMsgBot2).then(edit=>{
          setTimeout(function() {
            msg.edit(`**${new Date()}**\n\n${bot.user} est passé **OFF** à la demande de **${authorName}**`).then(edit=>{
              console.log('Bot is OFF');
                  bot.destroy();
                  process.exit()
            });
          },1 * 3500);
          })

            setTimeout(function() {
            msg.edit(`${stopMsgBot2} **.**`)
          setTimeout(function() {
            msg.edit(`${stopMsgBot2} **. .**`)
            setTimeout(function() {
            msg.edit(`${stopMsgBot2} **. . .**`)
              }, 1*time);
            }, 1*time);
            }, 1*time);
        
          },1 * 1000);
        })
      }
    })
  })
} // end of logout cmd

// NEW COMMAND HERE

}

module.exports = xzdcCmds