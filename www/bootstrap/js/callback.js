var socket=io();
var track_globale;

SC.initialize({
              client_id: "ae0eaab89055e29ff15898fa2886b178",
              redirect_uri: "http://music-kicker.herokuapp.com/callback",
              });




socket.on('datas',function(jsonSend){
          socket.emit('me',jsonSend.meData);
          track_globale=jsonSend.trackData;
          
          });

socket.on('head_tracks',function(){
          socket.emit('tracks', track_globale);
          console.log("track_cosket");
          });

socket.on('done',function(idUser){
          console.log("ultimo socket");
          window.location.href = "http://music-kicker.herokuapp.com/log?track_id="+idUser;
          });
socket.on('calling',function(idUser){
          console.log("ultimo socket");
          window.location.href = "http://music-kicker.herokuapp.com/calling?track_id="+idUser;
          });



socket.on('mess_up',function(){
          window.alert("Write again your datas");
          });