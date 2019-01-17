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

/*
bot.on('channelDelete', (oChannel, nChannel) => {

  if ((oChannel.name == "cheriana") && (oChannel.type == "text")) {

    setTimeout(function() {

      var cherianaResu = bot.channels.find(chan => chan.name === 'cheriana-resurrection');


    }, 1 * 1500)

    setTimeout(function() {

      var cheriana = bot.channels.find(chan => chan.name === 'cheriana');
      var cherianaResu = bot.channels.find(chan => chan.name === 'cheriana-resurrection');


    }, 3 * 1333)
    
  }

});
*/

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
var linkedChans = (channel==cheriana)||(channel==server0)||(channel==serverA)||(channel==serverB)||(channel==serverC)||(channel==serverD)||(channel==serverE)||(channel==serverF)||(channel==serverG)||(channel==serverH)||(channel==serverI)||(channel==serverJ)||(channel==serverK)||(channel==serverL)||(channel==serverM)||(channel==serverN)||(channel==serverO)||(channel==serverP)||(channel==serverQ)||(channel==serverR)||(channel==serverS)||(channel==serverT)||(channel==serverU)||(channel==serverV)||(channel==serverW)||(channel==serverX)||(channel==serverY)||(channel==serverZ)||(channel==serverA1)||(channel==serverB1)||(channel==serverC1)||(channel==serverD1)||(channel==serverE1)||(channel==serverF1)||(channel==serverG1)||(channel==serverH1)||(channel==serverI1)||(channel==serverJ1)||(channel==serverK1)||(channel==serverL1)||(channel==serverM1)||(channel==serverN1)||(channel==serverO1)||(channel==serverP1)||(channel==serverQ1)||(channel==serverR1)||(channel==serverS1)||(channel==serverT1)||(channel==serverU1)||(channel==serverV1)||(channel==serverW1)||(channel==serverX1)||(channel==serverY1)||(channel==serverZ1)||(channel==serverA2)||(channel==serverB2)||(channel==serverC2)||(channel==serverD2)||(channel==serverE2)||(channel==serverF2)||(channel==serverG2)||(channel==serverH2)||(channel==serverI2)||(channel==serverJ2)||(channel==serverK2)||(channel==serverL2)||(channel==serverM2)||(channel==serverN2)||(channel==serverO2)||(channel==serverP2)||(channel==serverQ2)||(channel==serverR2)||(channel==serverS2)||(channel==serverT2)||(channel==serverU2)||(channel==serverV2)||(channel==serverW2)||(channel==serverX2)||(channel==serverY2)||(channel==serverZ2)||(channel==serverA3)||(channel==serverB3)||(channel==serverC3)||(channel==serverD3)||(channel==serverE3)||(channel==serverF3)||(channel==serverG3)||(channel==serverH3)||(channel==serverI3)||(channel==serverJ3)||(channel==serverK3)||(channel==serverL3)||(channel==serverM3)||(channel==serverN3)||(channel==serverO3)||(channel==serverP3)||(channel==serverQ3)||(channel==serverR3)||(channel==serverS3)||(channel==serverT3)||(channel==serverU3)||(channel==serverV3)||(channel==serverW3)||(channel==serverX3)||(channel==serverY3)||(channel==serverZ3);
var msgChanLink = msgchan==cheriana||msgchan==server0||msgchan==serverA||msgchan==serverB||msgchan==serverC||msgchan==serverD||msgchan==serverE||msgchan==serverF||msgchan==serverG||msgchan==serverH||msgchan==serverI||msgchan==serverJ||msgchan==serverK||msgchan==serverL||msgchan==serverM||msgchan==serverN||msgchan==serverO||msgchan==serverP||msgchan==serverQ||msgchan==serverR||msgchan==serverS||msgchan==serverT||msgchan==serverU||msgchan==serverV||msgchan==serverW||msgchan==serverX||msgchan==serverY||msgchan==serverZ||msgchan==serverA1||msgchan==serverB1||msgchan==serverC1||msgchan==serverD1||msgchan==serverE1||msgchan==serverF1||msgchan==serverG1||msgchan==serverH1||msgchan==serverI1||msgchan==serverJ1||msgchan==serverK1||msgchan==serverL1||msgchan==serverM1||msgchan==serverN1||msgchan==serverO1||msgchan==serverP1||msgchan==serverQ1||msgchan==serverR1||msgchan==serverS1||msgchan==serverT1||msgchan==serverU1||msgchan==serverV1||msgchan==serverW1||msgchan==serverX1||msgchan==serverY1||msgchan==serverZ1||msgchan==serverA2||msgchan==serverB2||msgchan==serverC2||msgchan==serverD2||msgchan==serverE2||msgchan==serverF2||msgchan==serverG2||msgchan==serverH2||msgchan==serverI2||msgchan==serverJ2||msgchan==serverK2||msgchan==serverL2||msgchan==serverM2||msgchan==serverN2||msgchan==serverO2||msgchan==serverP2||msgchan==serverQ2||msgchan==serverR2||msgchan==serverS2||msgchan==serverT2||msgchan==serverU2||msgchan==serverV2||msgchan==serverW2||msgchan==serverX2||msgchan==serverY2||msgchan==serverZ2||msgchan==serverA3||msgchan==serverB3||msgchan==serverC3||msgchan==serverD3||msgchan==serverE3||msgchan==serverF3||msgchan==serverG3||msgchan==serverH3||msgchan==serverI3||msgchan==serverJ3||msgchan==serverK3||msgchan==serverL3||msgchan==serverM3||msgchan==serverN3||msgchan==serverO3||msgchan==serverP3||msgchan==serverQ3||msgchan==serverR3||msgchan==serverS3||msgchan==serverT3||msgchan==serverU3||msgchan==serverV3||msgchan==serverW3||msgchan==serverX3||msgchan==serverY3||msgchan==serverZ3;
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

  if (!message.author.bot) {

    if (message.attachments) {

      message.attachments.forEach(att => {
        if (!message.content) {
          newArgs = ` ${att.url}`;
        } else if (message.content) {

          if (message.content.includes(member)) {
            newArgs = message.content.replace(member, `**${member.user.username}**`).join(att.url);
          } else {
            newArgs = message.content + '\n' + att.url;
          }
        }
      })
    }

      if (message.content.includes(member)) {
        newArgs = message.content.replace(member, `**${member.user.username}**`);
      } else {
        newArgs = newArgs
      }

    var MSGChan = `**${message.author.username}** sur **${msgchan}** : ${newArgs}`;
    var MSGChanLog = ` ${new Date()} sur #${msgchan.name}\n ${message.author.username} : ${newArgs}\n UserID : ${message.author.id}\n ChannelID : ${msgchan.id}\n`;
    allServersMsgsChan.send(MSGChan)
    allServersMsgsChanWana.send(MSGChan)
    if (!msgChanLink) console.log(MSGChanLog)

  }

  // member is mentionned
  if (member) {
    const isMentionned = require("./functions/isMentionned.js");
    isMentionned(message, member, MentionMSG)
  }

  // xzdc specifics commands 
  xzdcUsersList.some(user => {
    if (message.author === user) {
      const xzdcCmds = require("./commands/xzdcCmds.js");
      xzdcCmds(message, prefix, bot, linkedChannels, linkedChans, fs, decache)
    }
  })

  function modoCmds(user) {
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
    modoCmds(user)
  })

  // moderators specifics commands
  modoUsersList.some(user => {
    modoCmds(user)
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
  if (DiscordInvUrls.some(word => msgCont.includes(word))) {

    if (message.author.id == bot.user.id) {

      message.delete(10000).catch(err => console.log(err))

    } else if (message.author != xzdcUsersList.some(user)) {
      console.log(message.author.username + " has try to post a discord invite link")
      return message.reply(restrict_ans).then(msg=> msg.delete(7000) && message.delete(7000).then(msg=> message.author.send(restrict_ans2)))
    }
    
}
  // Exception for bot messages
  if ((message.author.bot) && (message.author.id != "519711870249336844")) return; // ID = Bot KOS
  if (msgCont.startsWith(prefix) && message.author != bot.user) return; // Do Not SendMessage to ohters channels if cmd messages
  if (message.content == null) return console.log(`Null Message Detected: ${message}`);

    // Keywords Restrictions
    if (NotAllowedWords.some(word => msgCont.includes(word)) || NotAllowedFirst.some(word => msgCont.startsWith(word)) || NotAllowedMentions.some(word => msgCont.includes(word))) {
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
  if (ytURLs.some(url => (msgCont.startsWith('http') && msgCont.includes(url)))) {
    console.log(' ' + msgCont + '\n')
    ytLinkList.push(msgCont.split(" ").slice([0]))
    console.log(ytLinkList)
  }

  if (banIDs.some(banned => ((message.author.id) == (banned)))) {
    message.delete(200)
    console.log(` !!! Un utilisateur bannit a voulu envoyer un message !!! (Message non transmit)\n\n ${new Date()}\n >>> ${message.guild.name} <<< sur #${message.channel.name}\n <${message.author.username}> ${message}\n UserID: <${message.author.id}> MsgID: <${message.id}>\n`)
    return message.author.send(`:no_entry_sign: ${message.author}, vous etes bannit sur ce salon, votre message a été supprimé et n'a pas été transmit.`).then(msg=> msg.delete(5000))
  }

const linkFuncRep = "./linkedChansFunc/sendHookServ";
const extension = ".js";

// Discord Server 0 Channel Link
  if ((!server0)||(server0 == undefined)) {
    var servLetter = '0';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === server0) {
    var servLetter = '0';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServ0 = require(fileServ);
      sendHookServ0(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

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
  
// Discord Server D Channel Link
  if ((!serverD)||(serverD == undefined)) {
  	var servLetter = 'D';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverD) {
    var servLetter = 'D';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServD = require(fileServ);
      sendHookServD(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server E Channel Link
  if ((!serverE)||(serverE == undefined)) {
  	var servLetter = 'E';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverE) {
    var servLetter = 'E';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServE = require(fileServ);
      sendHookServE(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server F Channel Link
  if ((!serverF)||(serverF == undefined)) {
  	var servLetter = 'F';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverF) {
    var servLetter = 'F';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServF = require(fileServ);
      sendHookServF(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server G Channel Link
  if ((!serverG)||(serverG == undefined)) {
  	var servLetter = 'G';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverG) {
    var servLetter = 'G';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServG = require(fileServ);
      sendHookServG(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server H Channel Link
  if ((!serverH)||(serverH == undefined)) {
  	var servLetter = 'H';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverH) {
    var servLetter = 'H';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServH = require(fileServ);
      sendHookServH(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server I Channel Link
  if ((!serverI)||(serverI == undefined)) {
  	var servLetter = 'I';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverI) {
    var servLetter = 'I';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServI = require(fileServ);
      sendHookServI(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server J Channel Link
  if ((!serverJ)||(serverJ == undefined)) {
  	var servLetter = 'J';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverJ) {
    var servLetter = 'J';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServJ = require(fileServ);
      sendHookServJ(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server K Channel Link
  if ((!serverK)||(serverK == undefined)) {
  	var servLetter = 'K';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverK) {
    var servLetter = 'K';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServK = require(fileServ);
      sendHookServK(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server L Channel Link
  if ((!serverL)||(serverL == undefined)) {
  	var servLetter = 'L';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverL) {
    var servLetter = 'L';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServL = require(fileServ);
      sendHookServL(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server M Channel Link
  if ((!serverM)||(serverM == undefined)) {
  	var servLetter = 'M';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverM) {
    var servLetter = 'M';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServM = require(fileServ);
      sendHookServM(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server N Channel Link
  if ((!serverN)||(serverN == undefined)) {
  	var servLetter = 'N';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverN) {
    var servLetter = 'N';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServN = require(fileServ);
      sendHookServN(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server O Channel Link
  if ((!serverO)||(serverO == undefined)) {
  	var servLetter = 'O';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverO) {
    var servLetter = 'O';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServO = require(fileServ);
      sendHookServO(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server P Channel Link
  if ((!serverP)||(serverP == undefined)) {
  	var servLetter = 'P';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverP) {
    var servLetter = 'P';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServP = require(fileServ);
      sendHookServP(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server Q Channel Link
  if ((!serverQ)||(serverQ == undefined)) {
  	var servLetter = 'Q';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverQ) {
    var servLetter = 'Q';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServQ = require(fileServ);
      sendHookServQ(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server R Channel Link
  if ((!serverR)||(serverR == undefined)) {
  	var servLetter = 'R';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverR) {
    var servLetter = 'R';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServR = require(fileServ);
      sendHookServR(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server S Channel Link
  if ((!serverS)||(serverS == undefined)) {
  	var servLetter = 'S';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverS) {
    var servLetter = 'S';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServS = require(fileServ);
      sendHookServS(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server T Channel Link
  if ((!serverT)||(serverT == undefined)) {
  	var servLetter = 'T';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverT) {
    var servLetter = 'T';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServT = require(fileServ);
      sendHookServT(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server U Channel Link
  if ((!serverU)||(serverU == undefined)) {
  	var servLetter = 'U';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverU) {
    var servLetter = 'U';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServU = require(fileServ);
      sendHookServU(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

  // Discord Server V Channel Link
  if ((!serverV)||(serverV == undefined)) {
  	var servLetter = 'V';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverV) {
    var servLetter = 'V';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServV = require(fileServ);
      sendHookServV(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server W Channel Link
  if ((!serverW)||(serverW == undefined)) {
  	var servLetter = 'W';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverW) {
    var servLetter = 'W';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServW = require(fileServ);
      sendHookServW(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server X Channel Link
  if ((!serverX)||(serverX == undefined)) {
  	var servLetter = 'X';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverX) {
    var servLetter = 'X';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServX = require(fileServ);
      sendHookServX(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

// Discord Server Y Channel Link
  if ((!serverY)||(serverY == undefined)) {
  	var servLetter = 'Y';
    // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
  } else if (message.channel === serverY) {
    var servLetter = 'Y';
    var fileServ = linkFuncRep + servLetter + extension;
    if (fs.existsSync(fileServ)) {
      const sendHookServY = require(fileServ);
      sendHookServY(message, bot)
    } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
  }

  // Discord Server Z Channel Link
    if ((!serverZ)||(serverZ == undefined)) {
    	var servLetter = 'Z';
      // console.log(` LinkedChannel on [Server ${servLetter}] is not defined or does not exist.\n Members of this server can not send messages to others servers.\n`)
    } else if (message.channel === serverW) {
      var servLetter = 'Z';
      var fileServ = linkFuncRep + servLetter + extension;
      if (fs.existsSync(fileServ)) {
        const sendHookServZ = require(fileServ);
        sendHookServZ(message, bot)
      } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n`);
    }

} // else console.log(` ERROR ! THIS MESSAGE DONT PROVIDE FROM A LINKED CHANNEL : ${message.content}`) // end of msgChanLink restriction

}

});

/////////////////////////////////////////////////////////////////////////////////////////

app.listen(16109);
bot.login(config.token);
