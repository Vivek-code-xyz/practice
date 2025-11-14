let arr=[1,22,31,43,52];

const array= arr.filter((n)=>{
    return n%2==0;
})

console.log(array);

let student=[
    {name:'vivek',age:18,height:162},
    {name:'dev',age:17,height:168},
    {name:'param',age:18,height:166},
    {name:'het',age:18,height:160},
    {name:'kirtan',age:14,height:154}
];

//filter out student with height is greater than 160

// const result=student.filter((n)=>{return n.height>160});
const result=student.filter(({height})=>{return height>160});       //used destructuring 
console.log(result);









/*
The filter() function is used to create a new array from an existing array by filtering out elements 
that meet a certain condition.

It takes a callback function as an argument.
The callback function runs for each element in the arrayand returns true or false.

If the callback returns true → the element is included in the new array.
If the callback returns false → the element is excluded.

The original array remains unchanged (filter() is non-destructive).

Syntax: array.filter(callback(element, index, array), thisArg)
*/