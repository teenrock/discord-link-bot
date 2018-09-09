function presUpdate(oldMember, newMember) {

  if (newMember.presence.status == oldMember.presence.status) return;
  var presUpdateMsg = ` **${oldMember.user.username}** est passé(e) de **${oldMember.presence.status}** à **${newMember.presence.status}**`;
  var presUpdateLog = ` ${oldMember.user.username} est passé(e) de ${oldMember.presence.status} à ${newMember.presence.status}`;
  var serverName = ` >>> ${newMember.guild.name||oldMember.guild.name} <<< `;
  var presenceMSG1 = `**\`${serverName}\`** | ` + presUpdateMsg + ' ** / invisible** |' + ` **\`${new Date()}\`**`;
  var presenceMSG2 = `**\`${serverName}\`** | ` + presUpdateMsg + ` | **\`${new Date()}\`**`;
  
  if (newMember.presence.status == 'offline') {
    /*
    usersStatChan.send(presenceMSG1);
    usersStatChanWana.send(presenceMSG1);
    console.log(presUpdateLog + ' / invisible' + ' sur' + serverName + '\n');
    */  
  } else {
    /*
    usersStatChan.send(presenceMSG2);
    usersStatChanWana.send(presenceMSG2);
    console.log(presUpdateLog + ' sur' + serverName + '\n');
    */  
  }

}

module.exports = presUpdate