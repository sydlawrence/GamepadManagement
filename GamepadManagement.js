/*
 * Polyfill for webkitGamepadConnected/webkitGamepadDisconnected
 * by Joe Lambert (@joelambert)
 */
(function() {
	var knownGamePads = new Array(4);
	
	var poll = setInterval(function(){
		for(var i=0; i<navigator.webkitGamepads.length; i++) {
			var g = navigator.webkitGamepads[i];
			
			// New gamepad
			if(g !== undefined && knownGamePads[i] === undefined) {
				knownGamePads[i] = g;
				
				var evt = document.createEvent("Event");
				evt.initEvent('webkitGamepadConnected', true, true );
				evt.gamepad = g;
				window.dispatchEvent(evt);
			}
			// Gamepad removed
			else if(g === undefined && knownGamePads[i] !== undefined) {
				var evt = document.createEvent("Event");
				evt.initEvent('webkitGamepadDisconnected', true, true );
				evt.gamepad = knownGamePads[i];
				window.dispatchEvent(evt);
				
				knownGamePads[i] = undefined;
			}
		}
	}, 600);
})();


GamepadManagement =  {

	// an array to keep all the connected gamepads	
	gamepads: [],

	// add a new gamepad to the management system
	addGamepad: function(gamepad) {


		// set as the last one as default
		var index = this.gamepads.length;

		// loop through the controllers
		for (var i = 0; i< this.gamepads.length; i++) {

			// find the next available slot
			if (this.gamepads[i] === undefined) {
				index = i;
				break;
			}
		}
		alert("Player "+(index+1) + " has entered the game!");	  
		this.gamepads[index] = gamepad;	
	},

	// remove a gamepad from the 
	removeGamepad: function(gamepad) {

		// get the index of the gamepad
		var index = this.getGamepadIndex(gamepad);

		//hells yes
		alert("Player "+(index+1) + " has left the game!");	  
		this.gamepads[index] = undefined;
	},

	// get the index of the gamepad
	getGamepadIndex: function(gamepad) {

		// loopety loop
		for (var i = 0;i < this.gamepads.length; i++) {

			// if this is the one
			if (gamepad === this.gamepads[i]) {
				return i;
			}
		}	
	},

	// initialise
	init: function() {
		var t = this;

		// when a new gamepad is connected
		function onGamepadConnected(e) {
			t.addGamepad(e.gamepad);
		}

		// when a new gamepad is disconnected
		function onGamepadDisconnected(e) {
			t.removeGamepad(e.gamepad)
		}

		// set up the event listeners
		window.addEventListener("MozGamepadConnected", onGamepadConnected);
		window.addEventListener("MozGamepadDisconnected", onGamepadDisconnected);	

	}	
}

GamepadManagement.init();