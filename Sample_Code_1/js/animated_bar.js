var svg = d3.select("svg"),
margin = 200,
width = svg.attr("width") - margin,
height = svg.attr("height") - margin;

svg
.append("text")
.attr("transform", "translate(300,0)")
.attr("x", 50)
.attr("y", 50)
.attr("font-size", "24px")
.text("Eye Movement Data");

var xScale = d3.scaleBand().range([0, width]).padding(0.4);
var yScale = d3.scaleLinear().range([height, 0]);

var g = svg
.append("g")
.attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv("../data/eyet.csv").then(function (data) {

    xScale.domain(data.map(function (d) { return d.Timestamp }));
    yScale.domain([0, d3.max(data, function (d) { return d.FixationDuration })]);

    g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("y", height - 250)
    .attr("x", width - 100)
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Time Stamp");

    g.append("g")
    .call(
        d3
        .axisLeft(yScale)
        .tickFormat(function (d) {
            return d;
        })
        .ticks(10)
    )
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-5.1em")
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Fixation Duration");

    g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .on("mouseover", onMouseOver) //On selection of bar elements, two new event handlers added, viz. mouseover and mouseout and we are calling the respective functions to handle mouse events
    .on("mouseout", onMouseOut) //done to apply animation when mouse hovers over a particular bar and goes out
    .attr("x", function (d) {
        return xScale(d.Timestamp);
    })
    .attr("y", function (d) {
        return yScale(d.FixationDuration);
    })
    .attr("width", xScale.bandwidth())
    .transition()
    .ease(d3.easeLinear)
    .duration(5000)
    .delay(function (d, i) {
        return i * 50;
    })
    .attr("height", function (d) {
        return height - yScale(d.FixationDuration);
    });
});

//mouseover event handler function
function onMouseOver(d, i) {
    d3.select(this).attr("class", "highlight"); //selected bar (given by the 'this' object)
    d3.select(this)
    .transition() // adds animation
    .duration(400)
    .attr("width", xScale.bandwidth() + 5)
    .attr("y", function (d) {
        return yScale(d.FixationDuration) - 10;
    })
    .attr("height", function (d) {
        return height - yScale(d.FixationDuration) + 10;
    });
}

//mouseout event handler function
function onMouseOut(d, i) {
    
    d3.select(this).attr("class", "bar");
    d3.select(this)
    .transition() // adds animation
    .duration(400)
    .attr("width", xScale.bandwidth())
    .attr("y", function (d) {
        return yScale(d.FixationDuration);
    })
    .attr("height", function (d) {
        return height - yScale(d.FixationDuration);
    });
}