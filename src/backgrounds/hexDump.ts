// Renders random hxd output, scrolling up the screen

// Looks like:
// 0000040  8F C8 B2 37 25 99 43 1C B1 D1 28 95 BB 1E 35 4A   ...7%.C...(....5

const fontSize = 12;
const delay = 1000; //ms

let currentIndex = Math.floor((Math.random() * 0x07fffff) / 16) * 16;
const lines: string[] = [];

function padStart(str: string, len: number, pad: string) {
	return pad.repeat(len - str.length) + str;
}

function addLine() {
	const l = [padStart(currentIndex.toString(16), 7, "0"), "  "];
	const numbers = Array.from({ length: 16 }, () =>
		Math.floor(Math.random() * 256),
	);
	for (const n of numbers) {
		l.push(padStart(n.toString(16).toUpperCase(), 2, "0"));
		l.push(" ");
	}
	l.push("  ");
	for (const n of numbers) {
		l.push(n >= 32 && n <= 126 ? String.fromCharCode(n) : ".");
	}

	lines.push(l.join(""));
	currentIndex += 16;
}

export function hexDump(
	ctx: CanvasRenderingContext2D,
	stopSignal: { stop: boolean },
) {
	const canvas = ctx.canvas;
	const lineMax = Math.ceil(canvas.height / fontSize);

	if (lines.length < lineMax) {
		for (let i = 0; i < lineMax; i++) {
			addLine();
		}
	}

	let lastRender = Date.now();
	function render() {
		if (stopSignal.stop) {
			return;
		}

		// Limit the framerate
		if (Date.now() - lastRender < delay) {
			requestAnimationFrame(render);
			return;
		}
		lastRender = Date.now();

		addLine();
		if (lines.length > lineMax) {
			lines.shift();
		}

		// Render the text
		ctx.fillStyle = "#000";
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.shadowColor = "#0f0";
		ctx.shadowBlur = 5;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.fillStyle = "#0f0";
		ctx.font = `${fontSize}px monospace`;
		for (const [i, line] of lines.entries()) {
			ctx.fillText(line, 0, i * fontSize);
		}
		ctx.shadowBlur = 0;

		// Render CRT effect
		ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
		for (let i = 0; i < canvas.height; i += 2) {
			ctx.fillRect(0, i, canvas.width, 1);
		}

		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}
