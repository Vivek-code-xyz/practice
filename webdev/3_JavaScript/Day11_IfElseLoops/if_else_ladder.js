let age=7;

if(age<18){
    console.log("You are kid");
}
else if(age>17 && age<45){
    console.log('You are Young')
}
else{
    console.log('You are Old');
}


//multiple statements switch

switch(new Date().getDay()){      //date object give the number value of the day of the week
    case 0:
        console.log('sunday');
        break;
    case 1:
        console.log('monday');
        break;
    case 2:
        console.log('tuesday');
        break;
    case 3:
        console.log('wednesday');
        break;
    case 4:
        console.log('thursday');
        break;
    case 5:
        console.log('friday');
        break;
    case 6:
        console.log('saturday');
        break;
    default:
        console.log("Invalid entry");
           
}