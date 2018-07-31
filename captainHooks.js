// Thx a lot to Brahim & RedFish for their help ! <3
function captainHooks(Discord, fs) {

  hooksList = [];

  var hooksFolder = './hooks/';
  
  fs.readdirSync(hooksFolder).forEach(file => {
    if (file != 'captainHooks.js') {
      var rx = /hook(.*)\.js/g;
      var arr = rx.exec(file);
      var hookFile = hooksFolder + file;
      HOOK = require(hookFile)
      HOOK
      hooksList.push(HOOK)
    }
  })
  
}

module.exports = captainHooks