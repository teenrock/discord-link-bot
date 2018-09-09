//////////////////////////////////////////////////////////////////////////////////////////
// DLB_SM (Safe Mode)
/////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("./node_modules/discord.js");
const bot = new Discord.Client({autoReconnect: true, max_message_cache: 0, disableEveryone: true});
const config = require("./config_SM.json");
var EventEmitter = require('./node_modules/events').EventEmitter.defaultMaxListeners = 0;
const express = require("./node_modules/express");
const fs = require('./node_modules/fs-extra');
const decache = require('decache');
const prefix = config.prefix;
const confname = config.name;
const client = bot;
var app = express();
isReady = true;
safeMode = false;

/////////////////////////////////////////////////////////////////////////////////////////
// ON READY
bot.on("ready", (message, channel) => {
  const onReady = require("./onReady.js")
  onReady(message, channel, bot, fs, decache, confname)
});

//////////////////////////////////////////////////////////////////////////////////////////
// USERS PRESENCE STATUS UPDATE & D3LB(BOT) DISCONNECTED ALERT 
bot.on('presenceUpdate', (oldMember, newMember, channel) => {

  if (newMember.presence.status == oldMember.presence.status) return;
  var presUpdateMsg = ` **${oldMember.user.username}** est passé(e) de **${oldMember.presence.status}** à **${newMember.presence.status}**`;
  var serverName = ` >>> ${newMember.guild.name||oldMember.guild.name} <<< `;
  var serverCount = bot.guilds.size;
  var warning = `\n**:warning: Alerte :warning:**\n\n`;
  var nwDate = new Date();
  var serverName = ` >>> ${newMember.guild.name||oldMember.guild.name} <<< `;
  var presenceMSG1 = `**\`${serverName}\`** | ` + presUpdateMsg + ' ** / invisible** |' + ` **\`${new Date()}\`**`;
  var presenceMSG2 = `**\`${serverName}\`** | ` + presUpdateMsg + ` | **\`${new Date()}\`**`;
  var DLB_SM_ON_MSG = `Suite à une erreur inattendue, le **SafeMode** de a prit le relais.\nSi vous voyez ce message et que le status de ${DLB} n'est pas **online**, merci si vous en avez la possiblité de m'en informer par message privé.\n>>> ${xzdcdev} <<<`;
  var DLB_SM_OFF_MSG = `${DLB} a été relancé, **${DLB_SM}** est à présent **inactif**`;

  if ((newMember.user == DLB || oldMember.user == DLB) && (newMember.presence.status == 'invisible' || oldMember.presence.status == 'online')) {
  
    var nowDate = new Date();
    nowDate.setSeconds(nowDate.getSeconds() - 30);

    if ((newMember.guild.name == 'xzdc')||(oldMember.guild.name == 'xzdc')) {
      if (xzdc != undefined) {
        xzdc.send('\n' + warning + `**${nowDate}**\n\n` + presUpdateMsg)
      }
      if (xzdcdev != undefined) {
        xzdcdev.send('\n' + warning + `**${nowDate}**\n\n` + presUpdateMsg)
      }
    }

    bot.user.setStatus("online");
    bot.user.setActivity(`${serverCount} serveurs`, {type: "WATCHING"});
    safeMode = true;
    console.log('Safe Mode is ON');

    linkedChannels.forEach(channel => {
      if (channel != undefined) {
        if ((newMember.guild.name == 'xzdc')||(oldMember.guild.name == 'xzdc')) {
          channel.createWebhook(`DLB (SafeMode)`, `${avatarSM}`).then(webhook => {
            webhook.send(`${DLB_SM_ON_MSG}`), webhook.delete()
          })
        }
      }
    })

  } 

  if ((newMember.user == DLB || oldMember.user == DLB) && (newMember.presence.status == 'online' || oldMember.presence.status == 'invisible')) {

    if ((newMember.guild.name == 'xzdc')||(oldMember.guild.name == 'xzdc')) {
      if (xzdc != undefined) {
        xzdc.send(`\n**${new Date()}**\n\n` + presUpdateMsg)
      }
      if (xzdcdev != undefined) {
        xzdcdev.send(`\n**${new Date()}**\n\n` + presUpdateMsg)
      }
    }

    bot.user.setStatus("dnd");
    bot.user.setActivity('DLB', {type: "WATCHING"});
    safeMode = false;
    console.log('Safe Mode is OFF');

    linkedChannels.forEach(channel => {
      if (channel != undefined) {
        if ((newMember.guild.name == 'xzdc')||(oldMember.guild.name == 'xzdc')) {
          channel.createWebhook(`DLB (SafeMode)`, `${avatarSM}`).then(webhook => {
            webhook.send(`${DLB_SM_OFF_MSG}`), webhook.delete()
          })
        }
      }
    })

  } 

});

//////////////////////////////////////////////////////////////////////////////////////////
// VOCAL CHANNELS LOG + CHANNEL REPORT
bot.on('voiceStateUpdate', (oldMember, newMember) => {
  
  if (newMember == undefined) return;
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel
  var serverName = `>>> ${newMember.guild.name||oldMember.guild.name} <<<`;
  if (safeMode == true) {
  if (oldUserChannel === undefined || oldUserChannel === null) {
    var newUserVocMsg = `**${newMember.user.username}** s'est connecté au salon vocal **${newUserChannel.name}**`;

    // UserJoin VoiceChannel
    if (newUserChannel !== undefined) {
      var vocChanMSG1 = `**\`${serverName}\`** | ` + newUserVocMsg + ` | **\`${new Date()}\`**`;
      vocChanLog.send(vocChanMSG1);
      vocChanWanaLog.send(vocChanMSG1);
    // UserLeave VoiceChannel
    } else if (newUserChannel === undefined) {
      var vocChanMSG2 = `**\`${serverName}\`** | ` + newUserOldVocMsg + ` | **\`${new Date()}\`**`
      vocChanLog.send(vocChanMSG2);
      vocChanWanaLog.send(vocChanMSG2);
    }

  
  } else if ((newUserChannel === undefined) || (newUserChannel === null)) {
    var oldUserVocMsg = `**${oldMember.user.username}** a quitté le salon vocal **${oldUserChannel.name}**`;
    var vocChanMSG3 = `**\`${serverName}\`** | ` + oldUserVocMsg + ` | **\`${new Date()}\`**`;
    vocChanLog.send(vocChanMSG3);
    vocChanWanaLog.send(vocChanMSG3);
  }
}
});

bot.on('message', message => {

  var msgchan = message.channel;
  var xzdcUsers = (message.author == xzdc)||(message.author == xzdcdev)||(message.author == teen);
  var arg = message.content.split(" ");

	if (linkedChans) {
    var command = message.content;
    var DLB_SMstatus = command;

    if (message.author.bot) return;
    if (message.author != xzdc) return;

    if (command == "online"||command == "idle"||command == "dnd"||command == "invisible") {

      if (command == "online") {
        safeMode = true;
        console.log('Safe Mode is ON');
      }

      if (command == "dnd") {
        safeMode = false;
        bot.user.setActivity(`DLB`, {type: "WATCHING"});
        console.log('Safe Mode is OFF');
      }

      linkedChannels.forEach(channel => {
          channel.send(`**${message.author.username}** a changé le status de ${DLB_SM} en **${DLB_SMstatus}**`)
      })

      bot.user.setStatus(`${DLB_SMstatus}`);
      console.log('SetStatus command detected: ' + DLB_SMstatus);

    }

	  if (xzdcUsers) {

    	if (command === '!new webhook') {
      	  var chanHook = bot.channels.get(`${msgchan.id}`);
      	  let default_avatar = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
          message.delete(3000);
          message.reply(' un nouveau webhook a été créé à votre demande.');
          chanHook.createWebhook(`DLB (SafeMode)`, `${default_avatar}`).then(webhook=> console.log(` ${message.guild.name}: Un nouveau WebHook a été créé sur ${msgchan.name}\n`));
        }

        if (command === '!tu sors') {
          bot.disconnect()
        }
	  }

	}
});

/////////////////////////////////////////////////////////////////////////////////////////
// LINK CODE
bot.on('message', (message) => {

if (safeMode == true) {

// Const/Var
const botDMs = `**${message.author.username}** sur <@${bot.user.id}> : ${message}`;
const userMSG = `**${message.author.username}** : ${message}`;
const botDMlog = ` MSG sur ${bot.user.username}\n <${message.author.username}> ${message}\n`;
const msg = message.content;
const msgchan = message.channel;
var args = message.content.split(',').join(' ').split('  ').join(', ');
let channel = bot.channels.get(`${message.channel.id}`);
var linkedChans = (channel==serverA)||(channel==serverB)||(channel==serverC)||(channel==serverA1)||(channel==serverB1)||(channel==serverC1)||(channel==serverA2)||(channel==serverB2)||(channel==serverC2);
var msgChanLink = msgchan==serverA||msgchan==serverB||msgchan==serverC||msgchan==serverA1||msgchan==serverB1||msgchan==serverC1||msgchan==serverA2||msgchan==serverB2||msgchan==serverC2;
arg = message.content.split(" ");
 
// Message to Bot (MP) - GLOBAL CONDITION 1
if (msgchan.name === undefined)  {

  // developpers bot DMs specifics commands
  devUsersList.some(user => {
    if (message.author == user) {
      const devCmds = require("./commands/devCmds.js")
      const modoCmds = require("./commands/modoCmds.js");

      devCmds(message, prefix, bot, linkedChannels, linkedChans, fs, decache)
      modoCmds(message, prefix, bot, linkedChannels, linkedChans, fs, decache)
    }
  })

  // moderators bot DMs specifics commands
  modoUsersList.some(user => {
    if (message.author == user) {
      const modoCmds = require("./commands/modoCmds.js");
      modoCmds(message, prefix, bot, linkedChannels, linkedChans, fs, decache)
    }
  })

  // BOT DMs USERS MSGS REPPORT ON XZDC & WANALIKE SERVERS
  if (!message.author.bot) {
    // allServersMsgsChan.send(botDMlog)
    // allServersMsgsChanWana.send(botDMlog)
    console.log(botDMlog)
  }

  // ALL DLB SERVERS CHANNELS MSGS REPPORT ON XZDC & WANALIKE SERVERS + PRIV MSG REPPORT TO ADMIN USERS IF THEY ARE MENTIONNED - GLOBAL CONDITION 2
} else if (msgchan.name !== undefined) {
  var member = message.mentions.members.first();
  let replacedMention = [`${member}`];
  var MentionMSG = ` **#############################################################################################**
 ${new Date()}\n\n **${message.author.username}** vous a mentionné sur <#${msgchan.id}>\n
 ${message}\n\n **#############################################################################################**\n`;
  var newArgs = args;

  // Ignored CHannels
  if (msgchan==usersStatChan||msgchan==usersStatChanWana||msgchan==vocChanLog||msgchan==vocChanWanaLog||msgchan==allServersMsgsChan||msgchan==allServersMsgsChanWana) return; // Log Channels on xzdc & wanalike servers
  if (msgchan.id == '442670659953229854') return; // #pokecord sur Animations Squad
  if (msgchan.id == '439943856839065600') return; // #pokemon-catch sur 4eme Dimension

  if (!message.author.bot) {
    if (message.attachments) {
      message.attachments.forEach(a => {
        if (args) {
          newArgs = ` ${message}\n ${a.url}`;
        } else if (!args) {
          newArgs = ` ${a.url}`;
        }
      })
    }

    if (message.content.includes(member)) {
      let newArgs = args.replace(`${member}`, `**${message.author.username}**`);
      MSGChan = `**\`${new Date()}\`** sur **<#${msgchan.id}>\n ${message.author.username}**: ${newArgs}\n**\`UserID\`** : ${message.author.id}\n**\`ChannelID\`**: ${msgchan.id}`;
      MSGChanLog = ` ${new Date()} sur #${msgchan.name}\n ${message.author.username} : ${newArgs}\n UserID : ${message.author.id}\n ChannelID : ${msgchan.id}\n`;
      allServersMsgsChan.send(MSGChan)
      allServersMsgsChanWana.send(MSGChan)
    } else {
      let newArgs = args;
      MSGChan = `**\`${new Date()}\`** sur **<#${msgchan.id}>\n ${message.author.username}**: ${newArgs}\n**\`UserID\`** : ${message.author.id}\n**\`ChannelID\`**: ${msgchan.id}`;
      MSGChanLog = ` ${new Date()} sur #${msgchan.name}\n ${message.author.username} : ${newArgs}\n UserID : ${message.author.id}\n ChannelID : ${msgchan.id}\n`;
      allServersMsgsChan.send(MSGChan)
      allServersMsgsChanWana.send(MSGChan)
    }

  }
  // xzdc is mentionned
  if ((member) && ((member.id == xzdc_id)||(member.id == xzdcdev_id))) {
    if (message.author.bot) return;
    xzdc.send(MentionMSG);
    console.log(MentionMSG);
  }

  // xzdc specifics commands 
  xzdcUsersList.some(user => {
    if (message.author === user) {
      const xzdcCmds = require("./commands/xzdcCmds.js");
      xzdcCmds(message, prefix, bot, linkedChannels, linkedChans, fs, decache)
    }
  })

  function test(user) {
    if ((message.author == user)||(message.author == DLB)) {
      const modoCmds = require("./commands/modoCmds.js")
      const cybermute = require("./commands/cybermute.js");
      const cyberunmute = require("./commands/cyberunmute.js");
    
      modoCmds(message, prefix, bot, linkedChannels, linkedChans, fs, decache)
      cybermute(message, prefix, bot)
      cyberunmute(message, prefix, bot)
    }
}

  // developpers specifics commands
  devUsersList.some(user => {
    test(user)
  })

  // moderators specifics commands
  modoUsersList.some(user => {
    test(user)
  })

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// LINK ///////////////////

// MSG provide from a linked channel
if (msgChanLink) {

  const usersCmds = require("./commands/usersCmds.js");
  usersCmds(message, prefix, bot, fs, decache)

  var NotAllowedFirst = ["chienne", "Message(s) éffacé(s)", ":wastebasket: |"];
  var NotAllowedWords = ["bite", "suceuse", "de chienne", "2 chienne", "chiène", "chiene", "pétasse", "petasse", "pute", "putes", "salopes", "salopes", "batard", "fdp", "fils de pute", "enculé", "sale chien", "porn", "porno"]
  var NotAllowedMentions = ["@here", "@everyone"];
  var DiscordInvUrls = ["http://discord.gg", "https://discord.gg", "http://discord.me", "https://discord.me", "https://discordapp.com/invite", "http://discordapp.com/invite", "http://www.discordservers", "https://www.discordservers"];
  var ytURLs = ["http://youtube", "https://youtube", "http://youtu.be/", "https://youtu.be/", "http://www.youtube", "https://www.youtube", "http://www.youtu.be/", "https://www.youtu.be/"]
  const restrict_ans = " vous avez saisi des mots clés interdits sur ce salon.\nPar conséquent votre message a ou va être supprimé et n'a pas pas transmis vers les autres serveurs.";
  const restrict_ans2 = `:warning: Merci de bien vouloir éviter de tenir ou diffuser ce genre de propo(s) / contenu(s)`;

  // Discord Invites Restrictions
  if (DiscordInvUrls.some(word => msg.includes(word))) {
    if (message.author === bot.user) {
      message.delete(10000).catch(err => console.log(err));
    } else {
      message.reply(restrict_ans).then(msg=> message.delete(7000).catch(err => console.log(err))).then(msg=> message.author.send(restrict_ans2));
    }
  }

  // Exception for bot messages
  if ((message.author.bot) || (message.author == bot.user)) return;
  if (msg.startsWith(prefix) && message.author !== bot.user) return; // Do Not SendMessage to ohters channels if cmd messages
  if (message.content == null) return console.log(`Null Message Detected: ${message}`);

    // Keywords Restrictions
    if (NotAllowedWords.some(word => msg.includes(word)) || NotAllowedFirst.some(word => msg.startsWith(word)) || NotAllowedMentions.some(word => msg.includes(word))) {
      if ((message.author == bot.user) || (message.author == xzdcdev) || (message.author == xzdc) || (message.author == ash) || (message.author == ashPC)) {
      console.log(' Specifics Restricted Mentions Detected by : ' + message.author.username)
    } else {
      message.delete(10000).catch(err => console.log(err));
      message.reply(restrict_ans).then(msg=> msg.delete(7000).catch(err => console.log(err))).then(msg=> message.author.send(restrict_ans2));
      console.log(` !!! Not Allowed Word !!! (Message non transmit)\n\n ${new Date()}\n >>> ${message.guild.name} <<< sur #${message.channel.name}\n <${message.author.username}> ${message}\n UserID: <${message.author.id}> MsgID: <${message.id}>\n`)
      return
    }
  }

  // Youtube Link Detection
  if (ytURLs.some(url => (msg.startsWith('http') && msg.includes(url)))) {
    console.log(' ' + msg + '\n')
    ytLinkList.push(msg.split(" ").slice([0]))
    console.log(ytLinkList)
  }

  if (banIDs.some(banned => ((message.author.id) == (banned)))) {
    message.delete(200)
    console.log(` !!! Un utilisateur bannit a voulu envoyer un message !!! (Message non transmit)\n\n ${new Date()}\n >>> ${message.guild.name} <<< sur #${message.channel.name}\n <${message.author.username}> ${message}\n UserID: <${message.author.id}> MsgID: <${message.id}>\n`)
    return message.author.send(`:no_entry_sign: ${message.author}, vous etes bannit sur ce salon, votre message a été supprimé et n'a pas été transmit.`).then(msg=> msg.delete(5000))
  }

const linkFuncRep = "./linkedChansFunc/sendHookServ";
const extension = ".js";

// Discord Server A Channel Link
  if ((!serverA)||(serverA == undefined)) {
  	var servLetter = 'A';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverA) {
    var servLetter = 'A';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServA = require(fileServ);
      sendHookServA(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }	

// Discord Server B Channel Link
  if ((!serverB)||(serverB == undefined)) {
  	var servLetter = 'B';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverB) {
    var servLetter = 'B';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServB = require(fileServ);
      sendHookServB(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }	


// Discord Server C Channel Link
  if ((!serverC)||(serverC == undefined)) {
  	var servLetter = 'C';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverC) {
    var servLetter = 'C';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServC = require(fileServ);
      sendHookServC(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }
  
// Discord Server A1 Channel Link
  if ((!serverA1)||(serverA1 == undefined)) {
  	var servLetter = 'A1';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverA1) {
    var servLetter = 'A1';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServA1 = require(fileServ);
      sendHookServA1(message, bot)
    } else {
    	console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
    }
  }

// Discord Server B1 Channel Link
  if ((!serverB1)||(serverB1 == undefined)) {
  	var servLetter = 'B1';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverB1) {
    var servLetter = 'B1';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServB1 = require(fileServ);
      sendHookServB1(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server C1 Channel Link
  if ((!serverC1)||(serverC1 == undefined)) {
  	var servLetter = 'C1';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverC1) {
    var servLetter = 'C1';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServC1 = require(fileServ);
      sendHookServC1(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server A2 Channel Link
  if ((!serverA2)||(serverA2 == undefined)) {
  	var servLetter = 'A2';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverA2) {
    var servLetter = 'A2';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServA2 = require(fileServ);
      sendHookServA2(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server B2 Channel Link
  if ((!serverB2)||(serverB2 == undefined)) {
  	var servLetter = 'B2';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverB2) {
    var servLetter = 'B2';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServB2 = require(fileServ);
      sendHookServB2(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server C2 Channel Link
  if ((!serverC2)||(serverC2 == undefined)) {
  	var servLetter = 'C2';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverC2) {
    var servLetter = 'C2';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServC2 = require(fileServ);
      sendHookServC2(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

}
}

  }

});
/////////////////////////////////////////////////////////////////////////////////////////

app.listen(18579);
bot.login(config.token);
