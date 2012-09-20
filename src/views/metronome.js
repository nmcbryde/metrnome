var app = app || {};

(function() {
	'use strict';
	
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
				this.model.setBPM($('input#bpm').val());
			}
		});

}());