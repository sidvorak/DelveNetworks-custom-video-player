var channelID="1a1d7adbb87541acbe1a8987ff0c70e7";
var playerID="limelight_player_779756";
var media_description="";
var media_resources="";
var media_title="";
var started=false;
var intro_title="Introduction";
var intro_description="<p>Introduction text</p>"
var player_html='<h1 id="title">&nbsp;</h1><div id="video"><div id="side_panel"><div id="tabs"><ul><li><a href="#tabs-1">Description</a></li></ul><div id="tabs-1" class="tab"></div></div></div><script src="http://assets.delvenetworks.com/player/embed.js"></script><object type="application/x-shockwave-flash" id="'+playerID+'" name="'+playerID+'" class="LimelightEmbeddedPlayerFlash" width="585" height="380" data="http://assets.delvenetworks.com/player/loader.swf"><param name="movie" value="http://assets.delvenetworks.com/player/loader.swf"/><param name="wmode" value="opaque"/><param name="allowScriptAccess" value="always"/><param name="allowFullScreen" value="true"/><param name="flashVars" value="channelId='+ channelID+'&playerForm=1e1899f751af4b83a9a44205f1ffad4c&deepLink=true&defaultQuality=1200"/></object></div><div id="playlist"><div id="playlist_content"></div></div>';
$(document).ready(function(){
	$("span.LimelightEmbeddedPlayer").html(player_html);
	$("#tabs").tabs();
	});
function delvePlayerCallback (playerId, eventName, data)
{
  var id = playerID;
  var started=0;
  if (eventName == 'onPlayerLoad' && (DelvePlayer.getPlayers() == null || DelvePlayer.getPlayers().length == 0)) 
  {
     DelvePlayer.registerPlayer(id);
  }

  switch(eventName)
  {
		case 'onChannelLoad':
			$('#tabs-1').html("<h1>"+intro_title+"</h1>"+intro_description).show();
			$("h1#title").html(data.title);
			doPlaylist(data);
			var mid=getParameterByName("mediaId");
			if (mid){
				onPlaylistItemClick(mid);
			}
		break;
    	case 'onPlayheadUpdate':
			if(data.positionInMilliseconds > 100 && window.started==false){
				window.started=true;
			 	$('#tabs-1').html("<h1>"+media_title+"</h1>"+media_description).show();
			}
      
      	break;
		case 'onMediaLoad':
	   		media_description=data.description;
			media_title=data.title;
			started=false;
	  	break;
    	case 'onMediaComplete':
			$('#tabs-1').html("<h1>"+intro_title+"</h1>"+intro_description).show();
			$('.play_status').remove();
			window.started=false;
      	break;
		case 'onPlayStateChanged':
			if(data.isPlaying){
					$('.play_status').text('Now Playing');
				}else{
					$('.play_status').text('Paused');
					window.started=false;
					
				}
		break;
  }
}
function doPlaylist(e){
	//create a dynamic playlist of media in the channel
	    if (e.mediaList && e.mediaList.length > 0) {

	    	var playlistHTML = "";

	    	for (var i = 0; i < e.mediaList.length; i++) {
	      		var media = e.mediaList[i];
	      		if (media) {

	      			playlistHTML += '<div class="playlist_item">';
	      			playlistHTML += '<a href="#" onclick="onPlaylistItemClick(\'' + media.id + '\','+i+');"><img width="150" src="' + media.thumbnailUrl + '"/><span id="' + media.id + '">' + media.title + '</span></a></div>';
				}
			}

	        playlistHTML += '<br style="clear:both;" />';
	        document.getElementById('playlist_content').innerHTML = playlistHTML;
					
	    }
}

function onPlaylistItemClick(mediaId) {
    	DelvePlayer.doSetMedia(mediaId, false);
		DelvePlayer.doPlay();
		$('.play_status').remove();
		document.getElementById(mediaId).innerHTML+="<p class='play_status'>Now Playing</p>";
		window.scrollTo(0,0);
  }

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}