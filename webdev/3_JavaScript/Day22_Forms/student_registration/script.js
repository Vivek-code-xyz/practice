const form=document.querySelector('form');

form.addEventListener('submit',(event)=>{

    event.preventDefault();
    // const first=document.getElementById('first').value ;
    // const second=document.getElementById('second').value ;
    // const third=document.getElementById('third').value ;

    const data=new FormData(form);
    const arr= Array.from(data.values());
    
    const result=document.getElementById('result');

    result.textContent = `${arr[0]} ${arr[1]} is a ${arr[2]} year old Good Person`;
})