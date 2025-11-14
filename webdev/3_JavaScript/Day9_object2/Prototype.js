let arr=[5,6,7,8];

arr.__proto__;

console.log(arr.__proto__ == Array.prototype);

console.log(arr.__proto__.__proto__ == Object.prototype);

console.log(Array.prototype.__proto__==Object.prototype);


//prototype use case

const user={
    name:'vivek',
    age:12
};

const costomer={
    contact: 345,
    email:"abc@gmail.com"
};

console.log(costomer.name);  //error

costomer.__proto__=user;
console.log(costomer.name);     //now can use data of user object also