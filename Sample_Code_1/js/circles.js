var width = 700;
var height = 700;

var data = [10, 15, 20, 25, 30, 18, 26];
var colors = ['#9999cc','#c2e699','red','blue','#006837','#99dddd','orange'];

var svg = d3.select("body") // Almost same like Bar Chart
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
        return "translate(10,0)"; // Tell why We Need
    })

g.append("circle")
    .attr("cx", function(d, i) {
        return i*100 + 50;
    })
    .attr("cy", function(d, i) {
        return 100;
    })
    .attr("r", function(d) {
        return d*1.5;
    })
    .attr("fill", function(d, i){
        // return "red";
        return colors[i]; // Using an array to assign the color value to each of the element
})

g.append("text")
    .attr("x", function(d, i) {
        return i * 100 + 55;
    })
    .attr("y", 105)
    .attr("stroke", "black")
    .attr("font-size", "12px")
    .attr("font-family", "sans-serif")
    .text(function(d) {
        return d;
});