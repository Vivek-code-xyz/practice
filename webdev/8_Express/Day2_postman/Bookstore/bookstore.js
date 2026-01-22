const express = require("express")

const app = express()


const BookStore = [
    { id: 1, name: 'Harry Potter', author: 'Iampotee' },
    { id: 2, name: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: 3, name: '1984', author: 'George Orwell' },
    { id: 4, name: 'The Alchemist', author: 'Paulo Coelho' },
    { id: 5, name: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki' },
    { id: 9, name: 'Rich mom poor mom', author: 'Robert Kiyosaki' }
];

app.use(express.json())

app.get("/book",(req,res)=>{

    const books = BookStore.filter(item=>item.author === req.query.author)
    res.send(books);
})

app.get("/book/:id",(req,res)=>{
    const ids = parseInt(req.params.id)
    const book = BookStore.find(item=>item.id===ids)
    res.send(book)
})


app.post('/book',(req,res)=>{
    BookStore.push(req.body)
    res.send("Data saved sucessfully")
})

app.delete("/book/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const idx = BookStore.findIndex(item=>item.id === id)
    const book = BookStore.splice(idx,1);
    res.send("Object Removed Successfully")
})

// app.patch("/book")
app.patch("/book",(req,res)=>{
    const obj = req.body
    const book = BookStore.find(item=>item.id === obj.id)

    if(obj.author){
        book.author = obj.author;
    }
    else if(obj.name){
        book.name = obj.name
    }
    res.send("Patch updated succesfully")
})

app.put("/book",(req,res)=>{
    const obj = req.body
    const book = BookStore.find(item=>item.id === obj.id)

    
        book.author = obj.author
    
    
        book.name = obj.name
    
    res.send("Put updated succesfully")
})


app.listen(8080,()=>{
    console.log("Listening at 8080")
})