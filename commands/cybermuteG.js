
function cybermuteG(message, prefix, bot) {

	bot.channels.forEach(channel => {
        if (linkedChans) {
          let arg = message.content.split(" ");
          channel.send(`!cybermute `+ arg[1])
        }
        
    })

}

module.exports = cybermuteG;



