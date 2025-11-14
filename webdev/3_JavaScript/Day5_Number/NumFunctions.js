let num=123.349;
console.log(num.toFixed(2));   //round off upto two decimal places
console.log(num.toPrecision(4));   //how many total digits you want in answer(it will roundup to them)
console.log(num.toPrecision(2));    //two digits with 10 ki power form

console.log(num.toExponential(3));   //in exponentiall form

console.log(num.toString());   //string

//floor and ceil value
let numb=123.344;
console.log(Math.floor(numb))    // previous integer
console.log(Math.ceil(numb))   //next integer