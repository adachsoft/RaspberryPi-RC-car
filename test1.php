
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title></title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width">
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
		
	</head>
	<body>

	<div id="gamepadPrompt"></div>
	<div id="gamepadDisplay"></div>
		
	<script>
	var hasGP = false;
	var repGP;
	
	function canGame() {
		return "getGamepads" in navigator;
	}

	function reportOnGamepad() {
		var gp = navigator.getGamepads()[0];
		var html = "";
			html += "id: "+gp.id+"<br/>";
		
		for(var i=0;i<gp.buttons.length;i++) {
			html+= "Button "+(i+1)+": ";
			if(gp.buttons[i].pressed) html+= " pressed";
			html+= "<br/>";
		}
		
		for(var i=0;i<gp.axes.length; i+=2) {
			html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
		}
		
		$("#gamepadDisplay").html(html);
	}
		
	$(document).ready(function() {

		if(canGame()) {

			var prompt = "To begin using your gamepad, connect it and press any button!";
			$("#gamepadPrompt").text(prompt);
			
			$(window).on("gamepadconnected", function() {
				hasGP = true;
				$("#gamepadPrompt").html("Gamepad connected!");
				console.log("connection event");
				repGP = window.setInterval(reportOnGamepad,100);
			});

			$(window).on("gamepaddisconnected", function() {
				console.log("disconnection event");
				$("#gamepadPrompt").text(prompt);
				window.clearInterval(repGP);
			});

			//setup an interval for Chrome
			var checkGP = window.setInterval(function() {
				console.log('checkGP', navigator.getGamepads().length);
				if(navigator.getGamepads()[0]) {
					if(!hasGP) $(window).trigger("gamepadconnected");
					window.clearInterval(checkGP);
				}
			}, 500);
		}
		
	});
	</script>
	</body>
</html>
