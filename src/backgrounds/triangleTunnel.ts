// Renders an ever advancing tunnel of triangles

export function triangleTunnel(
    ctx: CanvasRenderingContext2D,
    stopSignal: { stop: boolean }
) {
    const canvas = ctx.canvas;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const triangles: Set<[number, number, number, number, number]> = new Set();

    function render() {
        const now = Date.now();

        // Draw the triangles
        let newish = false;
        for (const t of triangles.values()) {
            const [init, r, g, b, rot] = t;
            const size = (now - init) / 10;
            ctx.strokeStyle = `rgb(${size - r}, ${size - g}, ${size - b})`;
            ctx.beginPath();
            ctx.moveTo(
                cx + Math.sin((size / 400) * rot) * size,
                cy - Math.cos((size / 400) * rot) * size
            );
            ctx.lineTo(
                cx + Math.sin((Math.PI * 2) / 3 + (size / 400) * rot) * size,
                cy - Math.cos((Math.PI * 2) / 3 + (size / 400) * rot) * size
            );
            ctx.lineTo(
                cx + Math.sin((Math.PI * 4) / 3 + (size / 400) * rot) * size,
                cy - Math.cos((Math.PI * 4) / 3 + (size / 400) * rot) * size
            );
            ctx.lineTo(
                cx + Math.sin((size / 400) * rot) * size,
                cy - Math.cos((size / 400) * rot) * size
            );
            ctx.stroke();

            if (size < 300) newish = true;

            if (size > 1000) {
                triangles.delete(t);
            }
        }

        // Add a new triangle
        if (!newish) {
            triangles.add([
                now,
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 2 - 1,
            ]);
        }

        if (!stopSignal.stop) {
            requestAnimationFrame(render);
        }
    }
    render();
}
