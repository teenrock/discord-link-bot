function linkedChans_file(bot, channel, fs, lettersChoice) {

  serverA = undefined;
  serverB = undefined;
  serverC = undefined;
  serverA1 = undefined;
  serverB1 = undefined;
  serverC1 = undefined;
  serverA2 = undefined;
  serverB2 = undefined;
  serverC2 = undefined;

  lettersChoice.forEach(servLetter=> {
  	var file = fs.existsSync("./linkedChans/server" + servLetter + ".js")
    var server = 'server' + servLetter;

    if (!file) {
      console.log(' Server ' + servLetter + ' [LinkedChannel File Configuration] does not exist for this server.');

  	} else {
  	  var server = require(`./server${servLetter}.js`);
      server(bot)      
      console.log(' Server ' + servLetter + ' [LinkedChannel File Configuration] for this server has been found.');

  	}

  })
  
  linkedChannels = [serverA, serverB, serverC, serverA1, serverB1, serverC1, serverA2, serverB2, serverC2]
  linkedChans = (channel==serverA)||(channel==serverB)||(channel==serverC)||(channel==serverA1)||(channel==serverB1)||(channel==serverC1)||(channel==serverA2)||(channel==serverB2)||(channel==serverC2);
  console.log('\n')

}

module.exports = linkedChans_file