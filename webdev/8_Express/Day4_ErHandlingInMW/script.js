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

server.post('/admin',(req,res)=>{
    
    
        foodMenu.push(req.body)
        res.status(201).send("Item Added Successfully")
    
})

server.delete("/admin/:id",(req,res)=>{
  
        const ids = parseInt(req.params.id)
        const idx = foodMenu.findIndex((item)=>item.id === ids)

        if(idx == -1) res.send("Item does not exist")

        foodMenu.splice(idx,1)

        res.status(200).send(`item with id ${ids} is removed successfully`)
    
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


server.listen(9876,()=>{
    console.log("Listening at Port 9876")
})