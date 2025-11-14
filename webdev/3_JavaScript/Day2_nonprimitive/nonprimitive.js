//array   object   function


//array
let arr=[10,20,30]

console.log(arr)

//array can store any type of data number and string together also

let a=[10,20,"vivek",20.34,false]

console.log(a)
console.log(typeof a)         //array is the object in js


//object     --->    key:value   pair

let obj={
    Name:"Vivek Khasiya",
    Enrollment_no:"240280107155",
    age:18,
    Education:'B.E / B.Tech in Computer Engineering',
    College:'L.D College Of Engineering',
    gender:"Male"
}

console.log(obj);


let fun=function(){
    console.log("this function is called");
    return null;
}

fun();
console.log(fun())
console.log(typeof fun)