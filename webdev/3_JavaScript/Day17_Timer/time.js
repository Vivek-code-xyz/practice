function timers(){
    const timer = document.getElementById('time');
const times=new Date();
timer.innerHTML=times.toLocaleTimeString();
}

setInterval(timers,1000);