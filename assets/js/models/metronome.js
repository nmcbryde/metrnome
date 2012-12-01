(function() {
  'use strict';

  window.app = window.app || {};

  window.app.Metronome = Backbone.Model.extend({
    defaults: {
      bpm: 62,
      timer: null,
      ticksound: null,
      soundManager: soundManager.setup({
        url: '/assets/flash/',
        onready: function() {
          var tickSound;
          return tickSound = soundManager.createSound({
            id: 'tick',
            url: '/assets/wav/tick.wav'
          });
        }
      })
    },
    tick: function() {
      console.log(this);
      return window.app.Metronome.model.get('soundManager').play('tick');
    },
    start: function() {
      return this.set('timer', window.setInterval(this.tick, 60000 / this.get('bpm')));
    },
    stop: function() {
      window.clearInterval(this.get('timer'));
      return this.set('timer', null);
    },
    getStatus: function() {
      if (this.get('timer') === null) {
        return "stopped";
      } else {
        return "started";
      }
    },
    setBPM: function(bpm) {
      this.set('bpm', bpm);
      if (this.getStatus() === "started") {
        this.stop();
        return this.start();
      }
    }
  });

}).call(this);
