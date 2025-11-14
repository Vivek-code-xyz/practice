
function abc(callback){
   console.log("fetching your details from servers.....");

   setTimeout(()=>{
        console.log('details fetched successfully');
        const name='vivek';
        callback(name);
   },3000);
    
}

function greet(name){
    console.log(`hello ${name} how are you? `);

}

function meet(name){
    console.log('hey ',name,' meet me at clocktower right..');
}

abc(meet);