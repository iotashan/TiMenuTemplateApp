Alloy.Globals.platformHeight = Ti.Platform.displayCaps.platformHeight;
Alloy.Globals.platformWidth = Ti.Platform.displayCaps.platformWidth;

Alloy.Globals.currentUser = JSON.parse(Ti.App.Properties.getString('session'));

if (OS_IOS) {
	Ti.App.Properties.setString('LookbackAppToken',"your_app_token");
	var Lookback = require('com.featherdirect.lookback');
	Lookback.enableShakeToRecord();
	
	// for reference:
	//	Lookback.disableShakeToRecord();
	//	Lookback.setUserIdentifier('Stephen');
}

var initDrawer = function() {
	var firstWindow = Alloy.Globals.currentUser ? 'HomeWindow':'LoginWindow';
	
	if (OS_IOS) {
		// load module
		var Drawer = require('dk.napp.drawer');
		var win = Alloy.createController(firstWindow);
		
		Alloy.Globals.navController = Ti.UI.iOS.createNavigationWindow({
			window:win.getView(),
		});
		Alloy.Globals.menu = Alloy.createController('NavMenu');
		
		Alloy.Globals.drawer = Drawer.createDrawer({
			leftWindow:Alloy.Globals.menu.getView(),
			centerWindow:Alloy.Globals.navController,
			openDrawerGestureMode: Alloy.Globals.currentUser ? Drawer.OPEN_MODE_BEZEL_PANNING_CENTERWINDOW:Drawer.OPEN_MODE_NONE,
			closeDrawerGestureMode: Alloy.Globals.currentUser ? Drawer.CLOSE_MODE_ALL:Drawer.CLOSE_MODE_NONE,
			leftDrawerWidth: 246,
		});
		
		Alloy.Globals.drawer.open();
		win.init(); // for some reason this isn't called when Drawer opens
	} else {
		// load module
		var Drawer = require('com.tripvi.drawerlayout');
		
		// this is just a wrapper
		// actual content views are add to this later
		Alloy.Globals.contentView = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.FILL
		});
		
		Alloy.Globals.navController = require('AndroidNavController');
		Alloy.Globals.menu = Alloy.createController('NavMenu');
		
		Alloy.Globals.drawer = Drawer.createDrawer({
			leftView : Alloy.Globals.menu.getView(),
			centerView : Alloy.Globals.contentView,
			drawerLockMode:Alloy.Globals.currentUser ? Drawer.LOCK_MODE_UNLOCKED:Drawer.LOCK_MODE_LOCKED_CLOSED,
			leftDrawerWidth : 246,
		});
		
		var onDrawerChange = function(e) {
			if ($.index.getActivity().invalidateOptionsMenu) {
				$.index.getActivity().invalidateOptionsMenu();
			}
		};
		
		Alloy.Globals.drawer.on('draweropen', onDrawerChange);
		Alloy.Globals.drawer.on('drawerclose', onDrawerChange);
		Alloy.Globals.drawer.on('changeContent', onDrawerChange);
			
		$.index.add(Alloy.Globals.drawer);
		
		var win = Alloy.createController(firstWindow);
		Alloy.Globals.open(win);
		$.index.open();
	}
};

Ti.App.addEventListener('app.logout',function(){
	if (OS_IOS) {
		var Drawer = require('dk.napp.drawer');
		Alloy.Globals.drawer.openDrawerGestureMode = Drawer.OPEN_MODE_NONE;
		Alloy.Globals.drawer.closeDrawerGestureMode = Drawer.CLOSE_MODE_NONE;
	} else {
		var Drawer = require('com.tripvi.drawerlayout');
		Alloy.Globals.drawer.drawerLockMode = Drawer.LOCK_MODE_LOCKED_CLOSED;
	}
	
	Alloy.Globals.currentUser = undefined;
	Ti.App.Properties.removeProperty('session');
	Alloy.Globals.open(Alloy.createController('LoginWindow'));
});

/**
 * Android callback for {Ti.UI.Window} open event
 */
function onOpen() {
	if (OS_ANDROID) {
		var activity = $.index.getActivity();
	
		if (activity) {
	
			var actionBar = activity.getActionBar();
	
			activity.onCreateOptionsMenu = function(e) {
				e.menu.clear();
	
				e.activity = activity;
				e.actionBar = actionBar;
	
				if (!Alloy.Globals.drawer.isLeftDrawerOpen) {
					// use a global method to forward this event to the nested controller
					Alloy.Globals.optionsMenu(e);
				}
			};
	
			if (actionBar) {
				actionBar.displayHomeAsUp = true;
				actionBar.onHomeIconItemSelected = function() {
					Alloy.Globals.drawer.toggleLeftWindow();
				};
			}
		};
	}

	return true;
}

initDrawer();