const board = document.getElementById('board');

let startX = 0
let startY = 0

let endX = 0
let endY = 0

let isMouseDown = false;

board.addEventListener("mousedown",(e)=>{
    isMouseDown = true;
    startX= e.offsetX;
    startY = e.offsetY;

});

board.addEventListener("mouseup",(e)=>{
    if(!isMouseDown) return;

    isMouseDown = false;
    endX = e.offsetX;
    endY = e.offsetY;

    const left = Math.min(startX, endX);
    const top = Math.min(startY, endY);


    const width = Math.abs(startX-endX)
    const height = Math.abs(startY-endY)

    const rect = document.createElement("div");
    rect.className = "rectangle";

    rect.style.left = left + "px";
    rect.style.top = top + "px";
    rect.style.width = width + "px";
    rect.style.height = height + "px";

    board.appendChild(rect);
})