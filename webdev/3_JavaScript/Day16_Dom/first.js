console.log("bade hi naadan ho ji!")

//document 
document.getElementById('first').innerHTML="Hello Bandariya kaisi ho";

const obj=document.getElementsByClassName('header');

obj[1].innerHTML="hellow moto"


//Quary selector can access everything like ids and classes and tags also
//but it access only first matched class or id tag

const a=document.querySelector('.header');

a.style.backgroundColor='pink';

//to select all the tags with same class use queryselector all

const b= document.querySelectorAll('.header');

b[1].style.backgroundColor='green';
