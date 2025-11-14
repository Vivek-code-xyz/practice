//inner html   text content   inner text
const a=document.getElementById('tag');
console.log(a.innerHTML) //display every things in h1 tag also shows tags that inside it like strong

console.log(a.textContent)   //display only text present in selected tag
console.log(a.innerText)    //display text but does not display taxt that is bound to display none property