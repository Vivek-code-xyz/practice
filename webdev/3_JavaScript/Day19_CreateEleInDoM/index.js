//create <li> TS <li>

let ele=document.createElement('li');
ele.innerHTML='TS';

let parent=document.getElementById('first');
parent.appendChild(ele);

//function for attach into list
function attach(cont){
    let content=document.createElement('li');
    content.innerHTML=cont
    parent=document.getElementById('first');
    // parent.appendChild(content);   only one statement per lline
    parent.append(content,'hello');  //can append multiple statemets
}

attach('CPP');
attach('JAVA')
attach('dom');
