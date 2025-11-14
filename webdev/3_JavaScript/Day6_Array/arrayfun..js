
let arr=[2,44,34,'vivek',true,34.543];

console.log(arr[4]);
console.log(arr.at(-1));   //at can take negative indexes also

console.log(arr.length)


const vec =  arr ;
console.log(vec==arr);        //true
//vec takes address of arr and not copy it...   Shallow copy

//deep copy
const vec2= structuredClone(arr);
console.log(vec2==arr);  //false


