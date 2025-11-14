let child=document.querySelector('#child');
let parent=document.querySelector('#p');
let gparent=document.querySelector('#gp');

child.addEventListener('click',(event)=>{
    // console.log("child is clicked");
    // console.log(event.target);    gives child event
    console.log(event.currentTarget)

    //to stop bubling throught this level 
    event.stopPropagation();     //now child event will only bubble throught it and parent and gp dont have info of child event

})

parent.addEventListener('click',(event)=>{
    // console.log("parent is clicked");
    // console.log(event.target); also gives child event if click is made on child else parent event
    console.log(event.currentTarget)           //gives the parent if clickk is made inside it in whatever div
})

gparent.addEventListener('click',(event)=>{
    // console.log("grandparent is clicked");
    // console.log(event.target);    also gives child event if click on child or parent if clicked on parent
    console.log(event.currentTarget)
})