const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

let painting = false;
let filling = false;

const canvas = document.getElementById('jsCanvas');
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ctx = canvas.getContext('2d');

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

const colors = document.getElementsByClassName('jsColors');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');


function stopPainting(event) {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x,y);
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleRangeChange(event) {
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);   
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    // canvas.addEventListener("contextmenu", handleContextMenu);
    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
}

function handleColorClick(event) {
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleModeClick() {
    if(filling==true) {
        filling = false;
        mode.innerHTML = "FILL";
    } else {
        filling = true;
        mode.innerHTML = "PAINT";
    }
}

function handleContextMenu(event) {
    // console.log(event);
    event.preventDefalut();
}

function handleSaveClick() {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
    // console.log(image);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (save) {
    save.addEventListener("click", handleSaveClick);
}