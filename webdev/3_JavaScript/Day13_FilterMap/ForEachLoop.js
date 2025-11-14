let arr=[12,23,21,34,22];

//callback
arr.forEach(function(num){
    console.log(num);
});

// arr.forEach(num=>console.log(num))

let ar=[1,2,3,4,5];

ar.forEach((num,idx)=>console.log(idx,num));

ar.forEach((num,id,ar)=>{
    ar[id]=num*2;
})


console.log(ar);


// forEach() runs a function for every element in an array.  
// It gives access to element, index, and the whole array.  
// It does not return a new array, only performs actions.  
// Cannot use break or continue inside it.
