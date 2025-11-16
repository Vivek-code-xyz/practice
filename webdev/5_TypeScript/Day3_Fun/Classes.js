"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    name;
    age;
    constructor(n1, n2) {
        this.name = n1;
        this.age = n2;
    }
    //in classes you dont have to mention function keyword for any function
    greet() {
        console.log(`Hi Mr. ${this.name}, How Are You Feeling!`);
    }
}
let obj1 = new Person("vivek", 18);
let obj2 = new Person("Param", 10);
console.log(obj2);
;
; //now teacher has two fields from human and one of its own
const kirtan = {
    name: "kirtan", age: 17, salary: 23
};
//---------------------------------------------------------------------------------------
//inheritance in classes   and public private protected 
/*
public --> access everywere in code
private --> access only in its class
protected-->acceess in its class and its child class also
*/
class child {
    name;
    age;
    constructor(n1, n2) {
        this.name = n1;
        this.age = n2;
    }
}
class student extends child {
    standerd;
    constructor(st, n1, n2) {
        super(n1, n2);
        this.standerd = st;
    }
}
let vivek = new student(12, 'vivek', 18);
console.log(vivek);
//------------------------------------------------------------------------------------------------------------
//Generics : Templates
function display(a) {
    console.log(a);
    return a;
} //now we make a generic function display... here <T> is templete and it becomes the type of variable passing to the function
display('vivek');
display(14);
display(true);
const arr = [22, 232, 5345, 23423];
display(arr);
display(vivek); //<T> takes type of variable passing to a function
let param = {
    name: 'param', age: 15, salary: 345, position: "clerk"
};
display(param);
//# sourceMappingURL=Classes.js.map