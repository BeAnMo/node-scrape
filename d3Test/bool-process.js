/***** Boolean processing *****/
/* Request -> Promise [Request -> Object] */
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

/* initialize */
get('filtered-langs.json').then(main).catch(console.log);

function main(jsonData){
    /*
    - source will be clicked language, and targets will be
      languages that link to the clicked language
    - the source lang will adjust to a size in proportion
      with the number of its ids, and the size of the target
      langs will only be as big as the number of linked ids
      present, even if a target lang contains more ids
      - ex: source: javascript - 300 ids
        targets: python - 12 total ids, buy only 3 linked to
        JS
    */
    //var langs = Object.keys(jsonData);
    //var graph = langs.map(createLangGraph(jsonData));
    
    var givens = ['javascript', 'ruby', 'sql', 'python'];
    var andTest = multipleIntersect(givens, jsonData);
    console.log(andTest);
}

/* Object -> [String -> Object]
  builds object from intersection terms in the id arrays
  {
     source: String (given lang),
     ids: Number (ids in given lang)
     targets: [
        {
           source: String (linked lang),
           ids: Number (ids in given lang)
        }
     ]
  }  */
function createLangGraph(data){
    return function(lang){
        var langs = Object.keys(data);
        var ids = data[lang].ids.sort();
        var graph = {
            source: lang,
            ids: ids.length,
            targets: []
        };

        langs.forEach((l) => {
            if(l !== lang){
                var l_ids = data[l].ids.sort();
                var merged = intersect(l_ids, ids);

                if(merged.length > 0){
                    graph.targets.push({
                        target: l,
                        ids: merged
                    });
                }   
            }
        });
        // probably not a real graph
        return graph;
    }    
}

/* Array, Array -> Array
  assumes both arrays are sorted
  - could take an additional arg:
    - AND, OR, NOT...
    allow for more complex queries  */
function intersect(arr1, arr2){
    var result = [];
    var a1 = arr1;
    var a2 = arr2;

    while(a1.length !== 0 && a2.length !== 0){
        if(a1[0] === a2[0]){
            result.push(a1[0]);
            a1 = a1.slice(1);
            a2 = a2.slice(1);
        } else if(a1[0] < a2[0]){
            a1 = a1.slice(1);
        } else {
            a2 = a2.slice(1);
        }
    }
    
    return result;
}

/*
Array -> Array
  returns array ids that are present in all given langs
*/
function multipleIntersect(langs, data){
    /* sorts langs by array size
       starting with smallest arrays means 
       intermediate results will be no bigger
       than smallest array */
    var sorted = langs.map((lang) => {
        return data[lang].ids;
    }).sort((a, b) => {
        return a - b;
    });
    
    // first
    var result = sorted[0];
    // rest
    var sorted = sorted.slice(1);
    
    while(sorted.length !== 0 && result.length !== 0){
        // intersect first & second - smallest arrays
        result = intersect(result, sorted[0]);
        sorted = sorted.slice(1);
    }
    
    return result;
}

/*
Promise (pending)
*/
/*
Promise (pending)
*/
