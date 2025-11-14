

const day=document.getElementById('days')
const hour=document.getElementById('hours')
const min=document.getElementById('min')
const sec=document.getElementById('sec')

function olympic(){
    const date1=new Date();
    const date2=new Date("2028-07-14T00:00:00");

    const date =date2-date1;
    console.log(date);
    const days=Math.floor( date/(1000*60*60*24));
    const hours=Math.floor((date/(1000*60*60))%24);
    const minutes=Math.floor((date/(1000*60))%60);
    const seconds=Math.floor((date/(1000))%60);

    day.innerHTML=days;
    hour.innerHTML=hours;
    min.innerHTML=minutes;
    sec.innerHTML=seconds;

}



setInterval(olympic,1000);