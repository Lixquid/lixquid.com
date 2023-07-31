// Render characters falling down the screen like from that one movie

const fontSize = 8;
const maxFps = 20;

export function codeRain(
    ctx: CanvasRenderingContext2D,
    stopSignal: { stop: boolean }
) {
    const canvas = ctx.canvas;
    const columnCount = Math.floor(canvas.width / fontSize);

    const charPos: number[] = [];
    for (let i = 0; i < columnCount; i++) {
        charPos[i] = 0;
    }

    let lastRender = Date.now();
    function render() {
        // Limit the framerate
        if (Date.now() - lastRender < 1000 / maxFps) {
            requestAnimationFrame(render);
            return;
        }
        lastRender = Date.now();

        // Render and move the leading characters
        ctx.fillStyle = "#0f0";
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < columnCount; i++) {
            ctx.fillText(
                String.fromCharCode(Math.random() * 95 + 32),
                i * fontSize,
                charPos[i]!
            );
            charPos[i] += fontSize;
            if (charPos[i]! > canvas.height && Math.random() > 0.975) {
                charPos[i] = 0;
            }
        }

        // Fade the characters rendered on previous frames
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (!stopSignal.stop) {
            requestAnimationFrame(render);
        }
    }
    requestAnimationFrame(render);
}
