export default Ember.View.extend({
	didInsertElement: function() {
		this.loadGraph();
	},
	loadGraph: function() {
		var width = 960;
		var height = 480;
		
		var x = d3.scale.linear().range([0, width]);
		var y = d3.scale.ordinal().rangeRoundBands([0, height], 0.2);

		var xAxis = d3.svg.axis().scale(x).orient("top");
		
		var svg = d3.select('body').append('svg')
								.attr('width', width)
								.attr('height', height)
								.append('g');

		d3.json('http://meteoub.equip9.org/measures', function(error, data) {
			x.domain(d3.extent(data.measures, function(measure){
				return measure.temperature;
			}));
			y.domain(data.measures.map(function(measure) {
				return measure.datetime;
			}));

		svg.selectAll(".bar").data(data.measures).enter().append("rect")
					.attr("class", function(measure) { return measure.temperature < 0 ? "bar negative" : "bar positive"; })
					.attr("x", function(measure) { 
						// return x(Math.min(0, measure.temperature)); 
						return 10;
					})
					.attr("y", function(measure) { return y(measure.datetime); })
					.attr("width", function(measure) { 
						// return Math.abs(x(measure.temperateure) - x(0)); 
						return 100;
					})
					.attr("height", y.rangeBand());

		svg.append("g").attr("class", "x axis").call(xAxis);

			svg.append("g").attr("class", "y axis").append("line")
					.attr("x1", x(0))
					.attr("x2", x(0))
					.attr("y2", height);

		});
	}
});
