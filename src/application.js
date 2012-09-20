var app = app || {};
var sound =	 new Audio("/metronome/assets/wav/tick.wav");

(function() {
	'use strict';
	
	app.Metronome = Backbone.Model.extend({

		// Default attributes for the metronome
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			bpm: 62,
			timer: null
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
	
	
	app.MetronomeView = Backbone.View.extend({
			
			model: new app.Metronome(),
			
			el: "#metronome",

			// Cache the template function for a single item.
			template: _.template( $('#metronome-template').html() ),

			// The DOM events specific to an item.
			events: {
				'click .start':	'start',
				'click .stop':	'stop',
				'slidechange #slider': 'setBpmOnEnter'
			},
			
			// The TodoView listens for changes to its model, re-rendering. Since there's
			// a one-to-one correspondence between a **Todo** and a **TodoView** in this
			// app, we set a direct reference on the model for convenience.
			initialize: function() {
				this.model.on( 'change', this.render, this );
				this.render();
			},
			
			validate: function(attrs) {
		    if (attrs.bpm < 40 || attrs.bpm > 210) {
		      return "Beats per minute must be greater than 40 and less than 210";
		    }
		  },

			// Re-render the titles of the todo item.
			render: function() {
				var template_data = _.extend({
					status: this.model.getStatus()
				}, this.model.toJSON());
				
				this.$el.html( this.template( template_data ) );
				
				$( "#slider" ).slider({
					value: this.model.get('bpm'),
					min: 40,
					max: 210,
					step: 2,
					slide: function( event, ui ) {
						$( "#bpm" ).val( + ui.value );
					}
				});
				
				$( "#bpm" ).val( $( "#slider" ).slider( "value" ) );
				
			},
			
			start: function() {
				this.model.start();
			},
			
			stop: function() {
				this.model.stop();
			},
			
			setBpmOnEnter: function( e ) {
				console.log($('input#bpm').val())
				this.model.setBPM($('input#bpm').val());
				
			}
		});

}());


jQuery(function($) {

  // Initialize your application here.
	metronome = new app.MetronomeView();
	
});


