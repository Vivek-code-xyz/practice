let parent=document.getElementById('root');

//append and create a text node ---->text node is the node with no html tags only plain taxt

let node=document.createTextNode('hello dosto');
parent.append(node)


//create attribute nodes -->attributes means class and ids

node=document.createAttribute("id");
node.value='first';

document.querySelector('li').setAttributeNode(node);

///aasign attribute to second list
//we have access to parent
let node2=document.createAttribute("class");
node2.value='second'
console.log(parent.children)
parent.children[1].setAttributeNode(node2);

//second methode to set attribute and its values
let abc=document.getElementById('root');
abc.setAttribute("class",'abcd');
abc.setAttribute("random",'yes');

//see the value of attribute
console.log(abc.getAttribute("random"));
abc.removeAttribute('random');
