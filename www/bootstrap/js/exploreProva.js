//modifica per velocizzare il download test

// Initialize app
var myApp = new Framework7({
	modalTitle: 'Music Kicker'
	
});
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

$$('.open-left-panel').on('click', function (e) {
       // 'left' position to open Left panel
       myApp.openPanel('left');
   });
   var hPc=0;
   var ug;
   var keepMind=[];
   var socket = io('http://music-kicker.herokuapp.com');
   var personal=0;
   var world=0;
   var lastPlayed=0;
   var singleClickTimer=null;
   var advanceInfo={"loca" : 0, "genre": 0};
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
   var advanceResearch;
   var musicOn=0;
   var clickCount = 0;
   SC.initialize({
                 client_id: "ae0eaab89055e29ff15898fa2886b178",
                 redirect_uri: "http://music-kicker.herokuapp.com/callback1",
                 });


JSO.enablejQuery($);	
var jso = new JSO({
    providerId: "soundcloud",
    client_id: "ae0eaab89055e29ff15898fa2886b178",
    redirect_uri: "http://music-kicker.herokuapp.com/callback1",
    authorization: "https://soundcloud.com/connect?response_type=code_and_token&scope=non-expiring&display=popup"
 
});			 

function getFwork(valore){
	$.get('http://music-kicker.herokuapp.com/tok?token='+valore+'&em='+personal.main[0].email,function(success){
		
			$.get('https://api.soundcloud.com/me.json?oauth_token='+valore,function(cal){
				$.get('https://api.soundcloud.com/me/tracks.json?oauth_token='+valore,function(trac){
					var dat={
						'me' : cal,
						'traccie' : trac
					};
					var pass=JSON.stringify(dat);
					console.log(pass);
					$.ajax({
						
						type: 'POST',
						url:"http://music-kicker.herokuapp.com/usg?em="+personal.main[0].email+'&gen='+personal.main[0].genre_artist,
		   		     
					 data: pass,
		   				contentType: 'application/json',
						processdata: true,
		   		     success: function(ulti){
						personal=ulti;
						myApp.alert('Check Your Profile!');
						
					}
				});
					
				});
				
			});
		
		
	});
	
	
}

				 function soundK(){
					
				
					 if(personal.main[0].iduser==0 || personal.main[0].iduser == null || typeof(personal.main[0].iduser) == 'undefined' ){
					 jso.on('redirect', jso.inappbrowser({"target": "_blank"}) );
					 //console.log(jso.on());
					         
			
			     jso.ajax({
			          url: "https://soundcloud.com/me",
			          
			          dataType: 'json',
			          success: function(data) {
			              myApp.alert("okay");
			              
			          },
					  error: function(){
						  myApp.alert("okay");
					  }
			      });
			 
   
			 }
			 else
			 {
				 myApp.alert("Your Account Is Already Connected With Soundcloud");
			 }
		 };
   
   function chooseFile() {
	   myApp.closePanel()
        myApp.popup('.popup-generic');
		var f={};
        var trip= $('#photoTr').html();
        Mustache.parse(trip);
        var rend_2=Mustache.render(trip,f);
        $('#targetPopup').html(rend_2);
     }
     function handPc1(){
     	//document.getElementById("photo_profile").click();
	hPc=1;
	$('#ll').remove();
	$('#blah').remove();
     }
     function handPc2(){
     	//document.getElementById("photo_back").click();
	hPc=2;
	$('#ll').remove();
	$('#blah').remove();
     }
     function finHandPic(){
	     if(hPc==0){
		     myApp.alert("No Picture loaded");
	     }
	     else if(hPc==1){
		     sendIt();
	     }
	     else
	     {
		     sendIt2();
	     }
	     hPc=0;
	
     }
     function chooseFile3(){
     	   myApp.closePanel()
             myApp.popup('.popup-generic');
     		var f={};
             var trip= $('#finalChange').html();
             Mustache.parse(trip);
             var rend_2=Mustache.render(trip,f);
             $('#targetPopup').html(rend_2);
	     $("#photo_profile").change(function(){
		    // console.log("On Change");
		     readURL(this);
	     });
	     $("#photo_back").change(function(){
		    // console.log("On Change");
		     readURL(this);
	     });
     }
    	 
     function readURL(input) {
	     myApp.showIndicator();
         if (input.files && input.files[0]) {
             var reader = new FileReader();

             reader.onload = function (e) {
		     $('#jj').append('<div id="ll" class="row"><div id="ll" class="col-100" style="position:relative; top:20px;" ><img id="blah" src="" style="width:100%;"/><div id="njk"></div></div></div>');
                 $('#blah').attr('src', e.target.result);
		 $('#njk').append('<a onclick="finHandPic()" class="button"  style="height:60px; border-radius: 0px; color: #FFF; border: 0px solid #FFF; background-color:#DF2A33; font-family:'+'bebas-neue'+'; margin:1em 0px;"><p style="font-size:27px; margin-top:17px;">UPLOAD</p></a>');
             }

             reader.readAsDataURL(input.files[0]);
         }
	 myApp.hideIndicator();
     }
     function chooseFile2() {
         myApp.popup('.popup-generic');
 		var f={};
         var trip= $('#photoPr').html();
         Mustache.parse(trip);
         var rend_2=Mustache.render(trip,f);
         $('#targetPopup').html(rend_2);
  		
       }
	 function sendIt(){
		 myApp.showIndicator();
		 var file = $("#photo_profile")[0].files[0];
		 
		
		 var formdata = new FormData();
		 formdata.append("myFiles", file);
		
		 
		 
		 
		
		 $.ajax({
		     type: 'post',
		     url: 'http://music-kicker.herokuapp.com/post_photo_profile?usId='+personal.main[0].email,
		     data: formdata,
		     contentType: false,
		     processData: false,
		     success: function (datad) {
		       
				 if(datad.result=='okay'){
					if( $('.popup-generic').is(':visible')==true)
						myApp.closeModal('.popup-generic');
					
					 personal.main[0].photo_profile=datad.link;
					 myApp.hideIndicator();
					 loadPart(4);
				 }
				 else
				 {
					 myApp.hideIndicator();
 					if( $('.popup-generic').is(':visible')==true)
 						myApp.closeModal('.popup-generic');
					
					myApp.alert('Something went wrong :( we are sorry try again');
				 }
		     }
		 });
		
		
	 }
	 
	 function sendIt2(){
		 myApp.showIndicator();
		 var file = $("#photo_back")[0].files[0];
		 var formdata = new FormData();
		 formdata.append("myFiles", file);
		 
		 
		 $.ajax({
		     type: 'post',
		     url: 'http://music-kicker.herokuapp.com/post_photo_back?usId='+personal.main[0].email,
		     data: formdata,
		     contentType: false,
		     processData: false,
		     success: function (datad) {
				 console.log(datad.result);
				 if(datad.result=='okay'){
					if( $('.popup-generic').is(':visible')==true)
						myApp.closeModal('.popup-generic');
					
					 personal.main[0].photo_back=datad.link;
					 myApp.hideIndicator();
					 loadPart(4);
				 }
				 else
				 {
					 myApp.hideIndicator();
 					if( $('.popup-generic').is(':visible')==true)
 						myApp.closeModal('.popup-generic');
					
					myApp.alert('Something went wrong :( we are sorry try again');
				 }
		     }
		 });
		 
		
	 }
	 
     kickIn = function () {
         $('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal" style="left:30%; top:30%;"><img src="foto/successfull_kick.png" style=" width:200px;" /></div>');
     };
     kickOut = function () {
         $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
     };
	 function ch(){
		 myApp.closePanel();
		 myApp.showIndicator();
		 if(personal.main[0].iduser !=0){
		 $.get('http://music-kicker.herokuapp.com/changeTracks?id='+personal.main[0].iduser+"&acc_token="+personal.main[0].acc_token,function(data){
			 myApp.alert('Everything is update');
			 $.get('http://music-kicker.herokuapp.com/updateProfile?id='+personal.main[0].iduser,function(data){
				 personal=data;
				 myApp.hideIndicator();
			 	myApp.alert('Everything is update');
			 });
		 });
	 }
	 else
	 {
		 myApp.alert("You can not update 'cause your profile is not linked with soundclud account");
		 hide();
	 }
		
	 }	
	  

				 
				

				 function hide(){
					 myApp.hideIndicator();
					
				 }
				 function loadPart(x){
					 window.scrollTo(0, 0);
				     if(x==0){
				         if(musicOn != 0)
				             musicOn.pause();
					 mainView.router.back();	 
				     var kind={};
				     var temp= $('#proGenres').html();
				     Mustache.parse(temp);
				     var rend = Mustache.render(temp,kind);
				     $('#changeTarget').html(rend);
					 $('#blocco0').css('color','#DF2A33');
					 $('#blocco1').css('color','#fff');
					 $('#blocco2').css('color','#fff');
					 $('#blocco3').css('color','#fff');
					 $('#blocco4').css('color','#fff');
					/* myApp.popover('.popover-genres', '#kickestGenres'); */
				     }
				     if(x==1){
				         if(musicOn != 0)
				             musicOn.pause();
						 window.scrollTo(0, 0);
						 mainView.router.back();
				         var kind={who : rispostaWho.who};
				         var temp= $('#whosnew').html();
				         var rend = Mustache.render(temp,kind);
				         $('#changeTarget').html(rend);
						 $('#blocco1').css('color','#DF2A33');
						 $('#blocco0').css('color','#fff');
						 $('#blocco2').css('color','#fff');
						 $('#blocco3').css('color','#fff');
						 $('#blocco4').css('color','#fff');
				     }
				     if(x==2){
				         if(musicOn != 0)
				             musicOn.pause();
						window.scrollTo(0, 0);
						mainView.router.back();
						 for(var i=0;i<rispostaMusic.music.length;i++){
							 if(rispostaMusic.music[i].title.length >= 17){
								 var string=rispostaMusic.music[i].title;
							 	var res=string.substring(0, 20); 
								
								rispostaMusic.music[i].title=res + "...";
								
							}
						 }
				         var kind={music : rispostaMusic.music};
				         var temp= $('#newmusic').html();
				         var rend = Mustache.render(temp,kind);
				         $('#changeTarget').html(rend);
    					 // myApp.popover('.popover-how', '#kickestSong');
	 					 $('#blocco2').css('color','#DF2A33');
	 					 $('#blocco1').css('color','#fff');
	 					 $('#blocco0').css('color','#fff');
	 					 $('#blocco3').css('color','#fff');
	 					 $('#blocco4').css('color','#fff');
				     }
				     if(x==3){
				         if(musicOn != 0)
				             musicOn.pause();
					 mainView.router.back();
				         var kind={};
				         var temp= $('#adSearch').html();
				         var rend = Mustache.render(temp,kind);
				         $('#changeTarget').html(rend);
						 
						 var kind3={};
						 var temp3=$('#blockMustachGenre').html();
						 var rend3 = Mustache.render(temp3,kind3);
						  $('#listTarget').html(rend3);
	 					 $('#blocco4').css('color','#DF2A33');
	 					 $('#blocco1').css('color','#fff');
	 					 $('#blocco2').css('color','#fff');
	 					 $('#blocco3').css('color','#fff');
	 					 $('#blocco0').css('color','#fff');
				     }
					 if(x==4){
				         if(musicOn != 0)
				             musicOn.pause();
					 mainView.router.back();
						 for(var i=0;i<personal.music.length;i++){
							 if(personal.music[i].title.length >= 17){
								 var string=personal.music[i].title;
							 	var res=string.substring(0, 20); 
								
								personal.music[i].title=res + "...";
								
							}
						 }
				         var kind={'personal': personal.main[0],
					 				'music': personal.music};
				         var temp= $('#profile').html();
				         var rend = Mustache.render(temp,kind);
				         $('#changeTarget').html(rend);
						 
						 
	 					 $('#blocco3').css('color','#DF2A33');
	 					 $('#blocco1').css('color','#fff');
	 					 $('#blocco2').css('color','#fff');
	 					 $('#blocco4').css('color','#fff');
	 					 $('#blocco0').css('color','#fff');
						 $('.backBig').css('background-image','url('+personal.main[0].photo_back+')');
						  var jkl=$('#popo').width();
						  jkl=jkl/2-50;
						  $('#movLe').css('left',jkl);
					 }
    
				 }
				 
		function clearCK()
		{	
			myApp.showIndicator();
			window.localStorage.clear();
			loadPart(0);
			myApp.loginScreen();
			hide();
		};
		
		
				 
				 function listen(event){
					 myApp.showIndicator();
					
					 var con=0;
					  var id= event.target.getAttribute("number");
					 var music = document.getElementById(id);
					 for(var j=0; j < keepMind.length ; j++)
					 {
						 if(keepMind[j]==id){
							 con=1;
						 }
					 }
					 keepMind.push(id);
					 socket.emit('listening',id);
					 if(musicOn!=0)
						 musicOn.pause();
					 if(lastPlayed != id ){
						  $(event.target).css('background-color','rgba(104, 13, 88, 0.50)');
						 musicOn=music;
						 musicOn.addEventListener('canplay', function(){
							 hide();
						 });
						 
						 //hide();
						 //myApp.alert("Wait Music Is Coming!");
						 music.play();
						 if(con==1)
							 hide();
						 rispostaMusic.id=id;
						 socket.emit('listening',id);
						 lastPlayed=id;
					 }
					 else
					 {
						 
						 $(event.target).css('background-color','rgba(255, 255, 255, 0)');
						 hide();
					   lastPlayed=0;
					   music.pause();
					 }
					 
				
				 };	
				 
				 function parsing(event){
					 myApp.showIndicator();
					 var id= event.target.getAttribute("number");
					 console.log(id);
					 console.log(event.target);
					 socket.emit('indexInfo',id);
				 };
				 
				 function vote(event){
					 myApp.showIndicator();
			         var id= event.target.getAttribute("number");
    				 var pack={
						 'email':personal.main[0].email,
						 'song':0
    				 };
			         for(var j=0; j< rispostaMusic.music.length; j++)
			         {
			             if(rispostaMusic.music[j].id_canzone==id){
							 pack.song=rispostaMusic.music[j];
							 
			                 socket.emit('kick',pack);
			                 rispostaMusic.track=j;
			                 break;}
			         }

			     
				 
					
				 }	 
				 
function getGenreb(event){
	myApp.showIndicator();
	    richiesta.genre=event.target.getAttribute("genre");
	    var genre ={"genreName" : event.target.getAttribute("genre")};
	    socket.emit('justGenre',genre);
    
	
					
				 }
				 
				 function picked(){
					 
					var posto= $('#places').val();
					var genere= $('#genreSelection').val();
					if(posto.length != 0){
						 myApp.showIndicator();
						advanceInfo.loca=posto;
						advanceInfo.genre=genere;
						socket.emit('advance',advanceInfo);	
					}
					else 
						myApp.alert('select at least a place');
					
				 }				 
				 
function signIn(){
	myApp.showIndicator();
	var signJson={
		"email" : $('#username').val(),
	 "pass" : $('#password').val()	
	};
	
	$.get("http://music-kicker.herokuapp.com/login?email="+signJson.email+"&pass="+signJson.pass,function(data,status){
		
		if(data.main!=0){
		
			personal=data;
			var p=data.main[0].locality;
			window.localStorage.clear();
			
			window.localStorage.setItem("musicKey" , personal.main[0].email );
			
			socket.emit('whoNew',p);
			myApp.closeModal('.login-screen');
			}
		else
			myApp.alert('Something went wrong try again'); 
		myApp.hideIndicator();
	});
				 };
				 
				 function cg(){
					 console.log('okay');
  $('#location').css('background-image','url()');
};
				 

  

   $( document ).ready(function() {
	   myApp.showIndicator();
   					
   					socket.emit('bestmusic');
					
					var value = window.localStorage.getItem("musicKey");
					
					if(typeof(value) !='undefined' && value !=0 && value !=null )
					{
						myApp.showIndicator();
						loadPart(0);
						$.get('http://music-kicker.herokuapp.com/dati?email='+value,function(success){
							personal=success;
							var p=personal.main[0].locality;
							socket.emit('whoNew',p);
							hide();
							
							
						});
					}
					else
					{
						
						myApp.loginScreen();
						loadPart(0);
					}
                 
                       });
					  
					   
//da qui iniziano tutti i socket in attesa
					   
					   socket.on('respondWhoNew',function(result){
						   console.log("p");
					             rispostaWho.who=result;
					            // loadPart(1);
					             });

					   socket.on('respond',function(result){
					             console.log(result);
					             risposta.result=result;
					             if(result.length > 0){
					   		
					             $('#modalnewdata').modal('show');
					             initializePopup(0);
		  
					             takeBack();}
					             else{
					             window.alert("No result Found make a new research");
					             takeBack();
					             }
					             });

					   socket.on('success',function(combination){
						   if(combination !=0){
						   myApp.hideIndicator();
						   kickIn();
						   setTimeout(function(){
							   kickOut();
						   },1000);
						   		//myApp.alert('You have kicked a Song , kick other songs!');
					             rispostaMusic.music[rispostaMusic.track].kick=combination;
								 for(var i=0;i<personal.music.length;i++)
								 {
									 var je=personal.music[i].id_canzone;
									 
									 var kr=rispostaMusic.music[rispostaMusic.track].id_canzone;
									 
									 if(je==kr){
										 personal.main[0].kick=personal.main[0].kick+1;
										 break;
									 }
								 }
								 
							 }
							 else
							 {
								 myApp.hideIndicator();
								 myApp.alert("You Have Already Kicked This Song!");
							 }
          
					             });

					   socket.on('respondGenre',function(result){
					             rispostaGenre.result=result;
					             if(result.length > 0){
									 myApp.hideIndicator();
					              myApp.popup('.popup-generic');
		                          var trip= $('#listgenre').html();
		                          Mustache.parse(trip);
		                          var rend_2=Mustache.render(trip,rispostaGenre);
		                          $('#targetPopup').html(rend_2);
					             }
					             else{
									 myApp.alert('No artist found , please make a new research');
									 hide();
								 }
					             });

					   socket.on('respondBestMusic',function(result){
						   
					             rispostaMusic.music=result;
						     hide();
          
					             });
						socket.on('callback',function(contenitore){
							
							if( $('.popup-generic').is(':visible')==true)
								myApp.closeModal('.popup-generic');
							var dynamicPageIndex=0;
							mainView.router.loadContent(
							    $('#myPage').html()
								
							    );
								
	   						 for(var i=0;i<contenitore.music.length;i++){
	   							 if(contenitore.music[i].title.length >= 17){
	   								 var string=contenitore.music[i].title;
	   							 	var res=string.substring(0, 20); 
	   								
	   								contenitore.music[i].title=res + "...";
								
	   							}
	   						 }
							 console.log(contenitore.music);
			         var kind={'personal': contenitore.info[0],
				 				'music': contenitore.music};
			         var temp= $('#profile').html();
			         var rend = Mustache.render(temp,kind);
					  $('#loadPag').html(rend);
					  $('.backBig').css('background-image','url('+contenitore.info[0].photo_back+')');
					  var jkl=$('#popo').width();
					  jkl=jkl/2-50;
					  $('#movLe').css('left',jkl);
					  hide();
								 });
								 socket.on('dataBackss',function(backData){
									 myApp.hideIndicator();
									 console.log(backData);
									 advanceResearch=backData;
									 if(advanceResearch.first !=0 )
									 {
   						              //myApp.popup('.popup-generic');
   			                          var trip= $('#adTemp').html();
									  var cj={'result':advanceResearch.first};
   			                          Mustache.parse(trip);
   			                          var rend_2=Mustache.render(trip,cj);
   			                          $('#adTarget').html(rend_2);
									 }
									 else if(advanceResearch.sec !=0 )
									 {
      						              //myApp.popup('.popup-generic');
      			                          var trip= $('#adTemp').html();
   									  var cj={'result':advanceResearch.sec};
      			                          Mustache.parse(trip);
      			                          var rend_2=Mustache.render(trip,cj);
      			                          $('#adTarget').html(rend_2);
									 }
									 else if(advanceResearch.thi !=0 )
									 {
  						              //myApp.popup('.popup-generic');
  			                          var trip= $('#adTemp').html();
								  var cj={'result':advanceResearch.thi};
  			                          Mustache.parse(trip);
  			                          var rend_2=Mustache.render(trip,cj);
  			                          $('#adTarget').html(rend_2);
								  }
								 else if(advanceResearch.four !=0 )
								 {
					              //myApp.popup('.popup-generic');
		                          var trip= $('#adTemp').html();
							  var cj={'result':advanceResearch.four};
		                          Mustache.parse(trip);
		                          var rend_2=Mustache.render(trip,cj);
		                          $('#adTarget').html(rend_2);
							  }
							 else if(advanceResearch.fifth !=0 )
							 {
				              //myApp.popup('.popup-generic');
	                          var trip= $('#adTemp').html();
						  var cj={'result':advanceResearch.fifth};
	                          Mustache.parse(trip);
	                          var rend_2=Mustache.render(trip,cj);
	                          $('#adTarget').html(rend_2);
						  }
								  
						         
						             else{
										 myApp.alert('No artist found , please make a new research');
									 }
									
								 });
								 
								 
					
								 