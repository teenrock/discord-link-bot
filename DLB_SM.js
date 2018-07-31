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
      if (xzdc != undefined) {xzdc.send('\n' + warning + `**${nowDate}**\n\n` + presUpdateMsg)};
      if (xzdcdev != undefined) {xzdcdev.send('\n' + warning + `**${nowDate}**\n\n` + presUpdateMsg)};
    }

    bot.user.setStatus("online");
    bot.user.setActivity(`${serverCount} serveurs`, {type: "WATCHING"});
    safeMode = true;
    console.log('Safe Mode is ON');

    bot.channels.forEach(channel => {
      if (linkedChans) {
        if ((newMember.guild.name == 'xzdc')||(oldMember.guild.name == 'xzdc')) {
          channel.createWebhook(`DLB (SafeMode)`, `${avatarSM}`).then(webhook => {webhook.send(`${DLB_SM_ON_MSG}`), webhook.delete()});
        }
      }
    })

  } 

  if ((newMember.user == DLB || oldMember.user == DLB) && (newMember.presence.status == 'online' || oldMember.presence.status == 'invisible')) {

    if ((newMember.guild.name == 'xzdc')||(oldMember.guild.name == 'xzdc')) {
      if (xzdc != undefined) {xzdc.send(`\n**${new Date()}**\n\n` + presUpdateMsg)};
      if (xzdcdev != undefined) {xzdcdev.send(`\n**${new Date()}**\n\n` + presUpdateMsg)};
    }

    bot.user.setStatus("dnd");
    bot.user.setActivity('DLB', {type: "WATCHING"});
    safeMode = false;
    console.log('Safe Mode is OFF');

    bot.channels.forEach(channel => {
      if (linkedChans) {
        if ((newMember.guild.name == 'xzdc')||(oldMember.guild.name == 'xzdc')) {
          channel.createWebhook(`DLB (SafeMode)`, `${avatarSM}`).then(webhook => {webhook.send(`${DLB_SM_OFF_MSG}`), webhook.delete()});
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

      bot.channels.forEach(channel => {
        var linkedChans = channel==serverA||channel==serverB||channel==serverC||channel==serverD||channel==serverE||channel==serverF||channel==serverG||channel==serverH||channel==serverI||channel==serverJ||channel==serverK||channel==serverL;
        if (linkedChans) {
          channel.send(`**${message.author.username}** a changé le status de ${DLB_SM} en **${DLB_SMstatus}**`)
        }
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

const botDMs = `**${message.author.username}** sur <@${bot.user.id}> : ${message}`;
const userMSG = `**${message.author.username}** : ${message}`;
const botDMlog = ` MSG sur ${bot.user.username}\n <${message.author.username}> ${message}\n`;
var NotAllowedFirst = ["chienne", "Message(s) éffacé(s)", ":wastebasket: |"];
var NotAllowedWords = ["bite", "suceuse", "de chienne", "2 chienne", "chiène", "chiene", "pétasse", "petasse", "pute", "putes", "salopes", "salopes", "batard", "fdp", "fils de pute", "enculé", "sale chien", "porn", "porno"];
var NotAllowedMentions = ["@here", "@everyone"];
var DiscordInvUrls = ["http://discord.gg", "https://discord.gg", "http://discord.me", "https://discord.me", "https://discordapp.com/invite", "http://discordapp.com/invite", "http://www.discordservers", "https://www.discordservers"];
const restrict_ans = " vous avez saisi des mots clés interdits sur ce salon.\nPar conséquent votre message va être supprimé dans **10 secondes** et n'a pas pas transmis vers autres serveurs.";
const restrict_ans2 = `:warning: Merci de bien vouloir éviter de tenir ou diffuser ce genre de propo(s) / contenu(s)`;
const msg = message.content;
const msgchan = message.channel;
var args = message.content.split(',').join(' ').split('  ').join(', ');
let channel = bot.channels.get(`${message.channel.id}`);
var linkedChans = (channel==serverA)||(channel==serverB)||(channel==serverC)||(channel==serverD)||(channel==serverE)||(channel==serverF)||(channel==serverG)||(channel==serverH)||(channel==serverI)||(channel==serverJ)||(channel==serverK)||(channel==serverL)||(channel==serverM)||(channel==serverN)||(channel==serverO)||(channel==serverP)||(channel==serverQ)||(channel==serverR)||(channel==serverS)||(channel==serverT)||(channel==serverU)||(channel==serverV)||(channel==serverW)||(channel==serverX)||(channel==serverY)||(channel==serverZ);
var msgChanLink = msgchan==serverA||msgchan==serverB||msgchan==serverC||msgchan==serverD||msgchan==serverE||msgchan==serverF||msgchan==serverG||msgchan==serverH||msgchan==serverI||msgchan==serverJ||msgchan==serverK||msgchan==serverL||msgchan==serverM||msgchan==serverN||msgchan==serverO||msgchan==serverP||msgchan==serverQ||msgchan==serverR||msgchan==serverS||msgchan==serverT||msgchan==serverU||msgchan==serverV||msgchan==serverW||msgchan==serverX||msgchan==serverY||msgchan==serverZ;
arg = message.content.split(" ");
 
// Ignored CHannels
 if (msgchan==usersStatChan||msgchan==usersStatChanWana||msgchan==vocChanLog||msgchan==vocChanWanaLog||msgchan==allServersMsgsChan||msgchan==allServersMsgsChanWana) return; // Log Channels on xzdc & wanalike servers
 if (msgchan.id == '442670659953229854') return; // #pokecord sur Animations Squad
 if (msgchan.id == '439943856839065600') return; // #pokemon-catch sur 4eme Dimension
 
/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// COMMANDES DEV: (xzdc_id, teen_id) ///////////////////

// Message to Bot (MP)
if (msgchan.name === undefined)  {

  if (message.author.id == xzdc_id||message.author.id == xzdcdev_id||message.author.id == teen_id) {

    if (msg === '!test') {
      //if (channel.id == undefined) return;
      bot.channels.forEach(channel => {
        if (linkedChans) {
          channel.send(`${message.author.username} a envoyé une commande temporisée: ${msg}.\nElle sera executée dans **10 secondes** ...`).then(msg=> {
            let delay = setInterval(function() {
              channel.send('Delayed commande');
              clearInterval(delay);
            },10 * 1000);
          });
        };
      });
      console.log('Temp 10 secondes');

    } else if (msg === '!clean link') {
      //if (channel.id == undefined) return;
      bot.channels.forEach(channel => {
        if (linkedChans) {
          channel.send(`La suppression du contenu des salons en link va commencer dans **\`5 secondes\`** pour une durée de **\`30 minutes\`**`)
          .then(msg=> {
            let delay = setInterval(function() {
              channel.send('!clean all');
              clearInterval(delay);
            },5 * 1000 );
            let timer = setInterval(function() {
              channel.send('!clean all')
            }, 90 * 1000);
            let timerG = setInterval(function() {
              clearInterval(timer);
              channel.send('La purge des salons en link est terminée !');
              clearInterval(timerG);
            }, 30 * 60000);
          });
        };
      });
      console.log('Le contenu de chaque salon en link est en cours de suppression...');

    } else if (msg === '!clear link') {
      //if (channel.id == undefined) return;
      bot.channels.forEach(channel => {
        if (linkedChans) {
          channel.send(`${message.author.username} a envoyé une commande de suppression: ${msg}.\nElle sera executée dans **10 secondes** ...`).then(msg=> {
            let delay = setInterval(function() {
              channel.send('!clear');
              clearInterval(delay);
            },10 * 1000 );
          });
        };
      });
      console.log('Temp 10 secondes');

    }
      var commande = message.content;
      var DLB_SMstatus = commande;
      console.log('MP commande detected: ' + commande);
      if (commande == "online"||commande == "idle"||commande == "dnd"||commande == "invisible") {
        bot.channels.forEach(channel => {
          if (linkedChans) {
            channel.send(`**${message.author.username}** a changé le status de ${DLB_SM} en **${DLB_SMstatus}**`)
          }
        })
        bot.user.setStatus(`${DLB_SMstatus}`);
      } 

  } // end of xzdc/xzdcdev/teen IDs restriction

// ALL DLB_SM SERVERS CHANNELS MSGS REPPORT ON XZDC & WANALIKE SERVERS
} 
if (msgchan.name !== undefined) {
  let member = message.mentions.members.first();
  let xzdcMentionMSG = ` #############################################################################################
  ${new Date()}\n   >>> ${message.guild.name} <<< 
  ${message.author.username} vous a mentionné sur #${message.channel.name} - <#${message.channel.id}> \n
  ${message}\n\n #############################################################################################\n`;
  let args = message.content.split(',').join(' ').split('  ').join(', ');
  let argsLog = args;

    if (!message.author.bot) {
      if (message.attachments) {
        message.attachments.forEach(a => {
          if (args) {
          argsLog = ` ${message}\n ${a.url}`;
          } else if (!args) {
          argsLog = ` ${a.url}`;
          }
        })
      }
      
      MSGChanLog = `**\`${new Date()}\`**\n**\`>>> ${message.guild.name} <<<\`** sur **\`#${message.channel.name}\`** - <#${message.channel.id}> \n**<${message.author.username}>** ${argsLog}\n**\`UserID\`** : ${message.author.id}\n**\`ChannelID\`**: ${message.channel.id}`;

      allServersMsgsChan.send(MSGChanLog)
      allServersMsgsChanWana.send(MSGChanLog)
    }

    // xzdc is mentionned
    if ((member) && (member.id === xzdc_id)) {
      if (message.author.bot) return;
      xzdc.send(xzdcMentionMSG);
      console.log(xzdcMentionMSG);
    }

  if ((message.author == teen) || (message.author == xzdc) || (message.author == xzdcdev) || (message.author == DLB_SM)) {

    if (msg.startsWith('!newchan')) {
      let args = msg.split(' ').slice(1).join(' ');
      message.delete(3000);
      message.guild.createChannel(`${args}`, "text").then(createChannel=> console.log(` Un nouveau salon a été créé sur ${message.guild.name}\n`));
    } else if (msg == '!clean all') {
      const deleteStuff = require("./functions/deleteStuff.js");
      deleteStuff(message, prefix, bot);
    } else if (msg == '!guilds') {
      message.author.send(`${bot.guilds}`);
      message.delete();
    } else if (msg == '!test') {
      console.log(bot.channels);
      message.author.send(`${bot.channels}`);
    } else if (msg == '!clear') {
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
  }
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// LINK ///////////////////

if (msgChanLink) {
// Keywords Restrictions
  if (NotAllowedWords.some(word => msg.includes(word)) || NotAllowedFirst.some(word => msg.startsWith(word))) {
    if (message.author !== DLB_SM) {
      message.delete(10000).catch(err => console.log(err));
      message.reply(restrict_ans).then(msg=> msg.delete(7000).catch(err => console.log(err))).then(msg=> message.author.send(restrict_ans2));
    }
  }
// Discord Invites Restrictions
  if (DiscordInvUrls.some(word => msg.includes(word))) {
    if (message.author === DLB_SM) {
      message.delete(10000).catch(err => console.log(err));
    } else {
      message.reply(restrict_ans).then(msg=> message.delete(7000).catch(err => console.log(err))).then(msg=> message.author.send(restrict_ans2));
    }
  }

  if (msg === '!ici') {
    var ici_msg = `**${message.author.username}** se trouve sur le serveur **${message.guild.name}**`;
    (serverA.send(ici_msg), serverB.send(ici_msg), serverC.send(ici_msg), serverD.send(ici_msg), serverE.send(ici_msg),
     serverF.send(ici_msg), serverG.send(ici_msg), serverH.send(ici_msg), serverI.send(ici_msg), serverJ.send(ici_msg),
     serverK.send(ici_msg), serverL.send(ici_msg)).then(send=>message.delete(1000));
  } else if (msg === '!myid') {
    var myid_msg = `**${message.author.username}** a pour identifiant **${message.author.id}**`;
    (serverA.send(myid_msg), serverB.send(myid_msg), serverC.send(myid_msg), serverD.send(myid_msg), serverE.send(myid_msg),
     serverF.send(myid_msg), serverG.send(myid_msg), serverH.send(myid_msg), serverI.send(myid_msg), serverJ.send(myid_msg),
     serverK.send(myid_msg), serverL.send(myid_msg)).then(send=>message.delete(1000));
  } else if (msg === '!invitation') {
    message.guild.channels.get(message.channel.id).createInvite()
    .then(invite => {
      (serverA.send(invite.url), serverB.send(invite.url), serverC.send(invite.url),
       serverD.send(invite.url), serverE.send(invite.url), serverF.send(invite.url),
       serverG.send(invite.url), serverH.send(invite.url), serverI.send(invite.url),
       serverJ.send(invite.url), serverK.send(invite.url), serverL.send(invite.url)).then(send=>message.delete(1000));
    })
    .then(msg=> message.delete().catch(err => console.log(err)));
  } else if (msg.startsWith('!avatar' + ' ')) {
      let args = msg.split(" ");
      var userid = bot.users.get(args[1]);
      if (userid === undefined) {
        message.channel.send(`:warning: **Vous n'avez pas spécifié un UserID valide**\n**La commande est:**\n**\`!avatar ID_UTILISATEUR\`**\n**Si vous ne savez pas comment obtenir le UserID, Google vous aidera**`);
      } else {
        if (userid.avatarURL != null) {
          let avatarAns = `**${message.author.username}** a demandé l'avatar de **${userid.username}** : ${userid.avatarURL}`;
          (serverA.send(avatarAns), serverB.send(avatarAns), serverC.send(avatarAns), serverD.send(avatarAns), serverE.send(avatarAns), serverF.send(avatarAns),
          serverG.send(avatarAns), serverH.send(avatarAns), serverI.send(avatarAns), serverJ.send(avatarAns), serverK.send(avatarAns), serverL.send(avatarAns)).then(send=>message.delete(1000));
        } else {
          message.channel.send(`:warning: Cet utilisateur n'a pas d'avatar définit`);
        }
      }
  }
// xzdc command's only  
  if (message.author.id === xzdc_id){
    if (msg === '!new webhook') {
      var chanHook = bot.channels.get(`${msgchan.id}`);
      let default_avatar = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
      message.delete(3000);
      message.reply(' un nouveau webhook a été créé à votre demande.');
      chanHook.createWebhook(`Utilisateur`, `${default_avatar}`).then(webhook=> console.log(` ${message.guild.name}: Un nouveau WebHook a été créé sur ${msgchan.name}\n`));
    } else if (msg === '!bot invite') {
        message.author.send(`https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=738716737`);
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// LINK ///////////////////

// Exception for bot messages & UsersCMDs
if (message.channel.name === undefined) return;
if ((message.author.bot)||(message.author == DLB_SM)||(message.author == DLB)) return;
if (msg.startsWith(prefix)&&((message.author !== DLB_SM)||(message.author !== DLB))) return; // Do Not SendMessage if starts with prefix
if (NotAllowedWords.some(word => msg.includes(word)) || NotAllowedFirst.some(word => msg.startsWith(word))) {
  (console.log(` !!! Not Allowed Word !!! (Message non transmit)\n\n ${new Date()}\n >>> ${message.guild.name} <<< sur #${message.channel.name}\n <${message.author.username}> ${message}\n UserID: <${message.author.id}> MsgID: <${message.id}>\n`))
  return;
};

const linkFuncRep = "./linkedChannels/sendHookServ";
const extension = '.js';

// Discord Server A Channel Link
if (message.channel === serverA) {
  var servLetter = 'A';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServA = require(linkFuncRep + servLetter + extension);
    sendHookServA(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}
// Discord Server B Channel Link
if (message.channel === serverB) {
  var servLetter = 'B';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServB = require(linkFuncRep + servLetter + extension);
    sendHookServB(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}
// Discord Server C Channel Link
if (message.channel === serverC) {
  var servLetter = 'C';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServC = require(fileServ);
    sendHookServC(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}
// Discord Server D Channel Link
if (message.channel === serverD) {
  var servLetter = 'D';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServD = require(linkFuncRep + servLetter + extension);
    sendHookServD(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}
// Discord Server E Channel Link
if (message.channel === serverE) {
  var servLetter = 'E';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServE = require(linkFuncRep + servLetter + extension);
    sendHookServE(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}
// Discord Server F Channel Link
if (message.channel === serverF) {
  var servLetter = 'F';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServF = require(fileServ);
    sendHookServF(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}
// Discord Server G Channel Link
if (message.channel === serverG) {
  var servLetter = 'G';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServG = require(linkFuncRep + servLetter + extension);
    sendHookServG(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}
// Discord Server H Channel Link
if (message.channel === serverH) {
  var servLetter = 'H';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServH = require(linkFuncRep + servLetter + extension);
    sendHookServH(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}
// Discord Server I Channel Link
if (message.channel === serverI) {
  var servLetter = 'I';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServI = require(fileServ);
    sendHookServI(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}
// Discord Server J Channel Link
if (message.channel === serverJ) {
  var servLetter = 'J';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServJ = require(linkFuncRep + servLetter + extension);
    sendHookServJ(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}
// Discord Server K Channel Link
if (message.channel === serverK) {
  var servLetter = 'K';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServK = require(linkFuncRep + servLetter + extension);
    sendHookServK(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}
// Discord Server L Channel Link
if (message.channel === serverL) {
  var servLetter = 'L';
  var fileServ = linkFuncRep + servLetter + extension;
  if (fs.existsSync(fileServ)) {
    const sendHookServL = require(fileServ);
    sendHookServL(message, bot)
  } else console.log(` Le bot n'a pas pu trouver le fichier contenant la fonction de de link serveur ${servLetter}.\n Il se pourrait que ce dernier ait été supprimé.\n La commande **!create link LETTRE_DU_SERVEUR** peut s'en charger pour vous.\n`);
}



}
}
});
/////////////////////////////////////////////////////////////////////////////////////////

app.listen(18579);
bot.login(config.token);
