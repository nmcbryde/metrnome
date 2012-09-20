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

	});

	// Create our global collection of **Todos**.
	app.Presets = new PresetList();

}());
