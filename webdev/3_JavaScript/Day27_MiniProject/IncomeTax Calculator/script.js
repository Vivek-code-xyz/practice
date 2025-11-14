const form = document.querySelector('form');
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const income=document.getElementById('income');
    const amount=Number(income.value);

    const result=document.querySelector('h2');
    let total_tax=0
    if(amount<1200000){
        total_tax = 0;
    }
    else if(amount<=1600000){
        total_tax = (amount-1200000)*0.15;
    }
    else if(amount<=2000000){
        total_tax = 60000 + (amount-1600000)*0.20;
    }
    else if(amount<=2400000){
        total_tax=(amount-2000000)*0.25 +60000 + 80000;
    }
    else{
        total_tax= (amount-2400000)*0.30 + 60000+80000+100000;
    }

    result.textContent=`Your IncomeTax : ${total_tax} ₹`;
    form.reset();
})
