// function fooPromiseExecutor(resolve,reject){
//     setTimeout(reject,1000,'bar')
// }

// function foo(){
//     new Promise(fooPromiseExecutor)
// }

// foo() 

async function foo(){
    const a = await Promise.resolve(3)
    console.log(a);
    return 2
}

const f = foo()
console.log(f);
setTimeout(console.log,0,f)