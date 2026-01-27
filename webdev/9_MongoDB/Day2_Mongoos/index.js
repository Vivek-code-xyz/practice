const mongoose = require("mongoose")
const User = require("./server")
// const {Schema} = mongoose

async function main(){
    mongoose.connect("mongodb+srv://khasiyavivek97123_db_user:K3ABEs7rnXSydFy8@cluster1.zmerf1l.mongodb.net/VivekDB")

   
 
    //creating model or collection
    // const User = mongoose.model("user",userSchema)

    //now creation and user and add it to the collection (network call here)
    // const user1 = new User({name:"vivek",age:33,gender:"Male",city:"Botad"})
    // await user1.save()

    //second method
    // await User.create({name:"aman",age:32,gender:"Male",city:"Ahmedabad"})
    // await User.insertMany([{name:"riya",age:23,geder:"Female"},{name:"karan",gender:"Male",city:"Rajkot"}])

    //find
    // const ans = await User.find({})      //gives all objects
    // console.log(ans)

    //find via field
    // const vivekdata =  await User.find({name:"vivek"})
    // console.log(vivekdata)
}



module.exports={
    main
}