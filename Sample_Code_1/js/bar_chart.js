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
        yScale = d3.scaleLinear().range([height, 0]);//a linear scale for the y-axis since this axis will show our fixation duration.

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("./data/eyet.csv").then(function(data) {
        console.log(data);
        console.log(data.map(function(d) { return d.Timestamp; }));
        xScale.domain(data.map(function(d) { return d.Timestamp; })); //provide domain values to the x and y scales, here it's X Scale which is Timestamp
        yScale.domain([0, d3.max(data, function(d) { return d.FixationDuration; })]); // domain value of Fixation Duration to y Scale

        g.append("g") //Another group element to have our x-axis grouped under one group element
         .attr("transform", "translate(0," + height + ")") // We then use the transform attribute to shift our x-axis towards the bottom of the SVG.
         .call(d3.axisBottom(xScale)) //We then insert x-axis on this group element using .call(d3.axisBottom(x)).
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Time Stamp");

        g.append("g") //Another group element to have our y-axis grouped under one group element
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             console.log(d);
             return  d;
         })
         .ticks(10)) //We have also specified the number of ticks we would like our y-axis to have using ticks(10).
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Fixation Duration");

        g.selectAll(".bar") //created dynamic bars with our data using the SVG rectangle element.
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.Timestamp); })  //x scale created earlier and pass the year value from our data.
         .attr("y", function(d) { return yScale(d.FixationDuration); }) // pass the data value to our y scale and receive the corresponding y value from the y range.
         .attr("width", xScale.bandwidth()) //width of our bars would be determined by the scaleBand() function.
         .attr("height", function(d) { return height - yScale(d.FixationDuration); }); //height of the bar would be calculated as height - yScale(d.value)
         //the height of the SVG minus the corresponding y-value of the bar from the y-scale
    });