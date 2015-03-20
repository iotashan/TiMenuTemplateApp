var args = arguments[0] || {};

/**
 * Cleans up the controller
 * 
 * http://www.tidev.io/2014/09/18/cleaning-up-alloy-controllers/
 */
var destroy = function() {
	$.off();
};

/**
 * Initializes the controller
 */
var init = function() {
	if (OS_ANDROID) {
		/**
		 * Callback for Android OptionsMenu
		 */
		var onCreateOptionsMenu = function(e) {
			e.actionBar.hide();
		};
		
		$.on('createOptionsMenu', onCreateOptionsMenu);
	}
};

// PUBLIC
exports.destroy = destroy;
exports.init = init;

$.version.text = 'v'+Ti.App.version; // + ' (' + Ti.buildHash + ')';

$.login.addEventListener('click',function(){
	exports.goHome();
});

exports.goHome = function() {
	Alloy.Globals.currentUser = {userID:1234};
	Ti.App.Properties.setString('session',JSON.stringify(Alloy.Globals.currentUser));
	
	Alloy.Globals.open(Alloy.createController('HomeWindow'));
	
	if (OS_IOS) {
		var Drawer = require('dk.napp.drawer');
		Alloy.Globals.drawer.openDrawerGestureMode = Drawer.OPEN_MODE_BEZEL_PANNING_CENTERWINDOW;
		Alloy.Globals.drawer.closeDrawerGestureMode = Drawer.CLOSE_MODE_ALL;
	} else {
		var Drawer = require('com.tripvi.drawerlayout');
		Alloy.Globals.drawer.drawerLockMode = Drawer.LOCK_MODE_UNLOCKED;
	}
};
