//creating and interface
interface Human{
    name:string,
    age:number,
    gender:string,
    disable?:boolean             // after name if we add ? then that field become optional
}

let a:Human={
    name:"vivek",
    age:18,
    gender:"male",
    disable:false
}

let b:Human={                   //we have not mentioned the disable field yet no error
    name:"vivek",
    age:18,
    gender:"male"
   
}

// -----------------------------------------------------------------------------------------------------------

//properties of interface

interface employee{
    named:string,
    age:number,
    salary:number
}

let c1:Partial<employee>={     // partial makes every field of interface optional 
    named:"parem"
}

let c2:Required<employee>={            // Required makes every field reqired
    named:'param',
    age:12,
    salary:100
}

let c3:Readonly<employee>={        //this makes every field constant you can not change them later
    named:"vivek",
    age:18,
    salary:100000000
}

//-------------------------------------------------------------------------------------------------------
//array of objects

interface obj{
    name:string,
    age:number
}

let arr:obj []=[ {name:"het",age:10},{name:"kirtan",age:15}];