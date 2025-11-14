//sum of two numbers

function sumof(a,b){
    console.log(a+b);
}

sumof(4,5)



//product of two numbers
function multiply(a,b){
    return a*b;
}

let a=multiply(6,7);
console.log(a);


/// function stored in variable name

const fun= function(){
    return "hello guys";
}

console.log(fun)     //it shows that function is present in fun  but doesnot call the function
console.log(fun());   //now function is called