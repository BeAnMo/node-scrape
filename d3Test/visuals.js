/*
domain -> inputs
range  -> outputs
*/
/* overlay text on each bar */
    /*svg.selectAll('text')
       .data(data)
       .enter()
       .append('text')
       .attr('y', (d) => { return y(d.ids.length) / 2; })
       .attr('x', (d) => { return x(d.lang); })
       .attr('dy', '.35em')
       .attr('text-anchor', 'middle')
       .attr('transform', 'rotate(-90)')
       .text((d) => { return d.lang; });*/

var langsReq = new Request('filtered-langs.json', {
    method: 'get',
    headers: new Headers({
        'Content-Type': 'application/json'
    })
});

// Request -> Promise [Request -> Object]
async function get(req){
    var fetched = await fetch(req)
       .then((res) => {
          return res.json();
    })
       .then((j) => {
        return j;
    });
    
    return fetched;
}

// LANGS Object -> Array
function loadArr(obj){
    var arr = [];
    
    for(var k in obj){
        if(obj[k].length !== 0){
            arr.push({lang: k, ids: obj[k] });
        }
    }
    
    return arr.sort((a, b) => {
        return b.ids.ids.length - a.ids.ids.length;
    });
}

// delievery info -> Array-of-{ date, totalPay }
function userInfoToArr(res){
    let result = [];
    for(let i in res){
        if(res[i]['Date'] !== undefined || res[i]['Total Pay'] !== undefined){
            if(res[i]['Date'].length === 10){
                result.push({
                   date: res[i]['Date'],
                   totalPay: parseFloat(res[i]['Total Pay'])
                });
            }
        }
       
    };
            
    return result;
}

// Langs Object -> Arr
function langsToPopLangs(langsObj){
    var popLangs = [
        'csharp', 
        'java', 
        'javascript',
        'php',
        'python',
        'ruby',
        'sql'
    ];
    
    return popLangs.map((lang) => {
        return {
            lang: lang,
            ids: langsObj[lang].ids
        };
    }).sort((a, b) => {
        return b.ids.length - a.ids.length; 
    });
}


/*-------------------------------------------------------*/
function main(jsonData){ 
    var data = loadArr(jsonData); // delivery data
    var jsData = null; // js & associated langs
    var popLangs = langsToPopLangs(jsonData);
    
    /**** Bar Graph for Language Info ****/
    // dimensions  & margins of graph
    var parent = $('.chart');
    
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    
    var margin = { top: 20, right: 20, bottom: 80, left: 40};
    var width  = 500 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;
    
    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);
 
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('.chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
              `translate(${margin.left}, ${margin.top})`);
  
    // scale the range of the data in the domains
    x.domain(data.map((d) => { return d.lang; }));
    y.domain([0, d3.max(data, (d) => { return d.ids.ids.length; })]);

    // append the rectangles for the bar chart
    svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => { return x(d.lang); })
        .attr('width', x.bandwidth())
        .attr('y', (d) => { return y(d.ids.ids.length); })
        .attr('height', (d) => { return height - y(d.ids.ids.length); });

    // add the x axis
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-0.8em')
        .attr('dy', '-0.55em')
        .attr('transform', 'rotate(-90)');
        
    // add the y axis
    svg.append('g')
        .call(d3.axisLeft(y));
    
    /**** Bar Graph for Popular Langs ****/
    // js,sql,php,c#,java,python,ruby
    makeBarGraph('.chart2', popLangs);
}

// html/css selector -> bar graph
function makeBarGraph(selector, data){
    var parent = $(selector);
    
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
     
    var margin = { top: 20, right: 20, bottom: 80, left: 40};
    var width  = parseInt(d3.select('.chart2').style('width'));// - margin.left - margin.right;
    var height = parseInt(d3.select('.chart2').style('height')); // - margin.top - margin.bottom;
    
    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);
    
    /* adding svg element to div.chart2 */
    var svg = d3.select(selector).append('svg')
       // set width to include margins
        .attr('width', width) //+ margin.left + margin.right)
       // set height to include margin 
       .attr('height', height) //+ margin.top + margin.bottom)
       // append g element to svg (group container)
        .append('g');
       // adjusts margins to the right & bottom
        //.attr('transform',
         //     `translate(${margin.left}, ${margin.top})`);
    
    /* popup */
    var popup = d3.select('body').append('div')
       .attr('class', 'popup')
       .style('opacity', 0);
  
    /* scale the range of the data in the domains */
    // creates a section for each lang?
    x.domain(data.map((d) => { return d.lang; }));
    // y max is largest of d.ids.length
    y.domain([0, d3.max(data, (d) => { return d.ids.length; })]);

    /* append the rectangles for the bar chart */
    svg.selectAll('.bar')
       // binds data to svg
        .data(data)
       // on enter, append rect element
       // no DOM presence at this point
        .enter().append('rect')
       // assign bar to rect?
        .attr('class', 'bar')
       // sets x to a language?
        .attr('x', (d) => { return x(d.lang); })
       // sets each rect's width to width of x.domain
        .attr('width', x.bandwidth())
       // sets y to an array length?
        .attr('y', (d) => { return y(d.ids.length); })
       // sets each rect's height to array length
        .attr('height', (d) => { return height - y(d.ids.length); })
       // popup showing language info
        .on('mouseover', (d) => {
           popup.transition()
              .duration(200)
              .style('opacity', 0.9);
           popup.html(`<p>${d.lang}</p><p>${d.ids.length} Jobs`)
              .style('left', `${(d3.event.pageX)}px`)
              .style('top', `${d3.event.pageY - 28}px`);
           
    })
       .on('mouseout', (d) => {
           popup.transition()
              .duration(500)
              .style('opacity', 0);
    });
}

/* initialize */
get(langsReq)
    .then((jsonD) => { return main(jsonD); })
    .catch(console.log);
