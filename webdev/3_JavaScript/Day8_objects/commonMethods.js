let obj={
    name :'rohit',
    age:30,
    gender : 'male',
    Account_balance : 200
};

//access all the keys
let arr=Object.keys(obj);
console.log(arr);

//access all the bvalues
arr=Object.values(obj);
console.log(arr);

//access both keys and values in 2D array form
arr=Object.entries(obj);
console.log(arr);

//assign two objects into one
const obj1={a:1,b:2};
const obj2={c:3,d:4};

const obj3=Object.assign(obj1,obj2); 
console.log(obj3,obj1);
//but above methode changes obj1 values and add obj2 into obj1 so sollutions is
const obj4=Object.assign({},obj1,obj2);
console.log(obj4);

//Object.assign(source,targets,targets,targets...)

//now combine two objects
const obj5={...obj1,...obj2,...obj4};  // ... is called spread operator...splits the entire object into individual elements

console.log(obj5);

Object.freeze(obj2);  //now vallues of obj2 is freeze and cannot change

