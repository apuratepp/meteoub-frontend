export default Ember.Route.extend({
	model: function(params){
		return this.store.find('measure', params.measure_id);
	}
});
