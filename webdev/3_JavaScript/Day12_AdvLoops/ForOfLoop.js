let arr=[2,3,4,5,6,7];

for(let i of arr){
    console.log(i);
}

let str='vivek khasiya';
for(let a of str){
    console.log(a);
}

//REMEMBER

//for in loop iterate over keys of object or array
//for of loop iterate over directly values of array or string or object


//NOTE

//do not use for in loop in arrays cause array is the object so some times external arr.name='vivek' is added toit
//so the key of array becomes name which is draw back of js as array as only number as keys so for inloop
//directly prints name as key of object which is inconsistent


//do not use for of loop in object
//because the for of loop in object is not iterable by values

const obj={
    name:'vivek',
    age:14,
    gender:'male',
}

// for(let a of obj){ 
//     console.log(a);
// }          //it will give an error
// symbol.iterator is not defined for object but it is defined for string and array

for(let a of Object.values(obj)){      //now we can iterate through obj using for of loop by converting obj into array

    console.log(a);
}


