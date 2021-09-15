var data = [5, 10, 12, 15, 5, 9, 6];
var width = 200,
  scaleFactor = 10,
  barHeight = 20;

var graph = d3
  .select("body") // Select document Body
  .append("svg") // Append a SVG element
  .attr("width", width) // Assign width to the SVG
  .attr("height", barHeight * data.length); // height of SVG to accommodate all the bars

var bar = graph
  .selectAll("g") // we want to place each of our bars inside corresponding <g> elements. So here, we create our group elements.
  .data(data)
  .enter() // Placeholder for binded data to appear
  .append("g") // appended group inplace of placeholder created
  .attr("transform", function (d, i) {
    //Let's play with transform also
    return "translate(0," + i * barHeight + ")"; //Each of our group elements needs to be positioned one below the other because we want to build a horizontal bar chart.
    //So our translation formula will be
  });
bar
  .append("rect") //our group elements ready, we will add the <rect> element for each bar.
  .attr("width", function (d) {
    return d * scaleFactor; // Scaling because values are smaller
  })
  .attr("height", barHeight - 1);

bar
  .append("text") // group element also appending text
  .attr("x", function (d) {
    return d * scaleFactor - 5;
  }) //assigning x for text to appear
  .attr("y", barHeight / 2) // similarly assigning y cordinate
  .attr("dy", ".35em") // "dy" offset  is used to align the text vertically. Text elements do not support padding or margin
  .text(function (d) {
    return d;
  });