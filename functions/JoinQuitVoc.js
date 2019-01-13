function JoinQuitVoc(oldMember, newMember) {

  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel
  var serverName = `>>> ${newMember.guild.name||oldMember.guild.name} <<<`;
  if (newMember == undefined) return;
  if (oldUserChannel === undefined || oldUserChannel === null) {
    var newUserVocMsg = `**${newMember.user.username}** s'est connecté au salon vocal **${newUserChannel.name}**`;

    // UserJoin VoiceChannel
    if (newUserChannel !== undefined) {
      var vocChanMSG1 = `**\`${serverName}\`** | ` + newUserVocMsg + ` | **\`${new Date()}\`**`;
      /*
      vocChanLog.send(vocChanMSG1);
      vocChanWanaLog.send(vocChanMSG1);
      */
    // UserLeave VoiceChannel
    } else if (newUserChannel === undefined) {
      var vocChanMSG2 = `**\`${serverName}\`** | ` + newUserOldVocMsg + ` | **\`${new Date()}\`**`;
      /*
      vocChanLog.send(vocChanMSG2);
      vocChanWanaLog.send(vocChanMSG2);
      */    
    }

  } else if ((newUserChannel === undefined) || (newUserChannel === null)) {
    var oldUserVocMsg = `**${oldMember.user.username}** a quitté le salon vocal **${oldUserChannel.name}**`;
    var vocChanMSG3 = `**\`${serverName}\`** | ` + oldUserVocMsg + ` | **\`${new Date()}\`**`;
    /*
    vocChanLog.send(vocChanMSG3);
    vocChanWanaLog.send(vocChanMSG3);
    */
  }

}

module.exports = JoinQuitVoc