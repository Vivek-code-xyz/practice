//replace

let str="hello ji kaise ho ji badiya ji?";

console.log(str.replace("ji","money"));
console.log(str.replaceAll("ji","money"));

//split delebrator

str="money,honey,bunny,funny,sunny";
console.log(str.split(","));
console.log(str.split("y"));  //splite string into array according to specified charecter

//trim

str="  hello ji ";
console.log(str.trim());    //removes the extra spaces from start and end
console.log(str.trimStart());
console.log(str.trimEnd());



//new way to create a string

let string= new String("hello codeer army");   //string created as object
console.log(string);
console.log(typeof string)  ///object