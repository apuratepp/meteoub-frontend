export default Ember.Route.extend({
	model: function(){
		return this.store.findAll('measure');
	},
	afterModel: function(measures){
		this.transitionTo('measures.show', measures.get('lastObject'));
	}
});
