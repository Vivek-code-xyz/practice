let  arr=[3,45,'vivek',56.54];

//push
arr.push(45);
arr.push('Amit');
console.log(arr);

//pop

arr.pop();
console.log(arr);
arr.pop();

console.log(arr);

//add at start
arr.unshift(10);
arr.unshift('viv');
console.log(arr);

//delete at start
arr.shift();
console.log(arr);

//delete at perticular index
delete arr[1];          //disadvantage that it not free up space of removed element
console.log(arr);

console.log(arr[1])  //undefined

