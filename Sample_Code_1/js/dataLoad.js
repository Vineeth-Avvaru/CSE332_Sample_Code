// Version v3
// d3.csv("./data/eyet.csv", function(data) {
//      console.log(data);
// });


// V7

d3.csv("../data/eyet.csv").then(function(data) {
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].Timestamp);
        console.log(data[i].StimuliName);
    }
    console.log(data);
})