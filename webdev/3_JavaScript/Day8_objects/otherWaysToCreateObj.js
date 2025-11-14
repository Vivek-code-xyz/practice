//create object
const person =new Object();

person.name='vivek';
person.age=17;
person.gender='male';

console.log(person)

//delete
delete person.age;
console.log(person)

//update or modify
person.name='paramsundari';
person.sex='female'
console.log(person)


///2nd methode

class Persons{
    constructor(name,age,gender){
        this.name=name;
        this.age=age;
        this.gender=gender;
    }
}

const per1=new Persons("rohit",15,'male');
console.log(per1);

const per2=new Persons('mohit',90,"female")
console.log(per1,per2);

