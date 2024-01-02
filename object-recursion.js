function recursivelyCheckEqual(x,...rest){
    return Object.is(x,rest[0])&&(rest.length<2||recursivelyCheckEqual(...rest))
}

const test = [1,1,2,1]
console.log(recursivelyCheckEqual(1,...test));