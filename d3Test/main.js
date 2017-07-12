/*
domain -> inputs
range  -> outputs
*/

function loadArr(obj){
    var arr = [];
    
    for(var k in obj){
        if(obj[k].length !== 0){
            arr.push({lang: k, ids: obj[k] });
        }
    }
    
    return arr;
}

// delievery info -> Array-of-{ date, totalPay }
function userInfoToArr(res){
    let result = [];
    for(let i in res){
        if(res[i]['Date'] !== undefined || res[i]['Total Pay'] !== undefined){
            if(res[i]['Date'].length === 10){
                result.push({
                   date: res[i]['Date'],
                   totalPay: res[i]['Total Pay']
                });
            }
        }
       
    };
            
    return result;
}


/*-------------------------------------------------------*/
function main(){
        
    d3.json('filtered-langs.json', (err, res) => {
        if(err) return console.log(err);
    
        //var test = loadArr(res);
        //console.log(test);
    });
    
    
    /**** Bar Graph for Delivery Info ****/
    // dimensions  & margins of graph
    var margin = { top: 20, right: 20, bottom: 30, left: 40},
        width  = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    // set the ranges
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
    var y = d3.scaleLinear()
              .range([height, 0]);
    
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('chart').append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
             .append('g')
                .attr('transform',
                     'translate(' + margin.left + ',' +margin.top+')');
    
    
    d3.csv('user_info.csv', (err, res) => {
        if(err) return console.log(err);
        // 'Date' & 'Total Pay'
        var data = userInfoToArr(res);
        
        // scale the range of the data in the domains
        x.domain(data.map((d) => { return d.date; }));
        y.domain([0, d3.max(data, (d) => { return d.totalPay; })]);
        
        // append the rectangles for the bar chart
        svg.selectAll('.bar')
           .data(data)
         .enter().append('rect')
           .attr('class', 'bar')
           .attr('x', (d) => { return x(d.date); })
           .attr('width', x.bandwidth())
           .attr('y', (d) => { return y(d.totalPay); })
           .attr('height', (d) => { return height - y(d.totalPay); });
        
        // add the x axis
        svg.append('g')
           .attr('transform', 'translate(0,' + height + ')')
           .call(d3.axisBottom(x));
        
        // add the y axis
        svg.append('g')
           .call(d3.axisLeft(y));
    });
}

main();