//set
//set can not accept or store the duplicate values..

const s= new Set([10,20,30,10]);

console.log(s);

const st=new Set();
st.add("vivek");
st.add(90);
st.add(40);
st.add(64);

st.delete(40); //delete the value present in the set

console.log(st);

console.log(st.has('vivek'));

st.clear(); //clears the set
console.log(st)


//convert array into set

let arr=[12,23,45,12,34,23];
const set1=new Set(arr);
console.log(set1);

//convert set into array

arr=[...set1];
console.log(arr);


//union of two sets
let st1=new Set([10,20,30,40]);
let st2=new Set([40,50,60,10]);

let st3=new Set([...st1,...st2]);
console.log(st3);

//intersection of two sets

//using filter
const result = [...st1].filter((n)=>{
    return st2.has(n);
})

console.log(result);


//iterate over set
for(let a of st1){
    console.log(a);
}
console.log(" ");

//set has its own iterator

st2.forEach((v)=>{
    console.log(v);
})