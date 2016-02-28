//modifica per velocizzare il download test

// Initialize app
var myApp = new Framework7();
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

var socket = io();
var world=0;
var richiesta={"genre" : 0,
    "googleJson" : 0,
    "selettore" : 0};
var risposta={
    "numberTrack" : 0,
    "result" : 0
};

var rispostaWho={
    "who":0
};

var rispostaGenre={
    "result":0,
    "numberTrack":0
};
var rispostaMusic={
    "music":0,
    "track":0,
    "id":0
};
var musicOn=0;
var clickCount = 0;
SC.initialize({
              client_id: "ae0eaab89055e29ff15898fa2886b178",
              redirect_uri: "http://music-kicker.herokuapp.com/callback",
              });

function getCookies() {
    var c = document.cookie, v = 0, cookies = {};
    if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
        c = RegExp.$1;
        v = 1;
    }
    if (v === 0) {
        c.split(/[,;]/).map(function(cookie) {
                            var parts = cookie.split(/=/, 2),
                            name = decodeURIComponent(parts[0].trimLeft()),
                            value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
                            cookies[name] = value;
                            });
    } else {
        c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
                                                                                                                                                   var name = $0,
                                                                                                                                                   value = $1.charAt(0) === '"'
                                                                                                                                                   ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
                                                                                                                                                   : $1;
                                                                                                                                                   cookies[name] = value;
                                                                                                                                                   });
    }
    return cookies;
}
var cook= getCookies()["i"];


function kick(event){
    var id= event.target.getAttribute("number");

    for(var j=0; j< rispostaMusic.music.length; j++)
    {
        if(rispostaMusic.music[j].id_canzone==id){
    socket.emit('kick',rispostaMusic.music[j]);
            rispostaMusic.track=j;
            break;}
    }
}

function listenTry(event){
    if(musicOn != 0)
    musicOn.stop();
    var id= event.target.getAttribute("number");
    rispostaMusic.id=id;
    SC.stream("/tracks/"+id, function(sound){
              musicOn=sound;
              sound.play();
              });
    socket.emit('listening',id);
}

function listen(event){
    clickCount++;
	window.alert("listen works");
    if (clickCount === 1) {
       var singleClickTimer = setTimeout(function() {
			window.alert("one click work");
                                      clickCount = 0;
                                      if(musicOn != 0)
                                      musicOn.stop();
                                      var id= event.target.getAttribute("number");
                                      rispostaMusic.id=id;
                                      SC.stream("/tracks/"+id, function(sound){
                                                musicOn=sound;
                                                sound.play();
                                                });
                                      socket.emit('listening',id);

                                      }, 400);
    } else if (clickCount === 2) {
		window.alert("one click work");
        clearTimeout(singleClickTimer);
        clickCount = 0;
        var id= event.target.getAttribute("number");
        
        for(var j=0; j< rispostaMusic.music.length; j++)
        {
            if(rispostaMusic.music[j].id_canzone==id){
                socket.emit('kick',rispostaMusic.music[j]);
                rispostaMusic.track=j;
                break;}
        }

    }
    /* if(musicOn != 0)
        musicOn.stop();
     var id= event.target.getAttribute("number");
    rispostaMusic.id=id;
    SC.stream("/tracks/"+id, function(sound){
              musicOn=sound;
              sound.play();
              });
    socket.emit('listening',id);
     
     */
    
   /* var kind={embed : id};
    var temp= $('#popscript').html();
    var rend = Mustache.render(temp,kind);
    $('#popTarget').html(rend);
     $('#mediaPopup').modal('show');
    */

}

function loadPart(x){
    if(x==0){
        if(musicOn != 0)
            musicOn.stop();
    var kind={};
    var temp= $('#proGenres').html();
    Mustache.parse(temp);
    var rend = Mustache.render(temp,kind);
    $('#downDrop').html(rend);
    }
    if(x==1){
        if(musicOn != 0)
            musicOn.stop();
        var kind={who : rispostaWho.who};
        var temp= $('#whosnew').html();
        var rend = Mustache.render(temp,kind);
        $('#downDrop').html(rend);
    }
    if(x==2){
        if(musicOn != 0)
            musicOn.stop();
        var kind={music : rispostaMusic.music};
        var temp= $('#newmusic').html();
        var rend = Mustache.render(temp,kind);
        $('#downDrop').html(rend);
    
    }
    if(x==4){
        if(musicOn != 0)
            musicOn.stop();
        var kind={};
        var temp= $('#newSearch').html();
        var rend = Mustache.render(temp,kind);
        $('#downDrop').html(rend);
        
        autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('autocomplete2'));
        google.maps.event.addListener(autocomplete2, 'place_changed', function() {
                                      var place = autocomplete2.getPlace();
                                      console.log(place.address_components);
                                      world = place.address_components;
                                      });
        var genre ={"genreName" : "Pick A Genre"};
        var temp= $('#changeGenre').html();
        Mustache.parse(temp);
        var rend = Mustache.render(temp,genre);
        $('#changeTarget').html(rend);
        
        var kindIn={"kindPlace" : "Pick the Research"};
        var trip= $('#changePlace').html();
        Mustache.parse(trip);
        var rend_2=Mustache.render(trip,kindIn);
        $('#placeTarget').html(rend_2);

        
    }
    
}
function whosnewfunc(event){
   var id= event.target.getAttribute("number");
    console.log(id);
    for (var j=0; j < rispostaWho.who.length ; j++ ){
        if(rispostaWho.who[j].iduser==id){
            console.log(rispostaWho.who[j]);
            var kind={user : rispostaWho.who[j]};
            var temp= $('#modalnew').html();
            var rend = Mustache.render(temp,kind);
            $('#modalWhoContent').html(rend);
             $('#space').css('background-image', 'url('+ rispostaWho.who[j].photo_back + ')');
            $('#modalnewdata').modal('show');

        }
        
            }
}



function selected(event){
    
    $('#clock1').css("background-color","black");
    $('#clock2').css("background-color","black");
    $('#clock3').css("background-color","black");
    $('#clock4').css("background-color","black");
    var idBlock=event.target;
    console.log(idBlock.id);
    if(idBlock.id == "genreBlock")
    {
    $('#clock1').css("background-color","#CA393E");
        loadPart(0);
    }else if(idBlock.id == "whatBlock"){
        $('#clock2').css("background-color","#CA393E");
        //socket.emit('whoNew');
        loadPart(1);
    }
    else if(idBlock.id == "popBlock"){
        $('#clock3').css("background-color","#CA393E");
        //socket.emit('bestmusic');
		loadPart(2);
        console.log("okay");
    
    }
    else if(idBlock.id == "clock1")
    {
        $(idBlock).css("background-color","#CA393E");
        loadPart(0);
    }else if(idBlock.id == "clock2"){
        $('#clock2').css("background-color","#CA393E");
        //socket.emit('whoNew');
		loadPart(1);

    }else if(idBlock.id == "clock3"){
        $('#clock3').css("background-color","#CA393E");
        //socket.emit('bestmusic');
		loadPart(2);
    
    }else if(idBlock.id == "popBlock"){
        $(idBlock).css("background-color","#CA393E");
        //socket.emit('bestmusic');
		loadPart(2);
    }
    else
    {
        $('#clock4').css("background-color","#CA393E");
        loadPart(4);
    }
    
}

function getGenre(event){
    var genre ={"genreName" : event.target.getAttribute("genre")};
    richiesta.genre=genre.genreName;
    var temp= $('#changeGenre').html();
    Mustache.parse(temp);
    var rend = Mustache.render(temp,genre);
    $('#changeTarget').html(rend);
    
    
};

function getGenreb(event){
    richiesta.genre=event.target.getAttribute("genre");
    var genre ={"genreName" : event.target.getAttribute("genre")};
    $('#modalQuestion').modal('show');
    //socket.emit('justGenre',genre);
    
};

function nope(){
    socket.emit('justGenre',richiesta.genre);
     $('#modalQuestion').modal('hide');
};

function getKind(event){
    var kind =  {"kindPlace" : event.target.getAttribute("place")};
    richiesta.selettore=kind.kindPlace;
    var temp= $('#changePlace').html();
    Mustache.parse(temp);
    var rend = Mustache.render(temp,kind);
    $('#placeTarget').html(rend);

};

function send(){
    $('#modalQuestion').modal('hide');
    if(richiesta.selettore == 0 && richiesta.googleJson !=0){
        
        window.alert("Inserisci Il Tipo Di Ricerca");
    
        
    
    }else {
        richiesta.googleJson=world;
        socket.emit('request',richiesta);

    }
};

function initializePopup(num){
    var kind={who : risposta.result[num]};
    var temp= $('#modalSearch').html();
    Mustache.parse(temp);
    var rend = Mustache.render(temp,kind);
    $('#modalWhoContent').html(rend);
    $('#space').css('background-image', 'url('+ risposta.result[num].photo_back + ')');

};
function completeAll(){
    var kind={who : rispostaGenre.result};
    var temp= $('#modalcomplete').html();
    Mustache.parse(temp);
    var rend = Mustache.render(temp,kind);
    $('#modalWhoContent').html(rend);
   // $('#space').css('background-image', 'url('+ risposta.result[num].photo_back + ')');
	
}

function initializeGenre(num){
    var kind={who : rispostaGenre.result[num]};
    var temp= $('#modalGenre').html();
    Mustache.parse(temp);
    var rend = Mustache.render(temp,kind);
    $('#modalWhoContent').html(rend);
    $('#space').css('background-image', 'url('+ rispostaGenre.result[num].photo_back + ')');
    
};

function next(){
    var lengthRisposta=risposta.result.length-1;
    console.log(lengthRisposta);
    if(risposta.numberTrack < lengthRisposta ){
        risposta.numberTrack += 1;
        initializePopup(risposta.numberTrack);
    }
    else{
        window.alert("No more songs make a new research");
        
    }
};
function back(){
    if(risposta.numberTrack > 0 ){
        risposta.numberTrack -= 1;
        initializePopup(risposta.numberTrack);
    }
    else{
        
        
    }
};

function nextGenre(){
    var lengthRisposta=rispostaGenre.result.length-1;
    console.log(lengthRisposta);
    if(rispostaGenre.numberTrack < lengthRisposta ){
        rispostaGenre.numberTrack += 1;
        initializeGenre(rispostaGenre.numberTrack);
    }
    else{
        window.alert("No more songs make a new research");
        
    }
};
function backGenre(){
    if(rispostaGenre.numberTrack > 0 ){
        rispostaGenre.numberTrack -= 1;
        initializeGenre(rispostaGenre.numberTrack);
    }
    else{
        
        
    }
};

function takeBack(){
    var genre ={"genreName" : "Pick A Genre"};
    var temp= $('#changeGenre').html();
    Mustache.parse(temp);
    var rend = Mustache.render(temp,genre);
    $('#changeTarget').html(rend);
    
    var kindIn={"kindPlace" : "Pick the Research"};
    var trip= $('#changePlace').html();
    Mustache.parse(trip);
    var rend_2=Mustache.render(trip,kindIn);
    $('#placeTarget').html(rend_2);
    richiesta.genre=0;
    richiesta.googleJson=0;
    richiesta.selettore=0;
    world=0;
    $('#place').val("");
    $('#autocomplete2').val("");
    
}

$( document ).ready(function() {
					socket.emit('whoNew');
					socket.emit('bestmusic');
                    var genre ={"genreName" : "Pick A Genre"};
                    var temp= $('#changeGenre').html();
                    Mustache.parse(temp);
                    var rend = Mustache.render(temp,genre);
                    $('#changeTarget').html(rend);
                    
                    var kindIn={"kindPlace" : "Location"};
                    var trip= $('#changePlace').html();
                    Mustache.parse(trip);
                    var rend_2=Mustache.render(trip,kindIn);
                    $('#placeTarget').html(rend_2);
                    
                    loadPart(0);
                    $('#clock1').css("background-color","#CA393E");
                    if(typeof cook != 'undefined' && cook !='' && cook !=0){
                    
                    $('#checkId').html('<a href="http://music-kicker.herokuapp.com/index"><p class="frutiger">PROFILE PAGE</p></a>');
                            }
							
					
                    });

socket.on('respondWhoNew',function(result){
          rispostaWho.who=result;
         // loadPart(1);
          });

socket.on('respond',function(result){
          console.log(result);
          risposta.result=result;
          if(result.length > 0){
		d
          $('#modalnewdata').modal('show');
          initializePopup(0);
		  
          takeBack();}
          else{
          window.alert("No result Found make a new research");
          takeBack();
          }
          });

socket.on('success',function(combination){
          
          window.alert("SUCCESS");
          rispostaMusic.music[rispostaMusic.track].kick=combination;
          
          
          });

socket.on('respondGenre',function(result){
          rispostaGenre.result=result;
          if(result.length > 0){
          //initializeGenre(0);
		  
          $('#modalnewdata').modal('show');
		  completeAll();
          }
          else{
          window.alert("No result Found make a new research");}
          });

socket.on('respondBestMusic',function(result){
          rispostaMusic.music=result;
         // loadPart(2);
          
          });