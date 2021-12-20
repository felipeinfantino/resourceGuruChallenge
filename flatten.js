const assert = require("assert");

function flatArray(input, output){
    if(typeof input === "number" || input === []){
        return input
    }
    input.forEach(elem => {
        const result = flatArray(elem, output);
        if(typeof result === "number"){
            output.push(result)
        }
    })
}

let output = []
flatArray([ 1, [ 2, [ 3 ] ], 4 , [] ], output)
assert.deepEqual(output, [ 1, 2 , 3, 4 ])

output = []
flatArray([], output)
assert.deepEqual(output, [])

output = []
flatArray([[[1]], [2, [[[3]]]] , [[[4 , [[[5]]]]]]], output)
assert.deepEqual(output, [1,2,3,4,5])