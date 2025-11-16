class Person{
    name:string;
    age:number;

    constructor(n1:string,n2:number){
        this.name=n1;
        this.age=n2;
    }

    //in classes you dont have to mention function keyword for any function

    greet():void{
        console.log(`Hi Mr. ${this.name}, How Are You Feeling!`);
    }
}

let obj1=new Person("vivek",18);
let obj2=new Person("Param",10);

console.log(obj2);

//extend keyword  --> it lets you use the predefined interface

interface human{name:string,age:number};

interface Teacher extends human{salary:number};      //now teacher has two fields from human and one of its own

const kirtan:Teacher = {
    name:"kirtan",age:17,salary:23
};


//---------------------------------------------------------------------------------------
//inheritance in classes   and public private protected 
/*
public --> access everywere in code
private --> access only in its class
protected-->acceess in its class and its child class also
*/




class child{
    public name:string;
    protected age:number;

    constructor(n1:string,n2:number){
        this.name=n1;
        this.age=n2;
    }
}

class student extends child{
    standerd:number;

    constructor(st:number,n1:string,n2:number){
        super(n1,n2);
        this.standerd=st;
    }
}

let vivek=new student(12,'vivek',18);
console.log(vivek);


//------------------------------------------------------------------------------------------------------------
//Generics : Templates

function display<T>(a:T):T{
    console.log(a);
    return a;
} //now we make a generic function display... here <T> is templete and it becomes the type of variable passing to the function

display('vivek');
display(14);
display(true);
const arr: number[]=[22,232,5345,23423];
display(arr);
display(vivek) ;        //<T> takes type of variable passing to a function


//Now Generic on objects
interface admin<T,U>{
    name:string;
    age:number;
    salary:T;
    position:U;
}

let param:admin<number,string>={
    name:'param',age:15,salary:345,position:"clerk"
}

display(param);