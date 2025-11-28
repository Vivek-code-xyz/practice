import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/header"
import Footer from "./components/footer";
import Card from "./components/card";
import productDetails from "./utils/DataArray";


//Header


//Main


//Footer


function App() {
  return (
    <>
      {/* header */}
      <Header />
      {/* main */}
      <div id="main">
        {productDetails.map((value, index) => {
          return (
            <Card
              key={index}
              product={value.product}
              offer={value.offer}
              imgurl={value.imgurl}
            />
          );
        })}
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}

//Render
const container = ReactDOM.createRoot(document.getElementById("root"));

container.render(<App />);
