//declare function in ts
function meet(name:string):number{                                //the external number shows return type
    console.log("hello "+name+" how are you !");
    return name.length;
}

//function with defauld parameter
function grade(name:string="vivek"):string{
    let grad:string = 'A+';
    console.log("hey "+name+" you got a "+grad+" grade");
    return grad;
}

meet('riya');grade();

//function with optional parameter

function gate(person?:string){             //it is of void return type so dont mention it
    console.log("Best of luck for your GATE exam "+ (person||"Bro!"))
}
gate("vivek");
gate();

//Arrow function

const sumof = (a:number,b:number):number=>{
    return a+b;
}

console.log(sumof(5,8));

//Callback function

function place(order:string,callback:(a:number)=>void){
    const price:number=order.length*14;
    callback(price);
}

place("RajmaChaval",(amount:number)=>{
    console.log("you Have to pay ₹ ",amount);
    return amount;
})


// rest parameter
function total(...arr:number[]):number{
    let suming:number=0;
    arr.forEach((val:number)=>{
        suming=suming+val;
    });
    console.log(suming)
    return suming;
}

total(12,45,3543,6345,23423,6456,2345,2324,64654,674534);