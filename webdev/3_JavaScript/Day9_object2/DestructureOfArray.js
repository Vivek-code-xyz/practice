const arr=[2,4,5,12,34,3,21];

const[first,sec,,third]=arr;  //each position refers to the value stored in respective array position
// remember that first sec and third are variable name not position

console.log(first,sec,third);

const[one,,two,...three]=arr;   //here one and two are simple variable but three is the array
console.log(one,two,three);         
         

