$(document).ready(function(){
	$("span.LimelightEmbeddedPlayer").html(player_html);
	$("#tabs").tabs();
	});
function delvePlayerCallback (playerId, eventName, data)
{
  var id = "limelight_player_779756";
  var started=0;
  if (eventName == 'onPlayerLoad' && (DelvePlayer.getPlayers() == null || DelvePlayer.getPlayers().length == 0)) 
  {
     DelvePlayer.registerPlayer(id);
  }

  switch(eventName)
  {
		case 'onChannelLoad':
			$("#imageOverlay").show();
			$('#tabs-1').html("<h1>"+intro_title+"</h1>"+intro_description).show();
			$('#tabs-2').html(add_resources).show();
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
				$('#tabs-2').html(media_resources).show();
				$('#imageOverlay').fadeOut('slow');
			}
      
      	break;
		case 'onMediaLoad':
	   		media_description=descriptions[data.refId-1][0] + descriptions[data.refId-1][2];
			media_resources=descriptions[data.refId-1][1] + add_resources;
			media_title=data.title;
			started=false;
	  	break;
    	case 'onMediaComplete':
      		$('#imageOverlay').fadeIn();
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