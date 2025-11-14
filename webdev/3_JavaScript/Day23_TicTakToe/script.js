const board=document.querySelector(".board");

let turn='O';

const st=new Set();
for(let i=0;i<9;i++){
    st.add(`${i}`);
}

const winner=[
    [0,1,2],[3,4,5],[6,7,8],  //horizontal
    [0,3,6],[1,4,7],[2,5,8],  //vertical
    [0,4,8],[2,4,6]           //diagonal
];

let b_arr=new Array(9).fill('E');

function check_win(){
    for(let [i,j,k] of winner){
        if((b_arr[i]===b_arr[j])&&(b_arr[j]===b_arr[k]) && (b_arr[i]!='E')){
            return true;
        }
    }
    return false;
}

let total_turns=0;

const img1=document.getElementById('img1');
const img2=document.getElementById('img2');
const p1=document.getElementById('p1');
const p2=document.getElementById('p2');


img1.style.transform='scale(1.1)';
p1.style.backgroundColor="rgb(36, 214, 113)";
const printingfun=(event)=>{

    if(st.has(event.target.id)===true && b_arr[event.target.id]==='E'){
        const ele=event.target;
        total_turns++; //increasing turns for draw situation

        if(turn==='O'){
            

            ele.innerHTML='O';
            b_arr[ele.id]='O';
            if(check_win()){
                document.getElementById('winning-msg').innerHTML = "Player 1 (O) is Winner";
                board.removeEventListener('click',printingfun);
                img1.style.animation ="borderrun 1s ease";
                return;
            }
            turn='X';
        }

        else{
            
            ele.innerHTML='X';
            b_arr[ele.id]='X';
            if(check_win()){
                document.getElementById('winning-msg').innerHTML = "Player 2 (X) is Winner";
                board.removeEventListener('click',printingfun);
                img2.style.animation ="borderrun 1s ease";
                
                return;
            }
            turn='O';
        }

        if(turn=='O'){
            
            img1.style.transform='scale(1.1)';
            p1.style.backgroundColor="rgb(36, 214, 113)";

            img2.style.transform='scale(1)';
            p2.style.backgroundColor="transparent";
        }
        else{
            img2.style.transform='scale(1.1)';
            p2.style.backgroundColor="rgb(36, 214, 113)";

            img1.style.transform='scale(1)';
            p1.style.backgroundColor="transparent";
            
        }

        if(total_turns==9){
            document.getElementById('winning-msg').innerHTML = "Match Is Draw";
            img2.style.animation ="borderrun 1s ease";
            img1.style.animation ="borderrun 1s ease";
            p1.style.backgroundColor="rgb(36, 214, 113)";
            p2.style.backgroundColor="rgb(36, 214, 113)";
            img1.style.transform='scale(1)';
            img2.style.transform='scale(1)';


        }
    }
    
    
}

board.addEventListener('click',printingfun);


///now restart button

const button=document.getElementById('restart');

button.addEventListener('click',()=>{

    const cells=document.getElementsByClassName('cell');

    Array.from(cells).forEach((cell)=>{
        cell.innerHTML='';
    })
    
    total_turns=0;
    turn='O';
    b_arr=new Array(9).fill('E');
    document.getElementById('winning-msg').innerHTML = "";

    board.addEventListener('click',printingfun);
    img1.style.transform='scale(1.1)';
    img2.style.transform='scale(1)';
    
    p1.style.backgroundColor='rgb(36, 214, 113)';
    p2.style.backgroundColor='transparent';

    img1.style.animation ="border 1s ease";
    img2.style.animation ="border 1s ease";

})