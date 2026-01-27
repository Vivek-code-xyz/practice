const express = require("express")
const {main} = require("./index")
const {User} =require("./models")

const server = express()


server.use(express.json())


server.get("/info",async (req,res)=>{
    const ans = await User.find({})      //gives all objects
    res.send(ans)
})

server.post("/info",async (req,res)=>{
    try{ 
        const obj = req.body
       await User.create(obj)
        res.send("Added to DB Successfully")
    }catch(err){
        res.send(`Error : ${err}`) 
    }
})


server.delete("/info",async (req,res)=>{
    const field  = req.query
    const {att,val} = field
    await User.deleteOne(field)
    res.send(`User With ${att} = ${val} is Deleted succesfully from database`)
})
 

server.put("/info",async (req,res)=>{
    const person = req.query
    const change = req.body
    await User.updateOne(person,change)
    res.send("User Updated Successfully")
})

main()
.then(async ()=>{
    console.log("Connected To DB Successfully")
    server.listen(9876,()=>{
        console.log("Listening at Port 9876")
    })

    
}
)
.catch(e=>console.log(`Error : ${e}`))
