// Renders a bouncing logo that bounces off and changes color when it hits the
// edge of the canvas.
import mask from "./dvdJoyMask.png";

export function dvdJoy(
    ctx: CanvasRenderingContext2D,
    stopSignal: { stop: boolean }
) {
    // Load the image
    const img = new Image();
    img.src = mask;

    // Set up the logo's state
    const logo = {
        x: 0,
        y: 0,
        dx: 1,
        dy: 1,
        width: 51,
        height: 38,
        color: "#ff0000",
    };

    // Generate a random color
    function randomColor() {
        const r = Math.floor(Math.random() * 200 + 56);
        const g = Math.floor(Math.random() * 200 + 56);
        const b = Math.floor(Math.random() * 200 + 56);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Render the logo
    function render() {
        // Clear the canvas
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Update the logo's position
        logo.x += logo.dx;
        logo.y += logo.dy;

        // Bounce off the edges
        if (logo.x + logo.width > ctx.canvas.width || logo.x < 0) {
            logo.dx *= -1;
            logo.color = randomColor();
        }
        if (logo.y + logo.height > ctx.canvas.height || logo.y < 0) {
            logo.dy *= -1;
            logo.color = randomColor();
        }

        // Draw the logo
        ctx.fillStyle = logo.color;
        ctx.fillRect(logo.x, logo.y, logo.width, logo.height);
        ctx.drawImage(img, logo.x, logo.y, logo.width, logo.height);

        if (stopSignal.stop) return;
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
