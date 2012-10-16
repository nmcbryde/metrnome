(function() {
  'use strict';

  window.app = window.app || {};

  window.app.Metronome = Backbone.Model.extend({
    defaults: {
      bpm: 62,
      timer: null
    },
    tick: function() {
      return window.sound.play();
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
