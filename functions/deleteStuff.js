function deleteStuff(message,prefix,client){

  if (message == undefined) return;
    let count = 0;
    message.channel.fetchMessages({limit: 100})
     .then(messages => {
       let messagesArr = messages.array();
       let messageCount = messagesArr.length;
       for(let i = 0; i < messageCount; i++) {
         messagesArr[i].delete()
          .then(function() {
            count = count + 1;
            if(count >= 100) {
              deleteStuff();
            }
          })
          .catch(function() {
            count = count + 1;
            if(count >= 100) {
              deleteStuff();
            }
          })
       } 
     })
     .catch(function(err) {
       console.log('error thrown');
       console.log(err);
     });

};

module.exports = deleteStuff
