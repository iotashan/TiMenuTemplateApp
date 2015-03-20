describe('HomeWindow.js', function() {
	var Alloy = require("alloy");
	var $;


	beforeEach(function() {
		$ = Alloy.createController("LoginWindow");
	});

	it("should contain a login button", function() {
		$.should.have.property('login');
	});

	it("should log a user in when they click login", function() {
		spyOn($, "goHome");
		
		$.login.fireEvent('click');

		waitsFor(function() {
			return $.goHome.callCount === 1;
		}, 500);
		runs(function() {
			Alloy.Globals.currentUser.should.be.an.instanceOf(Object).and.have.property('userID');
		});
	});
});
