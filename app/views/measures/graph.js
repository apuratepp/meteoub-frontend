export default Ember.View.extend({
	didInsertElement: function() {
		this.loadGraph();
	},
	willDestroyElement: function() {
		this.destroyGraph();
	},
	destroyGraph: function() {
		d3.select("svg").remove();
	},
	loadGraph: function() {
		var width = $(window).width();
		var height = $(window).height();
		
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
						.attr("class", function(measure) { 
							return measure.temperature < 0 ? "bar negative" : "bar positive"; 
						})
						.attr("x", function(measure) { 
							return width / 10.0;
						})
						.attr("y", function(measure) { 
							return y(measure.datetime); 
						})
						.attr("width", function(measure) { 
							var relative_temperature = measure.temperature / 40.0; // relative to 0º C-40º C

							return width * relative_temperature;
						})
						.attr("height", y.rangeBand())
						.attr("fill", function(measure) {
							var relative_temperature = measure.temperature / 40.0; // relative to 0º C-40º C
							var color = 'orange';
							return color;
						});

			svg.append("g").attr("class", "x axis").call(xAxis);
			svg.append("g").attr("class", "y axis").append("line")
					.attr("x1", x(0))
					.attr("x2", x(0))
					.attr("y2", height);

		});
	}
});
