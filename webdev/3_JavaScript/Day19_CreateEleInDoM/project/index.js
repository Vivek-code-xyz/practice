const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Dream big. Start small. Act now.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Everything you can imagine is real.",
  "Push yourself, because no one else is going to do it for you.",
  "Do something today that your future self will thank you for.",
  "Discipline beats motivation.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Don’t limit your challenges. Challenge your limits.",
  "Doubt kills more dreams than failure ever will.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Make it happen. Shock everyone.",
  "Every expert was once a beginner.",
  "Don’t wish for it, work for it.",
  "Great things never come from comfort zones.",
  "Consistency is what transforms average into excellence.",
  "When nothing goes right, go left.",
  "It always seems impossible until it’s done.",
  "The secret of getting ahead is getting started.",
  "Small steps every day lead to big results.",
  "The key to success is to focus on goals, not obstacles.",
  "You are never too old to set another goal or to dream a new dream.",
  "Don’t be afraid to give up the good to go for the great.",
  "Turn your wounds into wisdom.",
  "Work hard in silence, let success make the noise.",
  "The best view comes after the hardest climb.",
  "If opportunity doesn’t knock, build a door.",
  "Stop doubting yourself, work hard, and make it happen.",
  "You didn’t come this far just to stop now."
];

const lightColors = [
  "Lavender",
  "MintCream",
  "AliceBlue",
  "HoneyDew",
  "LavenderBlush",
  "MistyRose",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSteelBlue",
  "PaleTurquoise",
  "PaleGreen",
  "PaleGoldenRod",
  "PapayaWhip",
  "PeachPuff",
  "PowderBlue",
  "SeaShell",
  "Snow",
  "Thistle",
  "Beige",
  "LemonChiffon",
  "OldLace",
  "LavenderBlue",
  "AliceBlue",
  "FloralWhite",
  "LightYellow"
];

function generator(){
    
    const quote=document.getElementById('quote');

    let idx=Math.floor(Math.random()*quotes.length)
    quote.textContent = quotes[idx];
    let bdy=document.getElementById('body');
    let bx=document.getElementById('boxes');
    let i=Math.floor(Math.random()*lightColors.length);
    bdy.style.backgroundColor= lightColors[i];
    bx.style.backgroundColor= lightColors[i];
}

const button = document.querySelector('button');
button.addEventListener('click',(event)=>{
   
     generator();
    console.log(event.target)
   
})

document.addEventListener('keypress',(event)=>{    //for enter key keypresss in webpage
  if(event.key==='Enter')
    generator();
  
})

