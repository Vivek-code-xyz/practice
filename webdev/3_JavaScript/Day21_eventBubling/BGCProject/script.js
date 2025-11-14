/*
const red=document.getElementById('red');
const green=document.getElementById('green');
const blue=document.getElementById('blue');
const yellow=document.getElementById('yellow');

red.addEventListener('click',()=>{
    document.body.style.backgroundColor='rgb(255, 86, 86)';
})

green.addEventListener('click',()=>{
    document.body.style.backgroundColor='rgb(0, 161, 0)';
})

blue.addEventListener('click',()=>{
    document.body.style.backgroundColor='rgb(62, 62, 252)';
})

yellow.addEventListener('click',()=>{
    document.body.style.backgroundColor='yellow';
})  
*/



// by using loops 

/*
const buttons=document.querySelectorAll('button')  //access of all buttons 

buttons.forEach((i)=>{
    i.addEventListener('click',()=>{
        document.body.style.backgroundColor=i.id; //i.id means buttons ki id which is color already
    })
})
*/


//by event deligation

const parent=document.getElementById('root');

parent.addEventListener('click',(event)=>{

    // console.log(event.target.tagName)
    if(event.target.tagName==='BUTTON')
        document.body.style.backgroundColor = event.target.id;
})