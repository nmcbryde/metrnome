var app = app || {};

(function() {
	'use strict';

	// Preset Model
	// ----------
	app.Preset = Backbone.Model.extend({

		defaults: {
			title: "",
			bpm: 62
		},
		
		toString: function() {
			return " test ";
		}
	});

}());
