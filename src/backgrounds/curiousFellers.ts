// Renders several circles that will:
// 1. Attempt to move to random points

const dotCount = 20;
const speed = 0.01;

export function curiousFellers(
    ctx: CanvasRenderingContext2D,
    stopSignal: { stop: boolean }
) {
    const canvas = ctx.canvas;

    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bg.addColorStop(0, "#345");
    bg.addColorStop(1, "#123");

    const dots: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        ax: number;
        ay: number;
        tx: number;
        ty: number;
    }[] = [];
    for (let i = 0; i < dotCount; i++) {
        dots.push({
            x: 0.1 + Math.random() * canvas.width * 0.8,
            y: 0.1 + Math.random() * canvas.height * 0.8,
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            tx: Math.random() * canvas.width,
            ty: Math.random() * canvas.height,
        });
    }

    let lastRender = Date.now();
    function render() {
        const d = Math.min(Date.now() - lastRender, 1000);
        lastRender = Date.now();

        // Update the dots
        for (const dot of dots) {
            dot.x += dot.vx * d * speed;
            dot.y += dot.vy * d * speed;
            if (dot.x < 0) {
                dot.x = 0;
                dot.vx *= -0.5;
            }
            if (dot.x > canvas.width) {
                dot.x = canvas.width;
                dot.vx *= -0.5;
            }
            if (dot.y < 0) {
                dot.y = 0;
                dot.vy *= -0.5;
            }
            if (dot.y > canvas.height) {
                dot.y = canvas.height;
                dot.vy *= -0.5;
            }
            dot.vx += dot.ax * d * speed;
            dot.vy += dot.ay * d * speed;
            dot.ax = Math.min(Math.max((dot.tx - dot.x) / 10, -10), 10) / 10;
            dot.ay = Math.min(Math.max((dot.ty - dot.y) / 10, -10), 10) / 10;

            // Randomly pick a new target
            if (Math.random() < d * 0.001) {
                dot.tx = Math.random() * canvas.width;
                dot.ty = Math.random() * canvas.height;
            }
        }

        // Render the background
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render the dots
        for (const dot of dots) {
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        if (!stopSignal.stop) {
            requestAnimationFrame(render);
        }
    }
    render();
}
