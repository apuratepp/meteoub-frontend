import Ember from 'ember';

var Router = Ember.Router.extend({
  location: MeteoubFrontendENV.locationType
});

Router.map(function() {
	this.resource("measures", function(){
		this.route("show", { path: "/:measure_id" });
		this.route("now", { path: "now" });
		this.route("graph");
	});
});

export default Router;
