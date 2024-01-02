let dest,src,result
dest = {   
}
src = {_id:'src',
get id(){
    return this._id+'id2'
}}

result = Object.assign(dest,src,{a:'fooa'})
console.log(result);
