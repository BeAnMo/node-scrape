var numbers = [5,4,10,1];
var data = [
    { date: '2014-01-01', amount: 10 },
    { date: '2014-02-01', amount: 20 },
    { date: '2014-03-01', amount: 40 },
    { date: '2014-04-01', amount: 80 },
];

d3.min(numbers)
/*
1
*/
var y = d3.scaleLinear()
    .domain(d3.extent(data, (d) => { return d.amount; }))
    .range([200, 0]);

var x = d3.scaleTime()
    .domain([
        new Date(Date.parse('2014-01-01')),
        new Date(Date.parse('2014-02-01'))
    ])
    .range([0, 300]);

x(new Date(Date.parse('2014-02-01')));
/*
Exception: SyntaxError: missing name after . operator
@Scratchpad/3:24
*/
/*
300
*/
var xAxis = d3.axisBottom(x)
    .ticks(4);

var svg = d3.select('.chart2')
    .append('svg')
    .attr('width', 300)
    .attr('height', 150);

svg.append('g')
    .attr('class', 'x axis')
    .call(xAxis);
/*
[object Object]
*/