'use strict'

window.app = window.app || {}


# Metronome Model
# ----------
window.app.Metronome = Backbone.Model.extend
	defaults:
		bpm: 62
		timer: null

	tick: ->
		window.sound.play()
	
	start: ->
		this.set('timer', window.setInterval(this.tick, 60000/this.get('bpm')))
	
	stop: ->
		window.clearInterval(this.get('timer'))
		this.set('timer', null)
	
	getStatus: ->
		if this.get('timer') is null
			"stopped"
		else
			"started"
	
	setBPM: (bpm) ->
		this.set('bpm', bpm)
		
		if this.getStatus() == "started"
			this.stop()
			this.start()