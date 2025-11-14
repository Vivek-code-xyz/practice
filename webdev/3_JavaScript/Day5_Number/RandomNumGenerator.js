//By using Math  object

console.log(Math.random());        // 0 <= x  < 1

//to generate from 0 to 9

console.log(Math.floor(Math.random()*10));

//to generate 1 to 100
console.log(Math.ceil(Math.random()*100));
console.log(Math.floor(Math.random()*100  + 1));

//to generate 11 to 20     ---> 0---9 + 11 --> 11---20
console.log(Math.floor((Math.random()*10))+11);

/*
    To Generate the specific Range Of Numbers from  let    X---to---Y
    formula is ---->   Math.floor( Math.random()* (Y-X+1)  +  X);

    (Y-X+1) is Nothing but total Numbers to be generated
    and + X shifts the total number to the reqired range.....

*/

// generate   43 to 67

console.log(Math.floor((Math.random()*(67-43+1))  + 43));