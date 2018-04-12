//////////////////////////////////////////////////////////////////////////////////////////
// DCL
/////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("./node_modules/discord.js");
const bot = new Discord.Client({autoReconnect: true, max_message_cache: 0});
const config = require("./conf.json");
const prefix = config.prefix;
var EventEmitter = require('./node_modules/events').EventEmitter.defaultMaxListeners = 0;
/////////////////////////////////////////////////////////////////////////////////////////

bot.on("ready", function() {
	bot.user.setStatus("online");
	console.log("---------------- DLB ----------------");
});

/////////////////////////////////////////////////////////////////////////////////////////
// CODE TEST
/////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////
// Commandes
/////////////////////////////////////////////////////////////////////////////////////////

bot.on('message', function(message) {
if (message.content === '!ici') {
  	message.channel.send(`**${message.author.username}** se trouve sur le serveur **${message.guild.name}**`)
} else if (message.content === '!myid') {
message.channel.send(`**${message.author.username}** a pour identifiant **${message.author.id}**`)
} else if (message.content === '!invitation') {
    message.guild.channels.get(message.channel.id).createInvite().then(invite =>
    message.channel.send(invite.url));
} else if (message.content === '!bot invite') {
  message.author.send(`https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=216129`)
}
});

/////////////////////////////////////////////////////////////////////////////////////////
// Channels Link Code & Console Return
/////////////////////////////////////////////////////////////////////////////////////////

bot.on('message', function(message) {
var serverA_chan = bot.channels.get('423450642451922949'); // ServerA
var serverB_chan = bot.channels.get('423450887986479107'); // ServerB
var serverC_chan = bot.channels.get('423450986506485762'); // ServerC
var botID = bot.users.get('423458755397681152');
var botDMs = `**${message.author.username}** sur <@${bot.user.id}> : ${message}`;
var userMSG = `**${message.author.username}** : ${message}`;
var botDMlog = `MSG sur ${bot.user.username}\n<${message.author.username}> ${message}\n`;
// Bot DMs Channels Return 
	if ((message.author === botID) && (!message.content.startsWith(`https://discord.gg/`))) return;
	if (message.content.startsWith(`Message(s) éffacé(s)`) || message.content.startsWith(`:wastebasket: |`) || message.content.startsWith(`!`)) return;
	if (message.channel.name === undefined) {
		serverA_chan.send(botDMs);
		serverB_chan.send(botDMs);
		serverC_chan.send(botDMs);
		console.log(botDMlog);
		if (message.attachments) {
        message.attachments.forEach(a => {
          const urlMessage = `${a.url}`;
          const urlMSGlog = `${a.url}`;
          serverA_chan.send(urlMessage);
          serverB_chan.send(urlMessage);
          serverC_chan.send(urlMessage);
          console.log(`Image de ${message.author.username} sur ${bot.user.username} :\n${urlMessage}`);
        })}
	}
// Discord ServerA/B/C Channels link
	if (message.channel === serverA_chan) {
		var userMSGlog = `>>> ${message.guild.name} <<< Salon #${message.channel.name}\n<${message.author.username}> ${message}\n`;
		serverB_chan.send(userMSG);
		serverC_chan.send(userMSG);
		console.log(userMSGlog);
		if (message.attachments) {
        message.attachments.forEach(a => {
          const urlMessage = `${a.url}`;
          serverB_chan.send(urlMessage);
          serverC_chan.send(urlMessage);
          console.log(`Image de ${message.author.username}\n${urlMessage}`);
        })}
	}
	if (message.channel === serverB_chan) {
		var userMSGlog = `>>> ${message.guild.name} <<< Salon #${message.channel.name}\n<${message.author.username}> ${message}\n`;
		serverA_chan.send(userMSG);
		serverC_chan.send(userMSG);
		console.log(userMSGlog);
		if (message.attachments) {
        message.attachments.forEach(a => {
          const urlMessage = `${a.url}`;
          serverA_chan.send(urlMessage);
          serverC_chan.send(urlMessage);
          console.log(`Image de ${message.author.username}\n${urlMessage}`);
        })}
	}
	if (message.channel === serverC_chan) {
		var userMSGlog = `>>> ${message.guild.name} <<< Salon #${message.channel.name}\n<${message.author.username}> ${message}\n`;
		serverA_chan.send(userMSG);
		serverB_chan.send(userMSG);
		console.log(userMSGlog);
		if (message.attachments) {
        message.attachments.forEach(a => {
          const urlMessage = `${a.url}`;
          serverA_chan.send(urlMessage);
          serverB_chan.send(urlMessage);
          console.log(urlMessage);
        })}
	}
});

/////////////////////////////////////////////////////////////////////////////////////////

bot.login(config.token)
