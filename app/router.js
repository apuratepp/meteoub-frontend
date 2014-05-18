var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
	this.resource("measures", function(){});
});

export default Router;
