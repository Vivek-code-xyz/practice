import validator from 'validator'

export default function validate(data){
    
        const mandatoryfields = ['firstName','emailId','password']

        const isallowed = mandatoryfields.every(k => data?.[k])

        //this ensures that all the mandatory fileds is present in the data object

        if(!isallowed){
            throw new Error("Required Fields are missing")
        }

        if(!validator.isEmail(data.emailId)){
            throw new Error("Invalid Email")
        }
        if(!validator.isStrongPassword(data.password)){
            throw new Error("Weak Password..")
        }

        if(data.firstName.length <3 || data.firstName.length >20){
            throw new Error("Inappropriate Length for the First Name")
        }
    


}