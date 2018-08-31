Discord = require("./node_modules/discord.js");
bot = new Discord.Client;

function onReady (message, channel, bot, fs, decache, confName) {

  isReady = false;

  // Servers Count/Names/IDs
  var memberCount = bot.users.size;
  var serverCount = bot.guilds.size;
  const guildNames = bot.guilds.map(g => g.name).join(`\n `);
  const guildIDs = bot.guilds.map(g => g.id).join(`\n `);

  console.log(`\n ${bot.user.username}@Bot [Started] ${new Date()}
 --------------------------------------\n Utilisateurs: ${memberCount}\n Serveurs: ${serverCount}\n\n ${guildNames}\n\n ${guildIDs}\n --------------------------------------\n`);

  // Servers Letters Possibilities
  lettersChoice = ['A','B','C','A1','B1','C1','A2','B2','C2'];

  // Channels list
  linkedChans_file = require("./linkedChans/linkedChannels.js")
  linkedChans_file(bot, channel, fs, lettersChoice)

  // Webhooks List
  captainHooks = require("./captainHooks.js")
  captainHooks(Discord, fs)

  // Ban Users (not saved after restart)
  banIDs = [];

  // YouTube Detected Links
  ytLinkList = [];

  // DevIDs
  xzdcdev_id = '446033566649024512';
  xzdc_id = '399094992338944012';
  kos_id = '301812628752171011';
  teen_id = '313498874008305664';
  kori_id = '316332298972823556';
  ash_id = '287973799423377408';
  ashPC_id = '221040142788329483';
  n07h1n6n355_id = '411932312587075614';

  // Users
  xzdc = bot.users.get(`${xzdc_id}`);
  xzdcdev = bot.users.get(`${xzdcdev_id}`);
  teen = bot.users.get(`${teen_id}`);
  kos = bot.users.get(`${kos_id}`);
  kori = bot.users.get(`${kori_id}`);
  ash = bot.users.get(`${ash_id}`);
  ashPC = bot.users.get(`${ashPC_id}`);
  n07h1n6n355 = bot.users.get(`${n07h1n6n355_id}`)

  // Channels
  usersStatChan = bot.channels.get('447385382900989962');
  usersStatChanWana = bot.channels.get('447848186564837387');
  vocChanLog = bot.channels.get('447401287202373652');
  vocChanWanaLog = bot.channels.get('447848240453517313');
  allServersMsgsChan = bot.channels.get('447763477809856520');
  allServersMsgsChanWana = bot.channels.get('447848305678876673');
  
  // Others variables
  default_avatar = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
  avatarSM = 'https://cdn.discordapp.com/avatars/448831815176945676/086496de53737c264708faebcd90accb.png?size=64';
  infoMSG = `**Ce salon relie actuellement ${serverCount} serveurs discord:**\n\n ${guildNames}`;
  propLink = `Vous possédez un serveur discord ?\nVous souhaiteriez rejoindre les **${serverCount} serveurs** déjà en link ?\nN'hesitez pas à m'en informer ici-même, où directement en mp **>>> ${xzdcdev} <<<**`;

  if (confName == "DLB") {
    DLB = bot.users.get(`${bot.user.id}`);
    DLB_SM = bot.users.find('name', 'DLB (Safe Mode)') || bot.users.get('448831815176945676');
    bot.user.setStatus("online");
    bot.user.setActivity(`${serverCount} serveurs`, {type: "WATCHING"});
  
    setInterval (function () {
      console.log(`${bot.user.username}@Bot\n`)
    }, 600 * 1000);

    setInterval (function () {
      console.log('isReady Status: ' + isReady)
    }, 600 * 1000);

    function infoLink() {
      linkedChannels.forEach(channel => {
        var infoLinkMsg = `**Propriétaire d'un serveur discord ?**\n\nVous souhaiteriez rejoindre les **${serverCount} serveurs** déjà en link ?\n\nN'hesitez pas à m'en informer ici-même, où directement en mp.\n\n**>>> ${xzdcdev} <<<**`;
        if (channel != undefined) channel.createWebhook(`Information`, `${default_avatar}`).then(wb => {
          wb.send(infoLinkMsg), wb.delete()
        })
      })
    }
    infoLink()
    setInterval(function() {
      infoLink()
    }, 720 * 60000);

/* // List all connected servers at startup
  hooksList.forEach(webhook => {
    if ((!webhook)||(webhook == undefined)) {
      isReady = true;
    } else if (webhook != undefined) {
      webhook.edit(`Utilisateur`,`${default_avatar}`).then(send=> {
        webhook.send(`${infoMSG}`)
      })
    }
  })
*/

  isReady = true;

  } else if (confName == "DLB_SM") {
    DLB = bot.users.find('name', 'DLB') || bot.users.get('421379745561968640');
    DLB_SM = bot.users.get(`${bot.user.id}`);
    bot.user.setStatus("dnd");
    bot.user.setActivity(`DLB`, {type: "WATCHING"});
    console.log('SafeMode is OFF')
    safeMode = false;
    isReady = true;
  }

// LEAVE AN OLD/UNDEFINED LINKED SERVER
/*
var SERVER_ID = '425061108232093697'
  if (bot.guilds.find('id', SERVER_ID) == (undefined||null)) {
    degage = null;
  } else {degage = bot.guilds.get(SERVER_ID)}
    if (degage !== (undefined||null)) {
     degage.leave().then(leave=> console.log(`${bot.user.username} a quitté le serveur ${degage.name}`));
    } else {
      console.log(` Un serveur a récemment été délink et ${bot.user.username} a bien été retiré du serveur.\n Modifications nécessaires !\n`);
    }
*/

}

module.exports = onReady