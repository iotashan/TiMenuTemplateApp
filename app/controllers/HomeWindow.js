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
			e.actionBar.title = $.win.title;
			e.actionBar.show();
		};
		
		$.on('createOptionsMenu', onCreateOptionsMenu);
	}
};

// PUBLIC
exports.destroy = destroy;
exports.init = init;

if (OS_IOS) {
	$.menuButton.addEventListener('click',function(){
		Alloy.Globals.drawer.toggleLeftWindow();
	});
}

$.nextWindow.addEventListener('click',function(){
	Alloy.Globals.navController.openWindow(Alloy.createController('ChildWindow').getView());
});
