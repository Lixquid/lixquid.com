// An array of nodes connected by lines, with the nodes gently shifting around.

export function shiftingNetwork(
	ctx: CanvasRenderingContext2D,
	stopSignal: { stop: boolean },
) {
	const canvas = ctx.canvas;
	const startOffset = new Date().getTime();

	const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
	bg.addColorStop(0, "#333");
	bg.addColorStop(1, "#111");

	// Render to offscreen layer so we can posterize alpha to 0 or 255 after
	const shapeCanvas = document.createElement("canvas");
	shapeCanvas.width = canvas.width;
	shapeCanvas.height = canvas.height;
	const shapeCtx = shapeCanvas.getContext("2d", {
		willReadFrequently: true,
	})!;

	const xNodes = Math.ceil(canvas.width / 40);
	const yNodes = Math.ceil(canvas.height / 40);

	const nodes: [x: number, y: number, v: number][] = [];
	for (let x = -2; x < xNodes + 2; x++) {
		for (let y = -2; y < yNodes + 2; y++) {
			// Occasionally skip a node
			if (Math.random() < 0.2) continue;
			nodes.push([
				x * 40 + 20 + Math.random() * 40,
				y * 40 + 20 + Math.random() * 40,
				Math.random() * 3,
			]);
		}
	}

	const edges: [a: number, b: number][] = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			const [x1, y1] = nodes[i]!;
			const [x2, y2] = nodes[j]!;
			const dx = x1 - x2;
			const dy = y1 - y2;
			const dist = Math.sqrt(dx * dx + dy * dy);
			// Skip edges that are too far away
			if (dist > Math.random() * 30 + 50) continue;
			// Occasionally skip an edge anyway
			if (Math.random() < 0.2) continue;
			edges.push([i, j]);
		}
	}

	function render() {
		if (stopSignal.stop) {
			return;
		}

		const d = (new Date().getTime() - startOffset) / 1000;

		// Render the background
		ctx.fillStyle = bg;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Clear the offscreen layer
		shapeCtx.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);

		// Render the edges first
		shapeCtx.lineWidth = 2;
		for (const [a, b] of edges) {
			const [x1, y1, v1] = nodes[a]!;
			const [x2, y2, v2] = nodes[b]!;
			const xWobble1 = Math.sin(d + x1 / 78 + v1) * 10;
			const yWobble1 = Math.sin(d + y1 / 69 + v1) * 10;
			const xWobble2 = Math.sin(d + x2 / 78 + v2) * 10;
			const yWobble2 = Math.sin(d + y2 / 69 + v2) * 10;
			// Half brightness
			shapeCtx.strokeStyle = "rgba(128, 128, 128, 1)";
			shapeCtx.beginPath();
			shapeCtx.moveTo(x1 + xWobble1, y1 + yWobble1);
			shapeCtx.lineTo(x2 + xWobble2, y2 + yWobble2);
			shapeCtx.stroke();
		}

		// Render the nodes on top
		for (let i = 0; i < nodes.length; i++) {
			const [x, y, v] = nodes[i]!;
			const xWobble = Math.sin(d + x / 78 + v) * 10;
			const yWobble = Math.sin(d + y / 69 + v) * 10;
			shapeCtx.fillStyle = "#fff";
			shapeCtx.beginPath();
			shapeCtx.arc(x + xWobble, y + yWobble, 3, 0, Math.PI * 2);
			shapeCtx.fill();
		}

		// Posterize the offscreen layer's alpha to get an aliased effect
		const image = shapeCtx.getImageData(
			0,
			0,
			shapeCanvas.width,
			shapeCanvas.height,
		);
		const data = image.data;
		for (let i = 3; i < data.length; i += 4) {
			data[i] = data[i]! >= 128 ? 255 : 0;
		}
		shapeCtx.putImageData(image, 0, 0);

		// Draw the aliased image
		ctx.drawImage(shapeCanvas, 0, 0);

		requestAnimationFrame(render);
	}
	render();
}
