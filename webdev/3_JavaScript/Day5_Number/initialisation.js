
let num1= 123;   //stack 
let num2=new Number(123);     //heap
let num3=new Number(123);

//remember that num2 and num3 stores the referance or address of 123 value at heap


console.log(num1==num2)            //TRUE
console.log(num3==num2)             //FALSE

//Cause if both sides variable are of different type then they are converted to same type so 
//in case of 1st num2 is converted to number 123 and then comparizon happens but
//in case of 2nd the both are of object type so they directly compared and both contains address of diff location
//so in case of 2nd the answer is false