
let arr2d=[1,2,3,5,[11,14,25,34],6,7];
let arr3d=[1,2,3,[2,3,4,[5,43,23],3], [1,2,4],5,6];

console.log(arr2d);
console.log(arr3d);

//flat 2d and 3d array into 1d

console.log(arr2d.flat());   //default flat upto 1 level
console.log(arr3d.flat(2));   //flat upto 2 levels


//to check if the given object is array or not

let arr=[1,2,3];
console.log(typeof arr);         //cant identify the array

console.log(Array.isArray(arr));    //true


//array in heap
let ar=new Array(10,20,30);
console.log(ar);

///but if you pass one value to this then it will be considered as size of array
let ar2=new Array(10)       //makes an empty array with 10 capacity
console.log(ar2);
console.log(ar2.length);

// avoid using the 2d and 3d arrays as they formed as object in js