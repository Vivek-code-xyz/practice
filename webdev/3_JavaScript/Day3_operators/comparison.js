// ==   <    >    <=    >=    !=  ===


//IMP :   Null can only be equivalent to undefined for operator == 
// and for all the rest ones there is type coversion to a number for both the l and r values

console.log(null==undefined)  //true
console.log(null===undefined)  //false

//=== first checks the type and then check the value if type is same

//== first converts the values into number or same variable type and then check if both are same or not
let str='124'
let a=124;

console.log(str==a)  //true
console.log(str===a)  //false


// for == null can only be equal to undefined
//for rest comparison operators...null is converted to type or number (0) and then comparizon happens
// for == undefined is only give true for null
// for rest operators... it is converted to NaN and then type checks....and 

//NaN never gives true for any comparizons
console.log(NaN==NaN)  //false