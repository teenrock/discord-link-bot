//////////////////////////////////////////////////////////////////////////////////////////
// DLB
/////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("./node_modules/discord.js");
const bot = new Discord.Client({autoReconnect: true, max_message_cache: 0/*, disableEveryone: true*/});
const config = require("./config.json");
var EventEmitter = require('./node_modules/events').EventEmitter.defaultMaxListeners = 0;
const express = require("./node_modules/express");
const fs = require('fs-extra');
var decache = require('decache');
const prefix = config.prefix;
const confName = config.name;
const client = bot;
var app = express();

/////////////////////////////////////////////////////////////////////////////////////////

bot.on("ready", (message, channel) => {
  const onReady = require("./onReady.js")
  onReady(message, channel, bot, fs, decache, confName)
});

bot.on("guildCreate", (guild, message, channel, fs, decache, lettersChoice) => {
  const onServJoin = require("./functions/onServJoin.js")
  onServJoin(bot, guild, message, channel, fs, decache, lettersChoice)
});

bot.on("guildDelete", guild => {
  let serverCount = bot.guilds.size;
  console.log(` ${bot.user.username} a quitté le serveur: ${guild.name} (ID: ${guild.id})\n New Linked Channels Count : ` + serverCount + '\n');
  bot.user.setActivity(`${serverCount} serveurs`, {type: "WATCHING"});
});

bot.on('presenceUpdate', (oldMember, newMember) => {
  const presUpdate = require("./functions/presUpdate.js");
  presUpdate(oldMember, newMember);
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  const JoinQuitVoc = require("./functions/JoinQuitVoc.js");
  JoinQuitVoc(oldMember, newMember);
});

/////////////////////////////////////////////////////////////////////////////////////////
// LINK CODE
bot.on('message', (message, linkedChannels) => {

// Const/Var
const botDMs = `**${message.author.username}** sur <@${bot.user.id}> : ${message}`;
const userMSG = `**${message.author.username}** : ${message}`;
const botDMlog = ` MSG sur ${bot.user.username}\n <${message.author.username}> ${message}\n`;
const msgCont = message.content;
const msgchan = message.channel;
var args = message.content.split(',').join(' ').split('  ').join(', ');
let channel = bot.channels.get(`${message.channel.id}`);
var linkedChans = (channel==serverA)||(channel==serverB)||(channel==serverC)||(channel==serverA1)||(channel==serverB)||(channel==serverC)||(channel==serverA2)||(channel==serverB2)||(channel==serverC2);
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
      //allServersMsgsChan.send(MSGChan)
      //allServersMsgsChanWana.send(MSGChan)
    } else {
      let newArgs = args;
      MSGChan = `**\`${new Date()}\`** sur **<#${msgchan.id}>\n ${message.author.username}**: ${newArgs}\n**\`UserID\`** : ${message.author.id}\n**\`ChannelID\`**: ${msgchan.id}`;
      MSGChanLog = ` ${new Date()} sur #${msgchan.name}\n ${message.author.username} : ${newArgs}\n UserID : ${message.author.id}\n ChannelID : ${msgchan.id}\n`;
      //allServersMsgsChan.send(MSGChan)
      //allServersMsgsChanWana.send(MSGChan)
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
  
  if (msgCont.startsWith(prefix)) {
    const usersCmds = require("./commands/usersCmds.js");
    usersCmds(message, prefix, bot, fs, decache)
  }

  var NotAllowedFirst = ["chienne", "Message(s) éffacé(s)", ":wastebasket: |"];
  var NotAllowedWords = ["bite", "suceuse", "de chienne", "2 chienne", "chiène", "chiene", "pétasse", "petasse", "pute", "putes", "salopes", "salopes", "batard", "fdp", "fils de pute", "enculé", "sale chien", "porn", "porno;"]
  var NotAllowedMentions = ["@here", "@everyone"];
  var DiscordInvUrls = ["http://discord.gg", "https://discord.gg", "http://discord.me", "https://discord.me", "https://discordapp.com/invite", "http://discordapp.com/invite", "http://www.discordservers", "https://www.discordservers"];
  var ytURLs = ["http://youtube", "https://youtube", "http://youtu.be/", "https://youtu.be/", "http://www.youtube", "https://www.youtube", "http://www.youtu.be/", "https://www.youtu.be/"]
  const restrict_ans = " vous avez saisi des mots clés interdits sur ce salon.\nPar conséquent votre message a ou va être supprimé et n'a pas pas transmis vers les autres serveurs.";
  const restrict_ans2 = `:warning: Merci de bien vouloir éviter de tenir ou diffuser ce genre de propo(s) / contenu(s)`;

  // Discord Invites Restrictions
  if (DiscordInvUrls.some(word => msgCont.includes(word))) {
    if (message.author === bot.user) {
      message.delete(10000).catch(err => console.log(err));
    } else {
      return message.reply(restrict_ans).then(msg=> msg.delete(7000) && message.delete(7000).catch(err => console.log(err))).then(msg=> message.author.send(restrict_ans2) );
    }
  }

  // Exception for bot messages
  if ((message.author.bot) || (message.author == bot.user)) return;
  if (msgCont.startsWith(prefix) && message.author !== bot.user) return; // Do Not SendMessage to ohters channels if cmd messages
  if (message.content == null) return console.log(`Null Message Detected: ${message}`);

    // Keywords Restrictions
    if (NotAllowedWords.some(word => msgCont.includes(word)) || NotAllowedFirst.some(word => msgCont.startsWith(word)) || NotAllowedMentions.some(word => msgCont.includes(word))) {
      if ((message.author == bot.user) || (message.author == xzdcdev)) {
      console.log(' Specifics Restricted Mentions Detected by : ' + message.author.username)
    } else {
      message.delete(10000).catch(err => console.log(err));
      message.reply(restrict_ans).then(msg=> msg.delete(7000).catch(err => console.log(err))).then(msg=> message.author.send(restrict_ans2));
      console.log(` !!! Not Allowed Word !!! (Message non transmit)\n\n ${new Date()}\n >>> ${message.guild.name} <<< sur #${message.channel.name}\n <${message.author.username}> ${message}\n UserID: <${message.author.id}> MsgID: <${message.id}>\n`)
      return
    }
  }

  // Youtube Link Detection
  if (ytURLs.some(url => (msgCont.includes(url) && arg[0].startsWith('http')))) {
    console.log(' Lien Youtube détecté : ' + msgCont + '\n')
  	ytLinkList.push(arg[0])
    message.channel.send(`**Lien Youtube Détecté !**`)
    message.reply(`votre lien YouTube a bien été ajouté à la liste mystère`)
  	console.log(ytLinkList)
  }

  if (banIDs.some(banned => ((message.author.id) == (banned)))) {
    message.delete(200)
    console.log(` !!! Un utilisateur bannit a voulu envoyer un message !!! (Message non transmit)\n\n ${new Date()}\n >>> ${message.guild.name} <<< sur #${message.channel.name}\n <${message.author.username}> ${message}\n UserID: <${message.author.id}> MsgID: <${message.id}>\n`)
    return message.author.send(`:no_entry_sign: ${message.author}, vous etes bannit sur ce salon, votre message a été supprimé et n'a pas été transmit.`).then(msg=> msg.delete(5000))
  }

const linkFuncRep = "./linkedChansFunc/sendHookServ";
const extension = '.js';

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

} // else console.log(` ERROR ! THIS MESSAGE DONT PROVIDE FROM A LINKED CHANNEL : ${message.content}`) // end of msgChanLink restriction

}

});

/////////////////////////////////////////////////////////////////////////////////////////

app.listen(16504);
bot.login(config.token);
