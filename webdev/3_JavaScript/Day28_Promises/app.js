let obj=fetch(`http://api.weatherapi.com/v1/current.json?key=701209bd6cb74802bc052144250111&q=Ahmedabad&aqi=yes`);
//here obj is nothing but promise....it fetches the real time weather data 
//three states of promises  ->  pending(data requested but not sent)    resolve(data is sent)   reject(request rejected by server)


/*
obj.then((data)=>{         //.then works only when promise is in resolve state.....data is reached at obj
    console.log(data);
}).catch((abc)=>{            //.catch works only when promise is in rejected state....request decline
    console.log(abc);    //abc shows the error message..or what you want
})
*/

//now fetching actual data from api obj

//Method 1
/*
obj.then((response)=>{
  const obj2=  response.json()            //it is also an promise task
  obj2.then((data)=>{
    console.log(data)
  });
});
*/

//Method2
obj.then((res)=>{
    return res.json();
}).then((data)=>{
    console.log(data);
})