(function() {
  'use strict';

  app.Preset = Backbone.Model.extend({
    defaults: {
      title: "",
      bpm: 62
    },
    
    validate: function(attrs, options) {
        if (attrs.bpm < 0) {
            return "Can't have a negative BPM";
        }
        
        if (attrs.title === null) {
            return "Must have a title"
        }
    }
  });

}).call(this);
