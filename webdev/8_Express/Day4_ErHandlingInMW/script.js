const express = require("express")
const {Auth} = require("./auth.js")
const server = express()

//database
const foodMenu = [
  { id: 1, food: "Dosa", category: "veg", price: 70 },
  { id: 2, food: "Idli", category: "veg", price: 40 },
  { id: 3, food: "Vada", category: "veg", price: 35 },
  { id: 4, food: "Paneer Butter Masala", category: "veg", price: 180 },
  { id: 5, food: "Veg Biryani", category: "veg", price: 150 },
  { id: 6, food: "Chicken Biryani", category: "non-veg", price: 220 },
  { id: 7, food: "Butter Chicken", category: "non-veg", price: 250 },
  { id: 8, food: "Fried Rice", category: "veg", price: 120 },
  { id: 9, food: "Noodles", category: "veg", price: 110 },
  { id: 10, food: "Gulab Jamun", category: "dessert", price: 60 }
];

//cart array for user

const cart=[]

server.use(express.json())

server.use('/admin',Auth)

server.get('/food',(req,res)=>{      //both user and admin can see all the registred food items on db
    res.status(200).send(foodMenu)
})

server.get("/cart",(req,res)=>{
    if(cart.length === 0) res.send("Cart is empty! Please select items to add")
    res.status(200).send(cart)
})

server.post('/admin',(req,res)=>{
    
    
    foodMenu.push(req.body)
    res.status(201).send("Item Added Successfully")
    
})

server.post("/cart/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const fooditem = foodMenu.find(item=>item.id === id)
    cart.push(fooditem)
    res.status(201).send("item Added to cart Successfully")
    
})


server.delete("/admin/:id",(req,res)=>{
  
        const ids = parseInt(req.params.id)
        const idx = foodMenu.findIndex((item)=>item.id === ids)

        if(idx == -1) res.send("Item does not exist")

        foodMenu.splice(idx,1)

        res.status(200).send(`item with id ${ids} is removed successfully`)
    
})

server.delete("/cart/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const idx = foodMenu.findIndex((item)=>item.id === id)

    if(idx == -1) res.send("Item does not exist")

    cart.splice(idx,1)
    res.status(200).send("item removed successfully")
    
})

server.patch('/admin',(req,res)=>{
        const ids = req.body.id
        const fooditem = foodMenu.find(item=> item.id == ids)
        if(fooditem){
            if(req.body.food) fooditem.food = req.body.food
            if(req.body.category) fooditem.category = req.body.category
            if(req.body.price) fooditem.price = req.body.price

            res.status(200).send("Updated successfully")
        }
        else{
            res.status(201).send("Item not found")
        }
})

//error handling
server.get("/greet",(req,res)=>{
    try{
        JSON.parse("this is string of invalid json")   //this code throws error
        // JSON.parse(`{"name":"this is valid JSON"}`) 
        res.send("Hello i am rohit negi")
        throw new Error("Can not parse invalid JSON formate") //this line sends your descripted msg error to catch block if error is caused else not executes at all
    }
    catch(err){
        res.send("Error occured : "+err)
    }
})


server.listen(9876,()=>{
    console.log("Listening at Port 9876")
})