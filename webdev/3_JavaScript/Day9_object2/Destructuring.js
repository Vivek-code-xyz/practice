//destructuring of an Object

const me={
    name:'vivek',
    age:18,
    gender:"male",
    hobby:'reading',
    weight:45
}

const {name:My_name,age:Umar}=me;
console.log(My_name);

const {age,weight:vajan,...obj1}=me       //here the ... means rest operator it will give all rest values to the obj1 from me

console.log(age,vajan);
console.log(obj1);


//destructuring of the nested object

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

const {name}=user;
console.log(name);

//now for layer2
const{address:{pincode}}=user;
console.log(pincode)