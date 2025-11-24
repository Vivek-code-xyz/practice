import React from "react";
import ReactDOM from "react-dom/client"



const h1=React.createElement("h1",{},"Hello This is my first Created Element using React");
const h2=React.createElement("h2",{},"And this is Probably second!")

//render this in #root div
const rootcontainer=ReactDOM.createRoot(document.getElementById("root"));

// rootcontainer.render(h1); 
// rootcontainer.render(h2); this wont work so wrap both in another div

const div=React.createElement("div",{},[h1,h2]);

rootcontainer.render(div);
       