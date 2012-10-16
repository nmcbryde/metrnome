(function() {
  'use strict';

  window.app = window.app || {};

  window.app.Preset = Backbone.Model.extend({
    defaults: {
      title: "",
      bpm: 62
    }
  });

}).call(this);
