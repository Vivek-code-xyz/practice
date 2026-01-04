import React,{useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/header"
import Footer from "./components/footer";
import Card from "./components/card";
import productDetails from "./utils/DataArray";


//Header


//Main

// document.getElementById('filter').addEventListener("click",()=>{
//   productDetails
// })
//Footer


function App() {

  let [A,setA] = useState(productDetails);
  
  function sortingArr(){
    A.sort((a,b)=>a.price-b.price);
    setA([...A]);
  }

  function sortingArrdesc(){
    A.sort((a,b)=>b.price-a.price);
    setA([...A]);
  }
  
  function below500(){
    const B=productDetails.filter((val)=>val.price<=500);
    
    setA(B);
  }
  
  function above500(){
    const C = productDetails.filter((val)=>val.price>500); 
    
    setA(C);
  }

  function clearall(){
    setA([...productDetails]);
  }

  return (
    <>
      
      <Header />
      
      <div className="filt">
        <span > Filters :  </span>
        <button onClick={sortingArr}>Price L--H</button>
        <button onClick={sortingArrdesc}>Price H--L</button> |
         <button onClick={below500}>below 500</button>
        <button onClick={above500}>above 500</button>
        <button onClick={clearall}>Clear All Filters</button>
      </div>
      <div id="main">
        {A.map((value, index) => {
          return (
            <Card
              key={index}
              product={value.product}
              offer={value.offer}
              imgurl={value.imgurl}
              prices={value.price}
            />
          );
        })}
      </div>
      
      <Footer />
    </>
  );
}

//Render
const container = ReactDOM.createRoot(document.getElementById("root"));

container.render(<App />);
