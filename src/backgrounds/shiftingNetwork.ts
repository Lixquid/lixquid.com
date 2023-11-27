// An array of nodes connected by lines, with the nodes gently shifting around.

export function shiftingNetwork(
    ctx: CanvasRenderingContext2D,
    stopSignal: { stop: boolean }
) {
    const canvas = ctx.canvas;
    const startOffset = new Date().getTime();

    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bg.addColorStop(0, "#333");
    bg.addColorStop(1, "#111");

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
        const d = (new Date().getTime() - startOffset) / 1000;

        // Render the background
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render the nodes
        for (let i = 0; i < nodes.length; i++) {
            const [x, y, v] = nodes[i]!;
            const xWobble = Math.sin(d + x / 78 + v) * 10;
            const yWobble = Math.sin(d + y / 69 + v) * 10;
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(x + xWobble, y + yWobble, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        // Render the edges
        ctx.lineWidth = 1;
        for (const [a, b] of edges) {
            const [x1, y1, v1] = nodes[a]!;
            const [x2, y2, v2] = nodes[b]!;
            const xWobble1 = Math.sin(d + x1 / 78 + v1) * 10;
            const yWobble1 = Math.sin(d + y1 / 69 + v1) * 10;
            const xWobble2 = Math.sin(d + x2 / 78 + v2) * 10;
            const yWobble2 = Math.sin(d + y2 / 69 + v2) * 10;
            // Set the opacity based on the distance between the nodes
            const dx = x1 - x2;
            const dy = y1 - y2;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const opacity = Math.max(0, 1 - dist / 80);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1 + xWobble1, y1 + yWobble1);
            ctx.lineTo(x2 + xWobble2, y2 + yWobble2);
            ctx.stroke();
        }

        if (!stopSignal.stop) requestAnimationFrame(render);
    }
    render();
}
