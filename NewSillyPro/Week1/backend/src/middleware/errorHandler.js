



export const errorHandler = (err,req,res,next)=>{

    if(err.code === 11000){
        const field = Object.keys(err.keyValue)[0]

        return res.status(409).json({
            message : `${field} already exists`,
            success : false,
            status : "fail"
        })
        
    }

    if(err.name === 'ValidationError'){
        // err.errors is an object of all failed fields
        // Object.values gets the error objects
        // .map(e => e.message) extracts the message from each
        const messages = Object.values(err.errors).map(e => e.message)
        return res.status(400).json({
            success: false,
            status: "fail",
            message: messages.join(', ')
            // joins all validation messages: "Email is required, Username too short"
        })
    }

    return res.status(err.statusCode || 500).json({
        success: false,
        status: err.status || "error",
        message: err.message || "Internal Server Error"
    })
}