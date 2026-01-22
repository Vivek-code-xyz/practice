const express = require("express")

const server = express()

server.get("/user",(req,res)=>{         //this is known as api end points
    // res.send("Hello coder army")
    res.send({name:"vivek",age:23})
})
 

//parsing
server.use(express.json())


server.post("/user",(req,res)=>{
    console.log(typeof req?.body.age)
    res.send("Data saved sucessfully")
})





server.listen(8080,()=>{
    console.log("I am listning at port 8080")
})