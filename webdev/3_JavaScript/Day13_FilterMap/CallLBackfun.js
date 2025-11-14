// A callback function is a function passed as an argument to another function, 
// so it runs after the main function finishes its work.


function hello(func){
    console.log("how are you!");
    func();
}

function next(){
    console.log("i am fine");
}

hello(next);

//in above example the next is the call back function cause it is passed and called as an argument in another function

hello(
    function (){
        console.log("I am function made in argument of another function so its call back");
    }
);

//by arrow function
hello(
    ()=>{
        console.log('I am arrow call back function passed as an argument');
    }
);
