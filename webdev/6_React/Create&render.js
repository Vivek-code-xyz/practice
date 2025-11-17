 const h1=React.createElement("h1",{},"Hello This is my first Created Element using React");
const h2=React.createElement("h2",{},"And this is Probably second!")

//render this in #root div
const rootcontainer=ReactDOM.createRoot(document.getElementById("root"));

rootcontainer.render(h1); //this only shows single attribute
// rootcontainer.render(h2);        and if you again run it for different then it overrides first and hq1 will not visible anymore

