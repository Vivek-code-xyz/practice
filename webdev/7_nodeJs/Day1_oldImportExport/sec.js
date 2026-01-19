console.log("i am code written in second.js")

function sumof(a,b){
    return a+b;
}

function diffof(a,b){
    return (a-b);
}

//function sumof can not be called by first.js..todo so
module.exports={sumof,diffof}  //export function in this way.... also module.exports is an empty object {}