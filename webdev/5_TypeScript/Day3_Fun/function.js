"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//declare function in ts
function meet(name) {
    console.log("hello " + name + " how are you !");
    return name.length;
}
//function with defauld parameter
function grade(name = "vivek") {
    let grad = 'A+';
    console.log("hey " + name + " you got a " + grad + " grade");
    return grad;
}
meet('riya');
grade();
//function with optional parameter
function gate(person) {
    console.log("Best of luck for your GATE exam " + (person || "Bro!"));
}
gate("vivek");
gate();
//Arrow function
const sumof = (a, b) => {
    return a + b;
};
console.log(sumof(5, 8));
//Callback function
function place(order, callback) {
    const price = order.length * 14;
    callback(price);
}
place("RajmaChaval", (amount) => {
    console.log("you Have to pay ₹ ", amount);
    return amount;
});
// rest parameter
function total(...arr) {
    let suming = 0;
    arr.forEach((val) => {
        suming = suming + val;
    });
    console.log(suming);
    return suming;
}
total(12, 45, 3543, 6345, 23423, 6456, 2345, 2324, 64654, 674534);
//# sourceMappingURL=function.js.map