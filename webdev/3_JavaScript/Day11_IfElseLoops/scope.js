//globle scope  (variables defined outside of any code block)
let a=0;
let b="vivek";
//can be access throughout the code


//local scope(variables defined inside the functional block)
function greet(){
    let a=1;
    let b="i am great"
}
//they are only accessible inside the functional code block

//block scope(variables defined inside block of ifelse or loop or switch case)

if(true){
    let r=12;
    let str='viv';
    var notuse=true     // do not declare the variables by var because it can be access through any type of code and blocks
}
//they are also only accessible inside the block of code