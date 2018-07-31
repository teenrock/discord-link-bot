function linkedChans_file(bot, channel, fs) {

  lettersChoice = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  serverA = undefined;
  serverB = undefined;
  serverC = undefined;
  serverD = undefined;
  serverE = undefined;
  serverF = undefined;
  serverG = undefined;
  serverH = undefined;
  serverI = undefined;
  serverJ = undefined;
  serverK = undefined;
  serverL = undefined;
  serverM = undefined;
  serverN = undefined;
  serverO = undefined;
  serverP = undefined;
  serverQ = undefined;
  serverR = undefined;
  serverS = undefined;
  serverT = undefined;
  serverU = undefined;
  serverV = undefined;
  serverW = undefined;
  serverX = undefined;
  serverY = undefined;
  serverZ = undefined;

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

  linkedChannels = [serverA, serverB, serverC, serverD, serverE, serverF, serverG, serverH, serverI, serverJ, serverK, serverL, serverM, serverN, serverO, serverP, serverQ, serverR, serverS, serverT, serverU, serverV, serverW, serverX, serverY, serverZ]
  linkedChans = (channel==serverA)||(channel==serverB)||(channel==serverC)||(channel==serverD)||(channel==serverE)||(channel==serverF)||(channel==serverG)||(channel==serverH)||(channel==serverI)||(channel==serverJ)||(channel==serverK)||(channel==serverL);
  console.log('\n')

}

module.exports = linkedChans_file