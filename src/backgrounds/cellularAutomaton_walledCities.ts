// Render a grid of cells that simulates the "Walled cities" cellular automaton

const cellSize = 10;
const fps = 2.5;

export function cellularAutomaton_walledCities(
    ctx: CanvasRenderingContext2D,
    stopSignal: { stop: boolean }
) {
    const canvas = ctx.canvas;
    const cellCountX = Math.floor(canvas.width / cellSize);
    const cellCountY = Math.floor(canvas.height / cellSize);

    let cells: boolean[][] = [];
    for (let y = 0; y < cellCountY; y++) {
        cells[y] = [];
        for (let x = 0; x < cellCountX; x++) {
            cells[y]![x] = Math.random() > 0.7;
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
        ctx.fillStyle = "#2a3";
        for (let y = 0; y < cellCountY; y++) {
            for (let x = 0; x < cellCountX; x++) {
                if (cells[y]![x]) {
                    ctx.fillRect(
                        x * cellSize,
                        y * cellSize,
                        cellSize,
                        cellSize
                    );
                }
            }
        }

        // Fade dead cells
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
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
                    // Survive with 2, 3, 4, or 5 neighbors
                    newCells[y]![x] = 2 <= neighbors && neighbors <= 5;
                } else {
                    // Reproduce with 4 or more neighbors
                    newCells[y]![x] = neighbors >= 4;
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
