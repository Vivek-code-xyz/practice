const user={
    name:'vivek',
    age:18,
    gender:'male',
    address:{
        hometown:'Barwala',
        district:'Botad',
        pincode:382450
    }
};

console.log(user.address);
console.log(user.address.hometown);


//assign function can only creates deep copy of objects upto one level
//it fails to create deepcopy of nested part of object
const user2=Object.assign({},user);
user2.address.district="Ahmedabad";
console.log(user.address.district);  //it reflacts on user also so shallow copy of internal object is made by assign


//deep copy of nested objects

user3=structuredClone(user);
console.log(user3)
user.address.district="botad";
console.log(user3)
console.log(user)



