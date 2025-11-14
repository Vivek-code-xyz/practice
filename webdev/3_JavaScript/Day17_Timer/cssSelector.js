const ids=document.querySelector('#first');
ids.innerHTML = 'hello Paplu';

const list=document.querySelector(".header2");
list.style.backgroundColor = "pink";

const obj=document.querySelectorAll('.header');

obj[0].style.backgroundColor = 'purple';
obj[1].style.backgroundColor = 'yellow';

for(let i=0;i<obj.length;i++){
    obj[i].style.color='white';
}

//object are iteratable so
for(let val of obj){
    console.log(val);
}

//convert a node list into array 
//now our obj is the nodelist not array so u can not apply map operations to it

objkaarray=Array.from(obj);

console.log(objkaarray);


//---------------------------------------//

//access by tag name
let b=document.getElementsByTagName('h1');
console.log(b);
let li=document.getElementsByTagName('li');

console.log(li);
for(let val of li){
    console.log(li);

}
//select parent from child

let lists=document.querySelector('li');
console.log(lists);

console.log(lists.parentElement);
console.log(lists.parentNode);


//select chile from parent
b= document.querySelector('ul');
console.log(b.childNodes); //returns node lists
console.log(b.children);    //returns html collections

//first and last child returns as a node list  ---> returns text
console.log(b.firstChild);
console.log(b.lastChild);


//first and last child returns as a html collection
console.log(b.firstElementChild);
console.log(b.lastElementChild);


//------------- accessing sibling nodes--------------//

console.log(b.nextSibling)
console.log(b.previousSibling)
console.log(b.nextElementSibling)
console.log(b.previousElementSibling)



//difference between nodelist and html collection

// node list also returns blank spaces and extra comments as a text with html tags
// html collection only returns html tags that are to be selected