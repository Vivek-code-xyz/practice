//using map you can modify the array and store it into another variable without changing the original array
//map can return any value ,,while the filter only returns true or false

let arr=[2,4,3,6,7];

let res=arr.map((num)=>{return num*num});

console.log(res);

let result=arr.map((n)=>{return (n*n)%10})

console.log(result) 


//Now Chaining of Filter And Map

let array=[2,3,4,6,7,8,9];
//question is filter the odd number and store the square of it in the resultant array
let ans= array.filter((n)=>{return n%2!=0}).map((n)=>{return n*n});

console.log(ans);

//you can chain filter-map any time as the you want like filter-map-map-filter...so on