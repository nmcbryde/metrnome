var app = app || {};
var sound =	 new Audio("/assets/sound/tick.mp3");

(function() {
	'use strict';

	// Metronome Model
	// ----------
	app.Metronome = Backbone.Model.extend({

		defaults: {
			bpm: 62,
			timer: null,
		},
		
		tick: function() {
			sound.play();
		},
		
		start: function() {
			this.tick();
			this.set('timer', window.setInterval(this.tick, 60000/this.get('bpm')));
		},
		
		stop: function() {
			window.clearInterval(this.get('timer'));
			this.set('timer', null);
		},
		
		getStatus: function() {
			return this.get('timer') === null ? "stopped" : "started"
		},
		
		setBPM: function(bpm) {
			this.set('bpm', bpm);
			
			if ( this.getStatus() == "started" ) {
				this.stop();
				this.start();
			}
		}
	});

}());
