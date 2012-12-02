var app = app || {};

(function() {
	'use strict';

	// Preset Collection
	// ---------------
	var PresetList = Backbone.Collection.extend({

		model: app.Preset,

		localStorage: new Store('presets-backbone'),
		
		toExportString: function() {
			var string = "";
			this.map( function( preset ) {
				string += preset.get('title') + "=" + preset.get('bpm') + ",";
			});
			
			return string;
		},
		
		// loads in presets from text input
		fromExportString: function( string ) {
			var presets = string.split("\n");
			var _this = this;
			
			_.each( presets, function( preset ) {
				if ( preset.trim() ) {
					var args = {
						title: preset.split("=")[0],
						bpm: preset.split("=")[1]
					}
					_this.create( new app.Preset (args) );
				}
			})
		}
	});
	
	app.Presets = new PresetList();

}());
