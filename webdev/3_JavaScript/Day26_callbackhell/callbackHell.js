//call back hell by domino's

function placeOrder(call){
    console.log('You Selected The Order');
    setTimeout(()=>{
        console.log('Restorent Has Approved Your Order');
        call();
    },3000);
}

function PrepareOrder(call){
    console.log('Preparing Your Order...Wait a While');
    setTimeout(()=>{
        console.log("Your Order Is Prepared...");
        call();
    },4000)
}

function PickupOrder(call){
    console.log('Your Order Is Ready for Pick Up');
    setTimeout(()=>{
        console.log('Your Order Is Picked Up by Delivery Partner');
        call();
    },3000)
}

function DeliverOrder(){
    console.log('Your Order Is On The Way....');
    setTimeout(()=>{
        console.log('Your Order Is Arrived...Enjoy The Time');
        console.log("THANK YOU FOR CHOOSING DOMINO'S.");
    },5000);
}


//now this is call back hell----> function calls callback function that again calls callback and again callback
placeOrder(()=>{
    PrepareOrder(()=>{
        PickupOrder(()=>{
            DeliverOrder();
        })
    })
})

