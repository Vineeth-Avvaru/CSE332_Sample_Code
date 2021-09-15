var svg = d3.select("svg"),
margin = 200,
width = svg.attr("width") - margin,
height = svg.attr("height") - margin

svg.append("text")
.attr("transform", "translate(100,0)")
.attr("x", 200)
.attr("y", 50)
.attr("font-size", "24px")
.text("Eye Movement Data")

var xScale = d3.scaleBand().range([0, width]).padding(0.4);//scaleBand() is used to construct a band scale. This is useful when our data has discrete bands.
yScale = d3.scaleLinear().range([height, 0]);//a linear scale for the y-axis since this axis will show our stock prices.

var g = svg.append("g")
       .attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv("data/eyet.csv").then(function(data) {

xScale.domain(data.map(function(d) { return d.MappedFixationPointX; })); //provide domain values to the x and y scales, here it's X Scale which is Timestamp
yScale.domain([0, d3.max(data, function(d) { return d.MappedFixationPointY; })]); // domain value of Fixation Duration to y Scale

g.append("g") //Another group element to have our x-axis grouped under one group element
 .attr("transform", "translate(0," + height + ")") // We then use the transform attribute to shift our x-axis towards the bottom of the SVG.
 .call(d3.axisBottom(xScale)) //We then insert x-axis on this group element using .call(d3.axisBottom(x)).
 .append("text")
 .attr("y", height - 250)
 .attr("x", width - 100)
 .attr("text-anchor", "end")
 .attr("stroke", "black")
 .text("Mapped Fixation Point X");

g.append("g") //Another group element to have our y-axis grouped under one group element
 .call(d3.axisLeft(yScale).tickFormat(function(d){
     return  d;
 })
 .ticks(10))
 .append("text")
 .attr("transform", "rotate(-90)")
 .attr("y", 6)
 .attr("dy", "-5.1em")
 .attr("text-anchor", "end")
 .attr("stroke", "black")
 .text("Mapped Fixation Point Y");

g.selectAll(".circle")
 .data(data)
 .enter().append("circle")

 .attr("r", function(d) { return 10; })

 .attr("cx", function(d) { return xScale(d.MappedFixationPointX); })

 .attr("cy", function(d) { return yScale(d.MappedFixationPointY); })

 .style("fill","red") 
});