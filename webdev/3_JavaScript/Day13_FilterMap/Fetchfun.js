//let say you have to make a function in your website fetching data from backend server
//now it should be called after 5 s interval so

function fetch(){
    //code
    console.log("Iam fetching the data");
}

setInterval(fetch,5000);        //this set the interval of 5000ms or 5s and calls the argumented function


//fetch is now a callback function