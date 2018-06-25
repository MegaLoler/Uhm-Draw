let canvas, context;
let mouseDown = false;

class Brush {
	constructor(size=1, color='black') {
		this.size = size;
		this.color = color;
	}
}

const pen = new Brush(); // default pen
const eraser = new Brush(16, 'white'); // eraser pen

let brush; // current brush

function setBrush(b) {
	brush = b;
	document.title = brush.color;
}

function onLoad(event) {
	canvas = document.getElementById('canvas');
	canvas.addEventListener('pointerdown', onMouseDown);
	canvas.addEventListener('pointerup', onMouseUp);
	canvas.addEventListener('pointermove', onMouseMove);
	context = canvas.getContext('2d');
	setBrush(pen);
	onResize(event);
}

function onResize(event) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function onKeyUp(event) {
	if(brush == pen) setBrush(eraser);
	else setBrush(pen);
}

function onMouseDown(event) {
	mouseDown = true;
	context.strokeStyle = brush.color;
	context.lineWidth = brush.size;
	context.lineCap = 'round';
}

function onMouseUp(event) {
	mouseDown = false;
}

function onMouseMove(event) {
	if(mouseDown) onDrag(event);
}

function onDrag(event) {
	const mouse = [event.clientX, event.clientY];
	const delta = [event.movementX, event.movementY];
	const start = [mouse[0] - delta[0], mouse[1] - delta[1]];
	context.beginPath();
	context.moveTo(start[0], start[1]);
	context.lineTo(mouse[0], mouse[1]);
	context.stroke();
}

window.addEventListener('load', onLoad);
window.addEventListener('resize', onResize);
window.addEventListener('keyup', onKeyUp);
