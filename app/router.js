var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
	this.resource("measures", function(){
		this.route("show", { path: "/:measure_id" })
		this.route("now", { path: "now" })
	});
});

export default Router;
