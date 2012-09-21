var app = app || {};

$(function() {
	'use strict';

	// Todo Item View
	// --------------

	// The DOM element for a todo item...
	app.PresetView = Backbone.View.extend({

		//... is a list tag.
		tagName:  'li',

		// Cache the template function for a single item.
		template: _.template( $('#preset-template').html() ),

		// The DOM events specific to an item.
		events: {
			'click .destroy':	'clear',
			'click': 'load'
		},
		
		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function() {
			this.model.on( 'destroy', this.remove, this );
		},

		// Re-render the titles of the todo item.
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
		
		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function() {
			this.model.destroy();
		}
	});
});
