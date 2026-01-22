const ex = require("express")

const app = ex()

app.use(express.json())


app.use("/guru",(req,res,next)=>{       //this is initiall endpoint
    console.log("I am first Function")
    next()
})

app.use("/guru",(req,res,next)=>{     //this is middleware function
    console.log("I am middleWare function")
    next()
})

app.use("/guru",(req,res,next)=>{
    console.log("I am also middleware Cause I Did not resolve the request or send the response")
    next()
})

app.use('/guru',(req,res)=>{
    console.log("I am request handler because i send responce upon request by frontend")
    res.send("Here is your response front..enjoy")
})

app.listen(4034,()=>{
    console.log("I am listening at port 4034")
})