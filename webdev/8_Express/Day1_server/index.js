const express = require("express")

const server = express()



// now routing
server.use("/vivek/:id",(req,res)=>{
    console.log(req.params)
    res.send("hello dosto its your routing page descriptions")
})
server.use("/contact",(req,res)=>{
    res.send("you can contact me at any of these numbers...")
})
server.use("/home",(req,res)=>{
    res.send("Home is here dear...")
})

// make sure to always put home route at last for no error of presumeness 
server.use("/",(req,res)=>{
    res.send({"name":"Vivek Khasiya","age": 23 , "Gender" : "Male","bias" : "Grand"})
})



server.listen(8080,()=>{
    console.log("Listening Right Now")
})