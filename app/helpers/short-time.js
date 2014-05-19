export default Ember.Handlebars.makeBoundHelper(function(datetime) {
  var datetime_formatted = datetime.toLocaleTimeString()

  return new Ember.Handlebars.SafeString(datetime_formatted);
});