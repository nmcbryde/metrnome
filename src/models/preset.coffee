'use strict'


window.app = window.app || {}

# Preset Model
# ----------

window.app.Preset = Backbone.Model.extend
	defaults:
		title: ""
		bpm: 62
