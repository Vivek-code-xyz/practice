const http = require("http")

const server = http.createServer((req,res)=>{
    if(req.url === "/")
        res.end("Hello welcome to my new website")
    else if(req.url==='/a'){
        res.end("you are such a bad guy...go and get some ramen")
    }
    else  res.end("Error : wrong routing")
})

server.listen(2000,()=>{
    console.log("I am listening at port 2000")
})