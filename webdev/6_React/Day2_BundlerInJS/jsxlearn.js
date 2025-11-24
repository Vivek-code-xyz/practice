import React from "react";
import ReactDOM from "react-dom/client";

//you can also use js elements inside jsx code
 const name='vivek'

 // abc is the React element at the end writen in JSX code
const abc= <>
    <h1 money={25}>Hello To kaise hai aap log</h1>
    <h2>I hope you are very well Mr. {name}</h2>
</>

//REACT COMPONENTS-------------
//function based
function greet(){
    return <h2 className="do_not_use_class_keyword_in_JSX">Aur Bhai Kya Halchal</h2>
}

const reactcommp= greet();





//remember that the style attribute demands an object in JSX code... so pass an object wraped in { }..

const cotainer=ReactDOM.createRoot(document.getElementById("root"));

cotainer.render(abc);
cotainer.render(reactcommp);
