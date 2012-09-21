var app = app || {};

(function() {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var PresetList = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: app.Preset,

		// Save all of the todo items under the `"todos"` namespace.
		localStorage: new Store('presets-backbone'),
		
		
		nextOrder: function() {
			if ( !this.length ) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		// Todos are sorted by their original insertion order.
		comparator: function( preset ) {
			return preset.get('order');
		}
		
	});

	// Create our global collection of **Todos**.
	app.Presets = new PresetList();

}());
