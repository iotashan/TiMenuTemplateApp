describe('index.js', function() {
	var Alloy = require("alloy");
	var $;


	beforeEach(function() {
		$ = Alloy.createController("index");
	});

	it("should create a global nav controller", function() {
		Alloy.Globals.should.have.property('navController');
	});

	it("should create the menu UI", function() {
		Alloy.Globals.should.have.property('menu');
	});

	it("should create the sliding drawer", function() {
		Alloy.Globals.should.have.property('drawer');
	});
});
