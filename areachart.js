$( document ).ready(function() {
var viewerWidth = $(document).width()*0.7;
var viewerHeight = $(document).height()*0.45;

var margin = {top: 10, right: 10, bottom: 100, left: 40},
    margin2 = {top: viewerHeight-70, right: 10, bottom: 20, left: 40},
    width = viewerWidth - margin.left - margin.right,
    height = viewerHeight - margin.top - margin.bottom,
    height2 = viewerHeight - margin2.top - margin2.bottom;

var x = d3.scale.linear().range([0, width]),
    x2 = d3.scale.linear().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed)
    .on("brushend", brushend);

var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(d.Location); })
    .y0(height)
    .y1(function(d) { return y(d.value); });

var area2 = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x2(d.Location); })
    .y0(height2)
    .y1(function(d) { return y2(d.value); });

var svg = d3.select("#areachart-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
    
var tooltip = d3.select("#areachart-container")
    .append("div")
    .attr("class", "remove")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    .style("top", viewerHeight*1.1+"px")
    .style("left", "70px");

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
    
var locationarray = [];


d3.csv("Nanog-avg.csv", function(error, data) {

  x.domain(d3.extent(data.map(function(d) { return d.Location; })));
  y.domain([0, d3.max(data,(function(d) { return +d.value;}))]);
  x2.domain(x.domain());
  y2.domain(y.domain());

  focus.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area)
      .on("mousemove", function(d) {
        mousex = d3.mouse(this);
        mousex = mousex[0];
        var invertedx = Math.round(x.invert(mousex));
        invertedx = (Math.round(invertedx/25))*25 + 1;
        for (var k = 0; k < d.length; k++) {
            locationarray[k] = d[k].Location;
        }

        mouselocation = locationarray.indexOf(invertedx.toString());
      
        tooltip.html("Present in: " + d[mouselocation].present + "% of the tracks <br>" +
                     "Max tag: " + d[mouselocation].max)
               .style("visibility", "visible");
      })
      
      .on("mouseout", function(d) {
         tooltip.html("").style("visibility", "hidden");
      })

  focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  focus.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  /*context.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area2);*/

  context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  context.append("g")
      .attr("class", "x brush")
      .call(brush)
    .selectAll("rect")
      .attr("y", -6)
      .attr("height", height2 + 7);
      
      
  var vertical = d3.select("#areachart-container")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "1px")
        .style("height", height)
        .style("top", viewerHeight*1.1+"px")
        .style("bottom", "30px")
        .style("left", "0px")
        .style("background", "#fff");
  
  //creating the white line
  d3.select("#areachart-container")
      .on("mousemove", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px" )})
      .on("mouseover", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px")});
});

function brushed() {
  x.domain(brush.empty() ? x2.domain() : brush.extent());
  focus.select(".area").attr("d", area);
  focus.select(".x.axis").call(xAxis);
}

function brushend(p) {
  var csvString = brush.extent();
  var a = document.createElement('a');
  a.href     = 'data:attachment/csv,' + csvString;
  a.target   ='_blank';
  a.download = 'myFile.csv,' + encodeURIComponent(csvString); ;
  //a.innerHTML = "Click me to download the file.";
  document.body.appendChild(a);
  a.click();
}

});
