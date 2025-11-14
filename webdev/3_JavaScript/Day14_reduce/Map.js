//map is simply a key value pairs
//here key is of any type even object can be treated as key and value aslso

const mp=new Map();
mp.set('vivek','islegend');
mp.set(20,'rohit');
mp.set('i am best',true);

console.log(mp);

//key of the map should be unique
mp["viv"]="cool boy";  //feeding this value in the map can cause error so avoid it
console.log(mp);

console.log(mp.has(20));
console.log(mp.has("viv"))

mp.clear();
console.log(mp);

//map ko banane ka dusra tarika

const map=new Map([
    ['vivek',20],
    [20,45],
    [34,'kirtan'],
    ['het',89]
]);

console.log(map);

//iterate over map
for(let [a,b] of map){
    console.log(a,' ',b);
}



