const {sumof,diffof} = require("./sec")

// with above statement, the code in sec.js file will be wraped by a imidiate calling function
/* 
    (function (){
        console.log("i am code written in second.js")

        function sumof(a,b){
            return a+b;
        }
    })()
*/


console.log(sumof(4,6))

console.log("this is code written in first file")
console.log("I have imported the sec.js file in this file using require statement")