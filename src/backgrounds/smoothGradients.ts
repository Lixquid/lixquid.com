// Fills the background with a gradient that slowly changes over time.

export function smoothGradients(
	ctx: CanvasRenderingContext2D,
	stopSignal: { stop: boolean },
) {
	function render() {
		if (stopSignal.stop) {
			return;
		}

		const gradient = ctx.createLinearGradient(
			0,
			0,
			ctx.canvas.width,
			ctx.canvas.height,
		);
		gradient.addColorStop(0, `hsl(${(Date.now() / 300) % 360}, 40%, 20%)`);
		gradient.addColorStop(
			1,
			`hsl(${(Date.now() / 300 + 100) % 360}, 40%, 20%)`,
		);
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}
