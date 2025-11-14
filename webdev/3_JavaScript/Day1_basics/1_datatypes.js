
//number string null boolean undefined bigint 

//number : integer float and decimals
let num=15;
console.log(num);
console.log(typeof num);     //typeof shows datatype of value stored in the variable


//string
let str="vivek";
console.log(str)
console.log(typeof str)       //semicolon is not necesssary....

//boolean
let flag=true;
console.log(flag);
console.log(typeof flag);

//null
let balence=null;
console.log(balence); //when you havent have value for variable so put null value to it
console.log(typeof balence)        //this is javascript error that shows null as object rather than data type


//undifined
let car;
console.log(car)
console.log(typeof car);    //this is automatic data type that defines on variable when you dont fill values in it


//bigint
let numb=52476925767587257295n;      //bigint is used to store numbers exeeding 64 bit number data type
console.log(numb)
console.log(typeof numb)



//limit of let keyword

console.log(Number.MAX_SAFE_INTEGER);       // 2^53-1  NOT 2^63-1
      
console.log(Number.MIN_SAFE_INTEGER);       // -(2^53-1)  NOT (-2^63-1)
