const arr=[10,20,30,40,50];

const result = arr.reduce((acc,curr)=>{
    return acc+curr;
},0)

console.log(result);

/*
const arr = [2, 34, 23, 53, 32, 12];

Using reduce to find sum
const sum = arr.reduce((acc, val) => {
    'acc' → accumulator (stores running total)
    'val' → current element in the array

    Add current value to the accumulator
    return acc + val;
}, 0); '0' is the initial value for the accumulator

console.log("sum of array is", sum);
*/

let a=["orange","apple","banana","orange","apple","banana",'graps',"orange"];

const res = a.reduce((acc,curr)=>{
    if(acc.hasOwnProperty(curr)){
        acc[curr]++;
    }
    else{
        acc[curr]=1;
    }
    return acc;
} , {});

console.log(res);