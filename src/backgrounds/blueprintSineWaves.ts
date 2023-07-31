// Render a "blueprint"-style background with faint grid lines, then render
// two sine waves and a composite sine wave.

export function blueprintSineWaves(
    ctx: CanvasRenderingContext2D,
    stopSignal: { stop: boolean }
) {
    const canvas = ctx.canvas;

    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bg.addColorStop(0, "#135da9");
    bg.addColorStop(1, "#004490");

    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;
    const xLines = Math.ceil(canvas.width / 20);
    const yLines = Math.ceil(canvas.height / 20);
    const startOffset = new Date().getTime();

    function render() {
        // Render the background
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render the grid lines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < xLines / 2; i++) {
            ctx.moveTo(Math.floor(xCenter + i * 20) + 0.5, 0);
            ctx.lineTo(Math.floor(xCenter + i * 20) + 0.5, canvas.height);
            ctx.moveTo(Math.floor(xCenter - i * 20) + 0.5, 0);
            ctx.lineTo(Math.floor(xCenter - i * 20) + 0.5, canvas.height);
        }
        for (let i = 0; i < yLines / 2; i++) {
            ctx.moveTo(0, Math.floor(yCenter + i * 20) + 0.5);
            ctx.lineTo(canvas.width, Math.floor(yCenter + i * 20) + 0.5);
            ctx.moveTo(0, Math.floor(yCenter - i * 20) + 0.5);
            ctx.lineTo(canvas.width, Math.floor(yCenter - i * 20) + 0.5);
        }
        ctx.stroke();

        // Render the central axes
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.moveTo(xCenter + 0.5, 0);
        ctx.lineTo(xCenter + 0.5, canvas.height);
        ctx.moveTo(0, yCenter + 0.5);
        ctx.lineTo(canvas.width, yCenter + 0.5);
        ctx.stroke();

        // Render the large sine wave
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        for (let i = 0; i < canvas.width; i++) {
            ctx.lineTo(
                i,
                (canvas.height / 3.5) *
                    Math.sin(
                        i / 50 + (new Date().getTime() - startOffset) / 3000
                    ) +
                    canvas.height / 2
            );
        }
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        // Render the small sine wave
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        for (let i = 0; i < canvas.width; i++) {
            ctx.lineTo(
                i,
                (canvas.height / 10) *
                    Math.sin(
                        i / 15 - (new Date().getTime() - startOffset) / 3000
                    ) +
                    canvas.height / 2
            );
        }
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        // Render the composite sine wave

        ctx.strokeStyle = "#faf";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        for (let i = 0; i < canvas.width; i++) {
            ctx.lineTo(
                i,
                (canvas.height / 3.5) *
                    Math.sin(
                        i / 50 + (new Date().getTime() - startOffset) / 3000
                    ) +
                    (canvas.height / 10) *
                        Math.sin(
                            i / 15 - (new Date().getTime() - startOffset) / 3000
                        ) +
                    canvas.height / 2
            );
        }
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        if (!stopSignal.stop) {
            requestAnimationFrame(render);
        }
    }
    render();
}
