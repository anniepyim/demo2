$( document ).ready(function() {
var width = $(document).width()*0.25,
    height = $(document).height()*0.45,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.value; });

var svg = d3.select("#piechart-container").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("testcell.csv", function(error, data) {

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
      })
      .on("click", function(d) {
        var csvString = d.data.cell;
        var a = document.createElement('a');
        a.href     = 'data:attachment/csv,' + csvString;
        a.target   ='_blank';
        a.download = 'myFile.csv';
        document.body.appendChild(a);
        a.click();
      });

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.label); });
      

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.label; });

});
})