// Render a grid of cells that simulates various Cellular Automata rules.

const automata = {
	"Game of Life": [[2, 3], [3], "#0bab00"],
	Assimilation: [[4, 5, 6, 7], [3, 4, 5], "#2200ff"],
	"2x2": [[1, 2, 5], [3, 6], "#cccc00"],
	Amoeba: [[1, 3, 5, 8], [3, 5, 7], "#cb00cb"],
	Diamoeba: [[5, 6, 7, 8], [3, 5, 6, 7, 8], "#9b0000"],
	Stains: [[2, 3, 5, 6, 7, 8], [3, 6, 7, 8], "#7100ff"],
	Maze: [[1, 2, 3, 4, 5], [3], "#a7e39f"],
	Coagulations: [[2, 3, 5, 6, 7, 8], [3, 7, 8], "#9acd32"],
	"Walled Cities": [[2, 3, 4, 5], [4, 5, 6, 7, 8], "#0065f6"],
} satisfies Record<string, [number[], number[], string]>;

const cellSize = 10;
const fps = 2.5;
const resetInterval = 25_000; //ms

const variant = Object.keys(automata)[
	Math.floor(Math.random() * Object.keys(automata).length)
] as keyof typeof automata;

const surviveNeighbors = automata[variant][0];
const reproduceNeighbors = automata[variant][1];
const variantColor = automata[variant][2];

export function cellularAutomata(
	ctx: CanvasRenderingContext2D,
	stopSignal: { stop: boolean },
) {
	const canvas = ctx.canvas;
	const cellCountX = Math.floor(canvas.width / cellSize);
	const cellCountY = Math.floor(canvas.height / cellSize);

	let cells: boolean[][] = [];
	function resetCells() {
		for (let y = 0; y < cellCountY; y++) {
			cells[y] = [];
			for (let x = 0; x < cellCountX; x++) {
				cells[y]![x] = Math.random() > 0.5;
			}
		}
	}
	resetCells();

	let clearTime = Date.now() + resetInterval;
	let resetTime = Date.now() + resetInterval + 3000 / fps;
	let lastTime = Date.now();

	function render() {
		if (stopSignal.stop) {
			return;
		}

		// Limit the framerate
		if (Date.now() - lastTime < 1000 / fps) {
			requestAnimationFrame(render);
			return;
		}
		lastTime = Date.now();

		// If we're past the reset time, reset the cells
		if (Date.now() > resetTime) {
			resetCells();
			clearTime = Date.now() + resetInterval;
			resetTime = Date.now() + resetInterval + 3000 / fps;
		}

		// Render the cells, if we're not past the clear time
		if (Date.now() < clearTime) {
			ctx.fillStyle = variantColor;
			for (let y = 0; y < cellCountY; y++) {
				for (let x = 0; x < cellCountX; x++) {
					if (cells[y]![x]) {
						ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
					}
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
					newCells[y]![x] = surviveNeighbors.indexOf(neighbors) !== -1;
				} else {
					// Reproduce with 3 neighbors
					newCells[y]![x] = reproduceNeighbors.indexOf(neighbors) !== -1;
				}
			}
		}
		cells = newCells;

		// Draw the name of the variant at the top of the canvas
		ctx.fillStyle = "#fff";
		ctx.font = "12px monospace";
		ctx.textAlign = "center";
		ctx.fillText(variant, canvas.width / 2, 12);

		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}
