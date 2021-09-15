// console.log("Hello World");
// var paragraphs = document.getElementsByTagName("p");
// console.log(paragraphs);
// for (var i = 0; i < paragraphs.length; i++) {
//   var paragraph = paragraphs.item(i);
//   paragraph.style.setProperty("color", "blue", null);
// }

// d3.selectAll("p").style("color", "blue");
// d3.select("body").style("background-color", "black");

// d3.selectAll("p").style("color", function(d,i,k,l) {
//     // console.log(k);
//     // console.log(d);
//     // console.log(i);
//     return "hsl(" + Math.random() * 360 + ",100%,50%)";
//   });

// d3.selectAll("p").style("color", function(d, i) {
//     return i % 2 ? "black" : "blue";
//   });

// Add Some Data

// var data = [4,8,16,24,32,64]

// d3.select("body")
//     .selectAll("p")
//     .data(data)
//     .style("font-size", function(d) {
//         console.log(d);
//         return d + 'px'
//     })

// https://bost.ocks.org/mike/join/

// var data = [1,2,3,4,5,6,7,8]

// d3.select("body")
//     .selectAll("p")
//     .data(data)
//     .enter().append("p")
//     .text(function(d) {
//         return "I'm a number "+ d + "!";
//     })

// Transitions

// d3.selectAll("p").transition()
//     .duration(2000)
//     .style("color", "red");