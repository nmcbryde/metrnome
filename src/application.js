jQuery(function($) {

  // Initialize your application here.
	metronome = new app.MetronomeView();
	
	
	$(document).delegate('.export', 'click', function() {
		metronome.exportPresets();
		
	})
	
	
});


