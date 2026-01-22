const express = require("express")

const server = express()

server.use(express.json())    //middle ware ka parcer--->  JSON to js objects

server.use("/route",(req,res,next)=>{      //another middleware storing log
    console.log(`${Date.now()} | Method : ${req.method} | RequestURL : ${req.url}`)
    next()  
})


// these are the actuall routes and only on of them is executed based on method...
server.get('/route',(req,res)=>{
    res.send("Data sent you successfully")
})

server.post('/route',(req,res)=>{
    res.send("Data received successfully")
})

server.delete('/route',(req,res)=>{
    res.send("Data deleted successfully")
})

server.put('/route',(req,res)=>{
    res.send("Data updated successfully")
})

server.patch('/route',(req,res)=>{
    res.send("Data modified successfully")
})



//------------------------------------------------------------------//


server.listen(3030,()=>{
    console.log("I am listening at Port 3030")
})