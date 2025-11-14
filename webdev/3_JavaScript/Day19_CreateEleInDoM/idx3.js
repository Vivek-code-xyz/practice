//add nodes to the dom
const parent=document.getElementById('root');

const news=document.createElement('li');
news.innerHTML='ts';

//to aatach it on toop of parent
parent.prepend(news);



//now lets insert it on before 3rd node
const new2=document.createElement('li');
new2.innerHTML='Java';

let node3=parent.children[2];   //access of third node
parent.insertBefore(new2,node3);   //insert new2 before node3


//now replace the fourth element with new2
parent.replaceChild(new2,parent.children[5]);

//-----------------------------------------------------------------------//

/* now all the operation using inner html*/

parent.innerHTML+="you are great";
parent.innerHTML+="<li>you are great</li>";

//---------------------------------------------------------------------------------//


//add div before the parent(ul) into html file

const div=document.createElement('div');
div.innerHTML='hello i am div';

parent.insertAdjacentElement('beforebegin',div);
// parent.insertAdjacentElement('afterbegin',div);
// parent.insertAdjacentElement('beforeend',div);
// parent.insertAdjacentElement('afterend',div);  

/*| Position        | Meaning                                         | Use in 1 line                                           |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------- |
| **`beforebegin`** | Before the element itself                       | `elem.insertAdjacentHTML('beforebegin', '<p>Text</p>')` |
| **`afterbegin`**  | Just inside the element, before its first child | `elem.insertAdjacentHTML('afterbegin', '<p>Text</p>')`  |
| **`beforeend`**   | Just inside the element, after its last child   | `elem.insertAdjacentHTML('beforeend', '<p>Text</p>')`   |
| **`afterend`**    | After the element itself                        | `elem.insertAdjacentHTML('afterend', '<p>Text</p>')`    |
 */


//----------------------------------------------------------------------------------------------------//

//remove child

const par=document.getElementById('root');    //access of parent

par.children[3].remove();      //we removed the 4th li or cpp

document.querySelector('li').remove();       //removed first li cn