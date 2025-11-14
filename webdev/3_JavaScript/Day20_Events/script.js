
const button=document.querySelector('button');

button.addEventListener('click',()=>{

    //read the inputs
    const input1=document.getElementById('one')
    const input2=document.getElementById('two')

    let num1=Number(input1.value);
    let num2=Number(input2.value);

    const result=num1+num2;

    //show the output
    let resnode=document.getElementById('result');
    resnode.textContent="Result : "+result;

})