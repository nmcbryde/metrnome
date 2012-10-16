window.app = window.app || {};

(function() {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var PresetList = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: window.app.Preset,

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
		},
		
		toExportString: function() {
			var string = "";
			this.map( function( preset ) {
				string += preset.get('title') + "=" + preset.get('bpm') + ",";
			});
			
			return string;
		},
		
		// load in presets from a file. Wipes existing presets
		fromExportString: function( string ) {
			var presets = string.split("\n");
			var _this = this;
			
			_.each( presets, function( preset ) {
				if ( preset.trim() ) {
					var args = {
						title: preset.split("=")[0],
						bpm: preset.split("=")[1]
					}
					_this.create( new window.app.Preset (args) );
				}
			})
		},
		
		loadFile: function ( string ) {
			// Use text input for now
			// TODO - make upload function with php
			console.log (window.location = 'file:///' + string);
		}
		
	});

	// Create our global collection of **Todos**.
	window.app.Presets = new PresetList();

}());
