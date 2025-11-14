//write a function for sum of any numbers count

const sum = function(...num){
    console.log(num);
}

sum(2,3,4,5,6,7,8);



let obj = {
    name:'vivek',
    amount : 450,
    age :13
}

//write function to print name and age of obj only

function fun (obj){
    console.log(obj.name,obj.age);
}

//by destructuring
function func({name,age}){
    console.log(name,age);
}

fun(obj); 
func(obj);


