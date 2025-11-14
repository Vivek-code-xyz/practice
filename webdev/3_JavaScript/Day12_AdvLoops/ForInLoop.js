// it can access the keys of the object
//keys are its own and also inharit from other objects

const obj={
    name:'vivek',
    age:15,
    salary:230000

};

for(let a in obj){
    console.log(a);
}


//difference

let obj2=Object.create(obj)     //now obj2 inharits the key:values of obj1

obj2.id=1234;                   //keys and values of obj2 of its own
obj2.class="computer";

console.log(Object.keys(obj2));    //this prints only its keys not inherited from obj

//to print all the keys weather it is its own or inherited use for in loops
for(let a in obj2){
    console.log(a);
}



//remember this cannot print the inbuilt prototype key and its functions
