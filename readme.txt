DelveNetworks Custom Video Player Documentation

Description
================================================
The javascript based video player takes a Delve Networks channelID and then displays the videos in an integrated video player.  

Installation
================================================
Step 1: In the <head> section of the HTML page, link to the JQuery UI css file, JQuery and JQuery UI scripts provided by Google. 
	<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
	
Step 2: Include the player.js script and css files.
	<script src="script/player.js" type="text/javascript"></script>
	<link rel="stylesheet" href="css/css.css" type="text/css" media="screen" title="no title" charset="utf-8">
	
Step 3:
	Place a span element with a class of within the <body> element of the HTML page where you would like the tour to appear.
	<span class="LimelightEmbeddedPlayer"> </span>
	
Step 4:
	Change the channelID variable at the top of the player.js file to that of the Limelight channel you wish to show.
	
	
Contact
================================================
Academic Technology Services, 7/18/2012
Simon Dvorak (sidvorak@ucdavis.edu)



