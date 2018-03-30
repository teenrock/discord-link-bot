//////////////////////////////////////////////////////////////////////////////////////////
// DCL
/////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("./node_modules/discord.js");
const bot = new Discord.Client({autoReconnect: true, max_message_cache: 0});
const config = require("./conf.json");
const prefix = config.prefix;
/////////////////////////////////////////////////////////////////////////////////////////

bot.on("ready", function() {
	bot.user.setStatus("online");
	console.log("---------------- DCL ----------------");
});

/////////////////////////////////////////////////////////////////////////////////////////
// Link Code
/////////////////////////////////////////////////////////////////////////////////////////

bot.on('message', function(message) {
var serverA_chan = bot.channels.get('423450642451922949'); // Server_chanA ChannelID
var serverB_chan = bot.channels.get('423450887986479107'); // Server_chanB ChannelID
var serverC_chan = bot.channels.get('423450986506485762'); // Server_chanC ChannelID
var botID = bot.users.get('423458755397681152');
var botDMs = `Msg de **${message.author.username}** sur <@${bot.user.id}> : ${message}`;
var userMSG = `**${message.author.username}** : ${message}`;
// Bot DMs Channels Return 
	if (message.author === botID) return;
	if (message.channel.name === undefined) {
		serverA_chan.send(botDMs);
		serverB_chan.send(botDMs);
		serverC_chan.send(botDMs);
		console.log(`${message.author.username} sur  <@${bot.user.id}> : ${message}`);
	}
// Discord ServerA/B/C Channels link
	if (message.channel === serverA_chan) {
		serverB_chan.send(userMSG);
		serverC_chan.send(userMSG);
		console.log(userMSG);
	}
	if (message.channel === serverB_chan) {
		serverA_chan.send(userMSG);
		serverC_chan.send(userMSG);
		console.log(userMSG);
	}
	if (message.channel === serverC_chan) {
		serverA_chan.send(userMSG);
		serverB_chan.send(userMSG);
		console.log(userMSG);
	}
});

/////////////////////////////////////////////////////////////////////////////////////////

bot.login(config.token)
