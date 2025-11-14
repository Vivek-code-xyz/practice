//Primitive data type memory is assigned in stack
//for non primitive data types like objects the data i stored in heap and addresss of that memory
  //is assign to variable at stack

  //so if you create a object with const key word..... you can still make change of internal variable of 
  //object because its address is not changing.....but this operation can not work on primitive data variables


//   const name="vivek";
//   name="karan"; //error


  const obj={
    name:"vivek",
    id : 17

  }

  obj.name="karan";
  obj.id=18;       //this is valid
  console.log(obj);