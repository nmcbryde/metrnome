'use strict'

window.app = window.app || {}


# Metronome Model
# ----------
window.app.Metronome = Backbone.Model.extend
	defaults:
		bpm: 62
		timer: null
		ticksound: null
		soundManager: soundManager.setup({
			url: '/assets/flash/'
			onready: ->
				tickSound = soundManager.createSound({
					id: 'tick'
					url: '/assets/wav/tick.wav'
				})
		})

	tick: ->
		#window.app.sound.play()
		

		console.log(this)
		
		window.app.Metronome.model.get('soundManager').play('tick')
	
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