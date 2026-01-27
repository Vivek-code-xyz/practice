import React from "react";
import {useState,useEffect} from "react"
import ReactDOM from "react-dom/client"

function App(){
    
    const[title,setTitle] = useState("")
    const[amount,setAmount] = useState("")
    const[category,setCategory]=useState("food")
    const[expenses,setExpenses] = useState([])
    const[filter,setFilter] = useState("All")
    const[description,setDescription] =  useState("")
    const [monthFilter, setMonthFilter] = useState("All")


    //Load
    useEffect(()=>{
        const saved = JSON.parse(localStorage.getItem("expenses"))
        if(saved) setExpenses(saved)
    },[])

    //saving the current expense
    useEffect(()=>{
        localStorage.setItem("expenses",JSON.stringify(expenses))
    },[expenses])

    //auto selection the current month
    useEffect(()=>{
        if(expenses.length){
            const now = new Date()
            setMonthFilter(`${now.getMonth()}-${now.getFullYear()}`)
        }
    },[expenses])


    //logic for add Expense
    function addExpense(){
        if(title.trim() === "" || amount.trim() === "") return;

        const now = new Date()

        const newExpense = {
            id : Date.now(),
            title,
            amount,
            category,
            description,
            time : now.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),
            date : now.toLocaleDateString(),
            month: now.getMonth(),   // 0–11
            year: now.getFullYear()
            
        }
        setExpenses(prev=>[newExpense,...prev])
        setTitle("")
        setAmount("")
        setDescription("")
        setCategory("food")

    }

    function deleteExpense(id){
        setExpenses(prev=> prev.filter(e=>e.id!==id))
    }

    // const filteredExpenses = (filter ==="All") ? expenses : expenses.filter(e=>e.category === filter)
    const filteredExpenses = expenses.filter(e => {
        const catOk = filter === "All" || e.category === filter
        const monthKey = `${e.month}-${e.year}`
        const monthOk = monthFilter === "All" || monthKey === monthFilter
        return catOk && monthOk
    })


    const total = filteredExpenses.reduce((sum,e)=>sum+Number(e.amount),0)

    const monthlyTotals = expenses.reduce((acc,e)=>{
        const key = `${e.month}-${e.year}`

        if(!acc[key]) acc[key] = 0
        acc[key] += Number(e.amount)

        return acc
    },{})

    const monthNames = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
    ]

    const monthlyList = Object.entries(monthlyTotals)
        .sort((a,b) => {
            const [m1,y1] = a[0].split("-")
            const [m2,y2] = b[0].split("-")
            return new Date(y2,m2) - new Date(y1,m1)
        })
        .map(([key, value]) => {
            const [m, y] = key.split("-")
            return { label: `${monthNames[m]} ${y}`, total: value }
        })


    const monthOptions = Array.from(
        new Set(
            expenses.map(e => `${e.month}-${e.year}`)
        )
    )


    return(<>
        <div className="app">
            <h1>Expense Tracker</h1>

            <div className="form">
                <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <input type="number" min="1" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>

                <select name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="shopping">Shopping</option>
                    <option value="groceries">Groceries</option>
                    <option value="bills">Bills</option>
                    <option value="medicine">Medicines</option>
                </select>

                <input type="text" placeholder="Add description" value={description} onChange={(e)=>setDescription(e.target.value)}/>

                <button onClick={addExpense}>Add Expense</button>
            </div>

            <div className="filters">
                <div className="filterCat">
                    <select name="category" id="filter" value={filter} onChange={e=>setFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="shopping">Shopping</option>
                        <option value="groceries">Groceries</option>
                        <option value="bills">Bills</option>
                        <option value="medicine">Medicines</option>

                    </select>
                </div>

                <div className="filterMon">
                    <select value={monthFilter} onChange={e=>setMonthFilter(e.target.value)}>
                        <option value="All">All Months</option>
                        {monthOptions.map(m => {
                            const [mo, yr] = m.split("-")
                            return (
                                <option key={m} value={m}>
                                {monthNames[mo]} {yr}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>


            <h2>Total Expense : ₹{total}</h2>

            <h2>Monthly Totals</h2>
            <ul className="monthly">
                {monthlyList.map((m, i) => (
                    <li key={i}>
                    {m.label}: ₹{m.total}
                    </li>
                ))}
            </ul>


            <div className="grid">
                {
                    filteredExpenses.map(e=>(
                        <div className="card" key={e.id}>
                            <h3>{e.title}</h3>
                            <p className="amount">₹{e.amount}</p>
                            <p className="cat">{e.category}</p>
                            <p className="desc">{e.description}</p>
                            <div className="datetime">
                                <span>{e.time}</span>
                                <span>{e.date}</span>
                            </div>
                            <button onClick={()=>deleteExpense(e.id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    </>)
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)