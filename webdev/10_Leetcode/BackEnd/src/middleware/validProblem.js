
export const validateProblem = (req,res,next)=>{
    let missing 
    const keys = ['title','description','difficulty',
        'tags','visibleTestCases','hiddenTestCases',
        'startCode','referenceCode']
    try{
        missing = keys.filter(ele=>req.body[ele] == null )

        if(missing.length>0){
            throw new Error("Please Provide all the missing Values")
        }

        next()
    }catch(e){
        res.status(401).send("Missing values : "+missing+" : "+e.message)
    }
}