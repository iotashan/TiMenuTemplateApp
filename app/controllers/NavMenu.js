var args = arguments[0] || {};

// inherit properties
_.each([
	'visible',
], function(arg) {
	if (args[arg] && typeof args[arg] === 'string') {
		$.self[arg] = args[arg];
	}
});

var clickHandler = function(e) {
	Ti.API.info('menu click '+JSON.stringify(e));
	switch(e.source.data.id) {
		case 'none':
			// do nothing
			break;
		case 'Login':
			Alloy.Globals.open(Alloy.createController('LoginWindow'));
			break;
		case 'Home':
			Alloy.Globals.open(Alloy.createController('HomeWindow'));
			break;
		case 'logout':
			Ti.App.fireEvent('app.logout');
			break;
	}
	
	if (OS_IOS && Alloy.Globals.drawer.isLeftWindowOpen()) {
		Alloy.Globals.drawer.toggleLeftWindow();
	} else if (Alloy.Globals.drawer.isLeftDrawerOpen) {
		Alloy.Globals.drawer.toggleLeftWindow();
	}

	Alloy.Globals.drawer.fireEvent('drawerclose');
};

exports.select = function(controller) {
	clickHandler({
		source:{
			data:{
				id:controller
			},
			fakeclick:true,
		}
	});
};

var createMenuItem = function(data) {
	var menuItem = Ti.UI.createView({
		height:56,
		left:0,
		right:0,
		data:data,
	});
	
	menuItem.addEventListener('click',clickHandler);
	
	menuItem.add(Ti.UI.createLabel({
		left:15,
		right:15,
		color:'#fff',
		font:{
			fontSize:20,
		},
		text:data.name,
		touchEnabled:false,
	}));
	
	menuItem.add(Ti.UI.createView({
		bottom:0,
		height:'1px',
		backgroundColor:'#fff',
		opacity:0.4,
		touchEnabled:false,
	}));
	
	return menuItem;
};

exports.populateMenu = function(){
	$.content.removeAllChildren();
	
	// nav items
	
	$.content.add(createMenuItem({
		id:'Home',
		name:'Home',
	}));

	$.content.add(createMenuItem({
		id:'logout',
		name:'Log Out',
	}));
};

$.appVersion.text = 'v'+Ti.App.version; // + ' (' + Ti.buildHash + ')';

exports.populateMenu();
