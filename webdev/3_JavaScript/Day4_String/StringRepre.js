//string in js

let str1="hello my name is vivek khasiya";
let str2='hello your name is undefined';
let str3=`hello our name is vivek and undefined`;  //having advantage
console.log(str1,str2,str3);

let price=50;

console.log("price of the tomato is",price); //it displays normal variable
console.log(`Price Of the Tomato Is ${price}`); //it displays values from backend 

//string concatenation

let s1="hello ";
let s2="coder army";
let s3=s1+s2;
console.log(s3);

//length;
console.log(s3.length);


// --->  print this --->"hello moto" with double quatation mark...

console.log('"hello moto"');
console.log("'hello moto'");

let msg="You are very chalak bro \n and also very dumb bro";
console.log(msg);


// now print /n                                         --->  (  \  )is ==> escape charecter

console.log("\\n");


//indexing in string   -->0 base indexing of the charecters

let messege="Elisabeth";
console.log(messege[1]);
console.log(messege[2]);
console.log(messege[4]);
console.log(messege.charAt(3));

let ring="hello YoE Ehfh";

//to upper case
console.log(ring.toUpperCase());
//to lowercase
console.log(ring.toLowerCase());
//it creates new string and does not change the parent string
console.log(ring);

