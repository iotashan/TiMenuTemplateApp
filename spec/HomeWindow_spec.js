describe('HomeWindow.js', function() {
	var Alloy = require("alloy");
	var $;


	beforeEach(function() {
		$ = Alloy.createController("HomeWindow");
	});

	if (Ti.Android) {
		it("should create a view for the drawer", function() {
			$.win.apiName.should.equal('Ti.UI.View');
		});
	} else {
		it("should create a window for the drawer", function() {
			$.win.apiName.should.equal('Ti.UI.Window');
		});
		it("should have a menu button", function() {
			$.should.have.property('menuButton');
		});
	}
	
	it("should contain a button to open ChildWindow", function() {
		$.should.have.property('nextWindow');
	});
});
