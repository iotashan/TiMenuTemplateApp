var winStack = [];

exports.openWindow = function(win, options) {
	if (typeof(options) === 'undefined') {
		options = {};
	}

    if (options.animated !== false) {
        options.activityEnterAnimation = Ti.Android.R.anim.slide_in_left;
        options.activityExitAnimation = Ti.Android.R.anim.slide_out_right;
    }
    
    if (!options.noBack) {
    	win.addEventListener('open',function(){
	    	win.activity.actionBar.displayHomeAsUp = true;
	    	win.activity.actionBar.onHomeIconItemSelected = function(){
	    		Alloy.Globals.navController.closeWindow(win);
	    	};
    	});
    }
	
	// open it
	win.open(options);
	
	// add to tracking
	winStack.push(win);
};

exports.closeWindow = function(win, options) {
	if (typeof(options) === 'undefined') {
		options = {};
	}
    if (options.animated !== false) {
        options.activityEnterAnimation = Ti.Android.R.anim.slide_in_left;
        options.activityExitAnimation = Ti.Android.R.anim.slide_out_right;
    }
	
	var indexToClose = -1;

	// find the win we need to close
	if (!win) {
		indexToClose = winStack.length-1;
	} else {
		for (var i=0,l=winStack.length;i<l;i++) {
			if (win === winStack[i]) {
				indexToClose = i;
				break;
			}
		}
	}
	
	var winArray = winStack.splice(indexToClose,1);
	if (winArray && winArray.length > 0) {
		winArray[0].close(options);	
	}
};
