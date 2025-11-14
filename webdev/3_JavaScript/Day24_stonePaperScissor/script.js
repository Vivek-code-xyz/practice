
const array=['Stone','Paper','Scissor'];



function winner_check(i,j){
    if(array[i]==='Stone' && array[j]==='Scissor') return true;
    else if(array[i]==='Paper' && array[j]==='Stone') return true;
    else if(array[i]==='Scissor' && array[j]==='Paper') return true;
    else{
        return false;
    }
}

let player_win=0;
let comp_win=0;

const computer=document.getElementById('compchoice');
const winmsg=document.getElementById('winner');

const p=document.querySelector('.player');
const c=document.querySelector('.computer');


const input= document.getElementById('buttons');

const logic=(event)=>{

    const clickeddiv=event.target.closest('.choice');
    if(!clickeddiv) return; //for click in outside the three divs
    const idx=clickeddiv.id;
    const comp_choice = Math.floor(Math.random()*3);

    computer.innerText=`Computer Chooses : ${array[comp_choice]}`;
    if(idx===`${comp_choice}`) {
        winmsg.innerText=`Status : Its A Draw`;
        input.removeEventListener('click',logic);
    }
    else if(winner_check(idx,comp_choice)){
        winmsg.innerText=`Status : You Won`;
        player_win++;
        input.removeEventListener('click',logic);
    }
    
    else{
        winmsg.innerText=`Status : You Loose`;
        comp_win++;
        input.removeEventListener('click',logic);
    }
    
    
    
    p.innerText=`Player : ${player_win}`;
    c.innerText=`Computer : ${comp_win}`;
}

input.addEventListener('click',logic);

const restart=document.getElementById('a');
const reload=document.getElementById('b');

restart.addEventListener('click',()=>{
    computer.innerText='Computer Chooses : ';
    winmsg.innerText='Status : ';
    input.addEventListener('click',logic);
})


reload.addEventListener('click',()=>{
    window.location.reload();
})






