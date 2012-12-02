var app = app || {};

(function() {
	'use strict';
	
	app.MetronomeView = Backbone.View.extend({
			
			model: new app.Metronome(),
			
			el: "#metronome",
			template: _.template( $('#metronome-template').html() ),

			events: {
				'click .start':	'start',
				'click .stop':	'stop',
				'slidechange #slider': 'sliderSetBpm',
				'click #new-preset': 'createPreset'
			},
			
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
				
				this.setupSlider();
			},
			
			setupSlider: function() {
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
				
				this.checkPrompt();
			},
			
			checkPrompt: function () {
				// show the prompt if there are no presets loaded
				if (app.Presets.length == 0) {
					$('.preset-form .prompt').show();
				} else {
					$('.preset-form .prompt').hide();
				}
			},
			
			addOne: function ( preset ) {
				var view = new app.PresetView({ model: preset });
				$('#preset-list').append( view.render().el );
				this.checkPrompt();
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
				window.location = "export.php?json=" + app.Presets.toExportString();
			},
			
			loadPresets: function( string ) {
				app.Presets.fromExportString( string );
			}
			
		});
		
}());