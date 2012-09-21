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
				'slidechange #slider': 'sliderSetBpm',
				'click #new-preset': 'createPreset'
			},
			
			// The TodoView listens for changes to its model, re-rendering. Since there's
			// a one-to-one correspondence between a **Todo** and a **TodoView** in this
			// app, we set a direct reference on the model for convenience.
			initialize: function() {
				this.model.on( 'change', this.render, this );
				this.render();
				
				window.app.Presets.on( 'reset', this.addAll, this );
				window.app.Presets.on( 'add', this.addOne, this );
				
				app.Presets.fetch();
			},
			
			validate: function(attrs) {
		    if (attrs.bpm < 40 || attrs.bpm > 210) {
		      return "Beats per minute must be greater than 40 and less than 210";
		    }
		  },

			render: function() {
				var template_data = _.extend({
					status: this.model.getStatus()
				}, this.model.toJSON() );
				
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
			
			sliderSetBpm: function( e ) {
				$('#preset-list li').removeClass('loaded');
				this.model.setBPM($('input#bpm').val());
			},
			
			newAttributes: function () {
				return {
					title: $('input#title').val(),
					bpm: $('input#bpm').val()
				}
			},
			
			addAll: function() {
				this.$('#preset-list').html('');
				app.Presets.each(this.addOne, this);
			},
			
			addOne: function ( preset ) {
				var view = new app.PresetView({ model: preset });
				$('#preset-list').append( view.render().el );
			},
			
			loadPreset: function ( preset ) {
				this.model.setBPM(preset.model.get('bpm'));
			},
			
			createPreset: function ( preset ) {
				if ($('input#title').val().trim()) {
					app.Presets.create( this.newAttributes() );
				} else {
					$('input#title').focus();
				}
				$('input#title').val('');
			},
			
			exportPresets: function () {
				var presets_data = app.Presets.map( function( preset ) {
					return preset.get('title') + "|" + preset.get('bpm') + "\n";
				});
				
				window.location = "export.php?json=" + presets_data;
			}
		});
		
}());