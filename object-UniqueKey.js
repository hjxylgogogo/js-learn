let uniqueToken = 0
function getUniqueKey(key){
    return `${key}_${uniqueToken++}`
}

let person = {
    [getUniqueKey('name')]:'hjx',
    [getUniqueKey('name')]:'hjx2',
    [getUniqueKey('name')]:'yl',
}
console.log(person);