(function(){
	/**
	 * @property {Object} drawer reference
	 */
	Alloy.Globals.drawer = undefined;
	/**
	 * @property {Ti.UI.View} contentView 
	 */
	
	Alloy.Globals.contentView = undefined;
	
	/**
	 * @property {Alloy.Controller} currentCtrl	 references current Controller
	 * @private
	 */
	var currentCtrl;
	
	/**
	 * optionsmenu dispatcher
	 */
	Alloy.Globals.optionsMenu = function(e) {
		currentCtrl.trigger('createOptionsMenu', e);
	};
	
	/**
	 * opens a new controller in drawer.contentView
	 * and closes the old controller
	 * @param {Alloy.Controller} Controller
	 */
	Alloy.Globals.open = function(_ctrl) {
	
		if (currentCtrl) {
			if (OS_ANDROID) {
				Alloy.Globals.contentView.remove(currentCtrl.getView());
			}
			_.isFunction(currentCtrl.destroy) && currentCtrl.destroy();
		}
	
		currentCtrl = _ctrl;
		if (OS_ANDROID) {
			Alloy.Globals.navController = require('AndroidNavController');
			Alloy.Globals.contentView.add(currentCtrl.getView());
			Alloy.Globals.drawer.fireEvent('changeContent');
		} else {
			Alloy.Globals.navController = Ti.UI.iOS.createNavigationWindow({
				window:currentCtrl.getView(),
			});
			Alloy.Globals.drawer.setCenterWindow(Alloy.Globals.navController);
		}
		
		currentCtrl.init();
	};
	
})();