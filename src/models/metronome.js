var app = app || {};

(function() {
	'use strict';

	// Metronome Model
	// ----------
	app.Metronome = Backbone.Model.extend({

		defaults: {
			bpm: 62,
			timer: null,
			tickSound: null,
			soundManager: soundManager.setup({
			  url: '/metronome/assets/flash/',
			  onready: function() {
			    // Ready to use; soundManager.createSound() etc. can now be called.
					var tickSound = soundManager.createSound({
			      id: 'tick',
			      url: '/metronome/assets/wav/tick.wav'
			    });
			  }
			}),
		},
		
		tick: function() {
			//sound.play();
			//testSound = this.get('soundManager');
			metronome.model.get('soundManager').play('tick');
			
		},
		
		start: function() {
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
