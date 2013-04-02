var AppRouter = Backbone.Router.extend({
    routes: {
        "import": "importRoute",
        "export": "exportRoute",
        "*actions": "defaultRoute" // matches http://example.com/#anything-here
    }
});
// Initiate the router
var app_router = new AppRouter;

app_router.on('route:defaultRoute', function(actions) {
  $("#importModal").modal('hide');
});

app_router.on('route:importRoute', function(actions) {
  $("#importModal").modal('show');
  $('.import').click( function() {
    metronome.loadPresets( $('#import').val() )
  });
});

app_router.on('route:exportRoute', function(actions) {
  metronome.exportPresets();
});

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();