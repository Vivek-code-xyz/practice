import React from "react";
import ReactDOM from "react-dom/client";


//you can not write JS Statements like initialisation in JSX code..like object defination

function hello(name){
    return <h1>Hey ! {name}, Glad to See You</h1>
}

//props is the js object which takes values of Function call From JSX code 
//jsx function must start with capital letter
function Greet(props){
    return <h2>Hey there your name is {props.n} and your age is {props.a}</h2>
}

const container=ReactDOM.createRoot(document.getElementById('root'));

container.render(hello("Vivek"));

//function call syntax of JSX code 
const jsxFunCall= <Greet n="vivek" a="24"/>
container.render(jsxFunCall);