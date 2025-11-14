/*In JavaScript, the this keyword is a special reference that points to the object that is currently executing the code.
But what it points to depends on how and where it's used.*/

//for global context this keyword points to global object and all the globally declared variables can be accessed using this. operator
//In browser : this->window
//In node js : this->Module's exports objects

/*------------------------------------------------------------------------------------------------------------ */

let a=10;
let b=20;
var c=20;
console.log(this===window);
console.log(this.c);
console.log(this);

/*------------------------------------------------------------------------------------------------------------ */

//Inside a Function
//in defalut(non strict mode) this points to global inside any functions
function greet(){
    console.log(this)
}
greet();  //global

//but in strict mode this points toward undefined...

function meet(){
    "use strict";
    console.log(this);
} 
meet();  //undefined
window.meet();   //in strict mode if you give context of object(here window) so now this points to window (global)

/*------------------------------------------------------------------------------------------------------------ */

//Inside an object or method


const obj={
    name:"rohit", age:20, greet: function(){
        console.log(this);
        console.log(this.name);
    }
}

obj.greet(); //inside an method or objectfunction this points to object itself

/*------------------------------------------------------------------------------------------------------------ */

//Arrow function dont have this keyword of thiar own
//they inherit it form th surrounding scope...

let op={
    name:'vivek',
    that:()=>{
        console.log(this);
    }
}

op.that();  //since the object is placed in global scope the arrow inherit this key from global so 
//this will points towards global object or window

/*------------------------------------------------------------------------------------------------------------ */

//this inside class 

class person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
}

let ab= new person('vivek',18);
console.log(ab);

//inside class.. this points towards instance or(data) of the object being created or...
// this is point towards constructor of object being created
