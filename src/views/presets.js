var app = app || {};

$(function() {
	'use strict';

	// Preset Item View
	// --------------

	app.PresetView = Backbone.View.extend({

		tagName:  'li',

		template: _.template( $('#preset-template').html() ),
		
		events: {
			'click .destroy':	'clear',
			'click': 'load'
		},
		
		initialize: function() {
			this.model.on( 'destroy', this.remove, this );
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		},
		
		load: function() {
			metronome.loadPreset(this);
			this.updateLoaded();
		},
		
		updateLoaded: function() {
			$('#preset-list li').removeClass('loaded');
			this.$el.addClass('loaded');
		},
		
		clear: function() {
			this.model.destroy();
		}
	});
});
