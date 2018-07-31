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
// ON READY

bot.on("ready", (message, channel) => {
  const onReady = require("./onReady.js")
  onReady(message, channel, bot, fs, decache, confName)
});

bot.on("guildCreate", (guild, message, channel, fs, decache) => {
  var serverCount = bot.guilds.size;

  var createLink = function letterNumber(serverCount, fs, decache) {
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

    servLetter = newLetter
    lettersChoice = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const letterChoiceMsg = "la syntaxe de la commande est incorrecte.\nVous n'avez associé aucune lettre au serveur ou il ne s'agit pas d'un caractère standard.";
    const cyberNameTemp = 'cyberespace-is-being-created';
    var bot_ID = bot.users.get(`${bot.user.id}`);
    var bot_avatar = bot_ID.avatarURL;

    guild.createChannel(cyberNameTemp, "text").then(channel=> {
      cyberChanTemp = bot.channels.find('name', cyberNameTemp);
      var newChannelMsg = `Le salon textuel **${cyberChanTemp.name}** vient d'être créé sur le serveur : **${guild.name}**`;
      linkedChannels.forEach(channel => {
        if (channel != undefined) {
          let cyberChanTemp = "cyberespace"
          channel.send(newChannelMsg)
        } else console.log(` Channel (link) does not exist. Message has not been sent.`)
      })
      console.log('\n')

      setTimeout(function() {
        cyberChan = bot.channels.get(`${cyberChanTemp.id}`)

        cyberChan.createWebhook(`${bot_ID.username}`, `${bot_avatar}`).then(wb=> {
       	  newHook_ID = wb.id;
      	  newHook_TOKEN = wb.token;
      	  var newWebHookMsg =  `**${bot.user.username}** vient de créer le WebHook pour le link sur le **Server ` + servLetter + '**';

          linkedChannels.forEach(channel => {
            if (channel != undefined) {
              channel.send(newWebHookMsg)
            } else console.log(` Channel (link) does not exist. Message has not been sent.`)    
          })

          cyberChan.send(`Le WebHook pour le link vient d'être créé par **${bot.user.username}**`)
      	  console.log(`\n New WebHook ID : ${newHook_ID}\n New WebHook Token : ${newHook_TOKEN}\n`)

          const newLinkFunc = require("./functions/newLinkFunc.js")
          newLinkFunc(servLetter, message, cyberChanTemp, letterChoiceMsg, newHook_ID, newHook_TOKEN, bot, fs)

          cyberChan.setName('cyberespace').then(send => {
            var renameChanMsg = `Le salon textuel **#` + cyberNameTemp + `** vient d'être renommé en : `;

            cyberChan.send(renameChanMsg + cyberChan)
            server = `server${servLetter}`
            server = require("./linkedChans/server" + servLetter + ".js")
            server
            h00k = `Hook${servLetter}`
            h00k = require("./hooks/hook" + servLetter + ".js")
            h00k
            console.log(' ' + renameChanMsg + cyberChan.name + '\n')

          })

      	})
        console.log(' ' + newChannelMsg + '\n')

      }, 1 * 500);

    })
    bot.user.setActivity(`${serverCount} serveurs`, {type: "WATCHING"});
    console.log(` ${bot.user.username} a rejoint un nouveau serveur: ${guild.name} (ID: ${guild.id}).\n Ce serveur compte ${guild.memberCount} membres.\n`);

  }

  createLink(serverCount, fs, decache)

});

bot.on("guildDelete", guild => {
  let serverCount = bot.guilds.size;
  console.log(` ${bot.user.username} a quitté le serveur: ${guild.name} (ID: ${guild.id})\n New Linked Channels Count : ` + serverCount + '\n');
  bot.user.setActivity(`${serverCount} serveurs`, {type: "WATCHING"});
});


//////////////////////////////////////////////////////////////////////////////////////////
// USERS PRESENCE STATUS UPDATE & D3LB(BOT) DISCONNECTED ALERT 
bot.on('presenceUpdate', (oldMember, newMember) => {
  const presUpdate = require("./functions/presUpdate.js");
  presUpdate(oldMember, newMember);
});

//////////////////////////////////////////////////////////////////////////////////////////
// VOCAL CHANNELS LOG + CHANNEL REPORT
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
const msg = message.content;
const msgchan = message.channel;
var args = message.content.split(',').join(' ').split('  ').join(', ');
let channel = bot.channels.get(`${message.channel.id}`);
var linkedChans = (channel==serverA)||(channel==serverB)||(channel==serverC)||(channel==serverD)||(channel==serverE)||(channel==serverF)||(channel==serverG)||(channel==serverH)||(channel==serverI)||(channel==serverJ)||(channel==serverK)||(channel==serverL)||(channel==serverM)||(channel==serverN)||(channel==serverO)||(channel==serverP)||(channel==serverQ)||(channel==serverR)||(channel==serverS)||(channel==serverT)||(channel==serverU)||(channel==serverV)||(channel==serverW)||(channel==serverX)||(channel==serverY)||(channel==serverZ);
var msgChanLink = msgchan==serverA||msgchan==serverB||msgchan==serverC||msgchan==serverD||msgchan==serverE||msgchan==serverF||msgchan==serverG||msgchan==serverH||msgchan==serverI||msgchan==serverJ||msgchan==serverK||msgchan==serverL||msgchan==serverM||msgchan==serverN||msgchan==serverO||msgchan==serverP||msgchan==serverQ||msgchan==serverR||msgchan==serverS||msgchan==serverT||msgchan==serverU||msgchan==serverV||msgchan==serverW||msgchan==serverX||msgchan==serverY||msgchan==serverZ;
arg = message.content.split(" ");

// Message to Bot (MP) - GLOBAL CONDITION 1
if (msgchan.name === undefined)  {

  if (message.author.id == xzdc_id||message.author.id == xzdcdev_id||message.author.id == teen_id||message.author.id == kos_id||message.author.id == kori_id) {

    const adminCmds = require("./commands/adminCmds.js");
    adminCmds(message, prefix, bot, linkedChans, fs)
  } // End of admins commands restriction

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

/*
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
*/

  }
    // xzdc is mentionned
    if ((member) && (member.id === xzdc_id)) {
      if (message.author.bot) return;
      xzdc.send(MentionMSG);
      console.log(MentionMSG);
    }

  // XZDC specifics commands
  if ((message.author == teen) || (message.author == xzdc) || (message.author == xzdcdev)) {
    const xzdcCmds = require("./commands/xzdcCmds.js");
    xzdcCmds(message, prefix, bot, fs, decache, linkedChannels, linkedChans)


  } // end of teen / xzdc / xzdc_dev commands restriction

  if ((message.author == teen) || (message.author == xzdc) || (message.author == xzdcdev) || (message.author == kos) || (message.author == kori) || (message.author == DLB)) {

    const adminCmds = require("./commands/adminCmds.js")
    const cybermute = require("./commands/cybermute.js");
    const cyberunmute = require("./commands/cyberunmute.js");
    
    adminCmds(message, prefix, bot)
    cybermute(message, prefix, bot)
    cyberunmute(message, prefix, bot)

  } // end of admin commands restriction

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// LINK ///////////////////

// MSG provide from a linked channel
if (msgChanLink) {
  
  const usersCmds = require("./commands/usersCmds.js");
  usersCmds(message, prefix, bot)

  var NotAllowedFirst = ["chienne", "Message(s) éffacé(s)", ":wastebasket: |"];
  var NotAllowedWords = ["bite", "suceuse", "de chienne", "2 chienne", "chiène", "chiene", "pétasse", "petasse", "pute", "putes", "salopes", "salopes", "batard", "fdp", "fils de pute", "enculé", "sale chien", "porn", "porno"]
  var NotAllowedMentions = ["@here", "@everyone"];
  var DiscordInvUrls = ["http://discord.gg", "https://discord.gg", "http://discord.me", "https://discord.me", "https://discordapp.com/invite", "http://discordapp.com/invite", "http://www.discordservers", "https://www.discordservers"];
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
      if ((message.author == bot.user) || (message.author == xzdcdev)) {
      console.log(' Specifics Restricted Mentions Detected by : ' + message.author.username)
    } else {
      message.delete(10000).catch(err => console.log(err));
      message.reply(restrict_ans).then(msg=> msg.delete(7000).catch(err => console.log(err))).then(msg=> message.author.send(restrict_ans2));
      console.log(` !!! Not Allowed Word !!! (Message non transmit)\n\n ${new Date()}\n >>> ${message.guild.name} <<< sur #${message.channel.name}\n <${message.author.username}> ${message}\n UserID: <${message.author.id}> MsgID: <${message.id}>\n`)
      return
    }
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
