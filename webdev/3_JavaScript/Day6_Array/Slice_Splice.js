let arr=[1,2,3,4,5,6,7,8,9];

//slice
console.log(arr.slice(2,6));
//slice copies the original array from 2nd index to 5th idx (6 not included ) and displays it
//it does not affect the original array

console.log(arr);


//splice
console.log(arr.splice(2,4));
//splice actually cuts numbers from 2nd index to 4 numbers... and displays it
//it affects the original array and now arr has only remaining elements
console.log(arr);


//splice---->(st_idx,Total-No_of_elements,add value)
arr=[3,4,5,6,7,8,2,1,10];
arr.splice(2,4,'vivek','khasiya');
console.log(arr);
//splice cuts 4 values from 2nd idx and add two values vivek and khasiya to that place in original array