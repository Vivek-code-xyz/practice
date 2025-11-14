const form = document.querySelector('form');
const allTask=document.getElementById('allTask');
const input = document.getElementById('task');


form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const text=input.value.trim();

    if(text=='') return;

    const parent = document.createElement('div');
    parent.id='Content';

    const span=document.createElement('span');
    span.textContent=text;
    span.id='added_task'

    const delbtn=document.createElement('button');
    delbtn.innerText="X";
    delbtn.id='deletebtn'

    const donebtn=document.createElement('button');
    donebtn.innerText='Done';
    donebtn.id='Donebtn';

    parent.append(span,donebtn,delbtn);

    allTask.append(parent);

    donebtn.addEventListener('click',()=>{
        span.style.textDecoration='line-through';
        span.style.color='gray';
    })

    delbtn.addEventListener('click',()=>{
        parent.remove();
    })

    form.reset();

})
