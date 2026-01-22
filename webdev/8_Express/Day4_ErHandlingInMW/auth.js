

const Auth = (req,res,next)=>{  //this is middleware for authentication
    const token = "ABCD"
    const access = (token ==="ABCD")?1:0
    if(!access) res.status(403).send("No permission to login")
    next()
}

module.exports = {Auth}