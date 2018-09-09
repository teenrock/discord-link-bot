
function cyberunmuteG(message, prefix, bot) {

	bot.channels.forEach(channel => {
        if (linkedChans) {
          let arg = message.content.split(" ");
          channel.send(`!cyberunmute `+ arg[1])
        }

    })
    
}

module.exports = cyberunmuteG;



