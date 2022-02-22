
let canvas = document.getElementById("lineus-canvas");
let context = canvas.getContext("2d");

let     prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

let isDrawing = false;

const bot = new LineUs();

// Line-us
function connect() {
}

bot.on('connected', async () => {
    // wait for home
    await bot.home()
    console.log(`job's done!`);
});

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function move(evt) {
    let pos = getMousePos(canvas, evt);
    currX = pos.x;
    currY = pos.y;
    if (isDrawing && prevX !== 0 && prevY !== 0) {
        draw();
    }
    let botPos = {
        x: map(pos.y, 0, 562, 0, 562),
        y: map(pos.x, 0, 2000, 1000, -1000)
    };
    bot.to(botPos);
    prevX = currX;
    prevY = currY;
    console.log(pos);

}

function mouseUp(evt) {
    isDrawing = false;
    bot.penUp();
}

function mouseDown(evt) {
    isDrawing = true;
    bot.penDown();
}

function draw() {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currX, currY);
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.stroke();
    context.closePath();
}

function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }