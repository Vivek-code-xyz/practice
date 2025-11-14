//globle object

//from where the console.log() etc functions are coming?

console.log("I am printing function because i am coming from global object");
console.log(Math.random());


console.log(global);

//every js environment has different meaning of global variable like chrome has window but node has global

//globalThis keyword introduced to point towards global object irrespective of environment

console.log(globalThis.Math.random()*10);