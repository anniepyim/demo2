var width = $(document).width()*0.9,
    height = $(document).height()*0.9,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.count; });

var svg = d3.select("#piechart-container").append("svg")
    .attr("width", radius*2)
    .attr("height", radius*2)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("celltypecount.csv", function(error, data) {

  data.forEach(function(d) {
    d.count = +d.count;
  });

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc")
      .on("mouseover", function(d, i) {
        svg.selectAll(".arc").transition()
          .duration(250)
          .attr("opacity", function(d, j) {
            return j != i ? 0.6 : 1;
          })
      })
      .on("mouseout", function(d, i) {
        svg.selectAll(".arc")
           .transition()
           .duration(250)
           .attr("opacity", "1");
      });

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.cell); });
      

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.cell; });

});
