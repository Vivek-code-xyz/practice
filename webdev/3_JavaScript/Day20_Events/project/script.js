
const bgcolors = [
  "#4B9CD3", // soft blue
  "#EBA937", // golden amber
  "#6DC36D", // medium green
  "#C56CC9", // muted violet
  "#FF7A70", // coral red
  "#57C7D4", // aqua teal
  "#B78F5B", // warm bronze
  "#A06CD5", // soft purple
  "#F27C38", // tangerine
  "#5AB4AC"  // sea green
];

const text = [
  "Hi",
  "Hey",
  "Yo",
  "Hola",
  "Well",
  "Come",
  "Lol",
  "What",
  "Ooo",
  "Teea",
  "Yup",
  "Ayo",
  "Oye",
  "Naa",
  "Say",
  "Oluu",
  "Poo",
  "Hallo",
  "Muu",
  "Leee"
]



document.addEventListener('click',(event)=>{

    const circle=document.createElement('div');  ///create and asign class to div
    circle.className='circle';

    circle.textContent="Hi";         //add content to div

    document.body.appendChild(circle);            // insert div into body

    const x=event.clientX;
    const y=event.clientY;

    circle.style.left=`${x-23}px`;   //insert x as pixels    -23 to set center of circle with mouse pointer
    circle.style.top=`${y-23}px`; //insert y as pixels


    let i=Math.floor(Math.random()*bgcolors.length);
    let j= Math.floor(Math.random()*text.length);
    circle.style.backgroundColor =  bgcolors[i];
    circle.textContent=text[j];
    //now remove circle after 5 seconds
    setTimeout(()=>{
        circle.remove();
    },3000)
})