let obj={
    name:'vivek',
    age:12,
    amount:990,
    city:'barwala'
};

const key=Object.keys(obj);

console.log(key);

//derive all the data through this key array using loops

for(let i=0;i<key.length;i++){
    console.log(obj[key[i]]);
}


