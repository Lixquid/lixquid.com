// Render a grid of cells that simulates Conway's Game of Life

const cellSize = 10;
const fps = 2.5;

export function gameOfLife(
	ctx: CanvasRenderingContext2D,
	stopSignal: { stop: boolean },
) {
	const canvas = ctx.canvas;
	const cellCountX = Math.floor(canvas.width / cellSize);
	const cellCountY = Math.floor(canvas.height / cellSize);

	let cells: boolean[][] = [];
	for (let y = 0; y < cellCountY; y++) {
		cells[y] = [];
		for (let x = 0; x < cellCountX; x++) {
			cells[y]![x] = Math.random() > 0.5;
		}
	}

	let lastTime = Date.now();

	function render() {
		// Limit the framerate
		if (Date.now() - lastTime < 1000 / fps) {
			requestAnimationFrame(render);
			return;
		}
		lastTime = Date.now();

		// Render the cells
		ctx.fillStyle = "#36f";
		for (let y = 0; y < cellCountY; y++) {
			for (let x = 0; x < cellCountX; x++) {
				if (cells[y]![x]) {
					ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
				}
			}
		}

		// Fade dead cells
		ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Update the cells
		const newCells: boolean[][] = [];
		for (let y = 0; y < cellCountY; y++) {
			newCells[y] = [];
			for (let x = 0; x < cellCountX; x++) {
				const neighbors = [
					cells[y - 1]?.[x - 1],
					cells[y - 1]?.[x],
					cells[y - 1]?.[x + 1],
					cells[y]?.[x - 1],
					cells[y]?.[x + 1],
					cells[y + 1]?.[x - 1],
					cells[y + 1]?.[x],
					cells[y + 1]?.[x + 1],
				].filter((v) => v).length;

				if (cells[y]![x]) {
					// Survive with 2 or 3 neighbors
					newCells[y]![x] = neighbors === 2 || neighbors === 3;
				} else {
					// Reproduce with 3 neighbors
					newCells[y]![x] = neighbors === 3;
				}
			}
		}
		cells = newCells;

		if (!stopSignal.stop) {
			requestAnimationFrame(render);
		}
	}
	requestAnimationFrame(render);
}
