
let dt=new Date();
console.log(dt)
console.log(dt.toDateString());
console.log(dt.toString());
console.log(dt.toISOString());

console.log(dt.getDate());   //gets date only
console.log(dt.getDay())   //get day of the week with index is the zero
console.log(dt.getFullYear()); //get year
console.log(dt.getMonth());  //get month but indexing is the zero
console.log(dt.getTime())   //gets milliseconds counts from 1 jan 1970 from midnight
console.log(dt.getMinutes());   

let dates= new Date(2024,6,23);
console.log(dates.toDateString());
console.log(dates)

//string has the 1 based indexing 
//number has the 0 based indexing
// formate: year month date hour minute second millisecond

const d=new Date(2024,4,23,4,54,333,2222);
console.log(d.toTimeString())


