import { blueprintSineWaves } from "./backgrounds/blueprintSineWaves";
import { codeRain } from "./backgrounds/codeRain";
import { curiousFellers } from "./backgrounds/curiousFellers";
import { gameOfLife } from "./backgrounds/gameOfLife";
import { shiftingNetwork } from "./backgrounds/shiftingNetwork";
import { smoothGradients } from "./backgrounds/smoothGradients";

const canvas = document.getElementById("landing-canvas") as HTMLCanvasElement;
const cover = document.getElementById("landing-cover") as HTMLDivElement;
const animControls = document.getElementById(
    "landing-controls"
) as HTMLDivElement;
const animToggleButton = document.getElementById(
    "landing-controls-toggle"
) as HTMLButtonElement;
const animTitle = document.getElementById(
    "landing-controls-title"
) as HTMLHeadingElement;

//#region Intro Animation
window.addEventListener("load", () => {
    // Fade out the canvas cover and fade in the animation controls
    cover.style.opacity = "0.5";
    animControls.style.opacity = "1";
});
//#endregion

//#region Background Animations
// Animations are functions that accepts a canvas context and a stop signal
// object. The stop signal object is used to stop the animation when the user
// clicks the "Stop Animation" button; the animation should check the stop
// signal object at the beginning of each frame, and only schedule the next
// frame if the stop signal is false.
//
// If stopped, this script will be responsible for scheduling the animation
// function again if the user clicks the "Start Animation" button.

const animations = [
    ["Smooth Gradients", smoothGradients],
    ["Game of Life", gameOfLife],
    ["Code Rain", codeRain],
    ["Shifting Network", shiftingNetwork],
    ["Blueprint Sine Waves", blueprintSineWaves],
    ["Curious Fellers", curiousFellers],
] as const satisfies ReadonlyArray<
    readonly [
        string,
        (ctx: CanvasRenderingContext2D, stopSignal: { stop: boolean }) => void
    ]
>;
const selectedAnimation =
    animations[Math.floor(Math.random() * animations.length)]!;
// animations[5];

const stopSignal = { stop: false };
const ctx = canvas.getContext("2d", {
    alpha: false,
}) as CanvasRenderingContext2D;

// Set the longest side of the canvas to 500px, and the other side to a ratio
// based on the window size.
if (window.innerWidth > window.innerHeight) {
    canvas.width = 500;
    canvas.height = (500 * window.innerHeight) / window.innerWidth;
} else {
    canvas.width = (500 * window.innerWidth) / window.innerHeight;
    canvas.height = 500;
}

// Set the little animation title
animTitle.textContent = selectedAnimation[0];

// Start the animation
if (localStorage.getItem("disableBgAnim")) {
    stopSignal.stop = true;
    animToggleButton.firstElementChild!.classList.remove("fa-pause");
    animToggleButton.firstElementChild!.classList.add("fa-play");
    animToggleButton.title = "Play Animation";
} else {
    selectedAnimation[1](ctx, stopSignal);
}

animToggleButton.addEventListener("click", () => {
    if (stopSignal.stop) {
        // Start the animation
        stopSignal.stop = false;
        animToggleButton.firstElementChild!.classList.remove("fa-play");
        animToggleButton.firstElementChild!.classList.add("fa-pause");
        animToggleButton.title = "Stop Animation";
        cover.style.opacity = "0.5";
        requestAnimationFrame(selectedAnimation[1].bind(null, ctx, stopSignal));
        localStorage.removeItem("disableBgAnim");
    } else {
        // Stop the animation
        stopSignal.stop = true;
        animToggleButton.firstElementChild!.classList.remove("fa-pause");
        animToggleButton.firstElementChild!.classList.add("fa-play");
        animToggleButton.title = "Play Animation";
        cover.style.opacity = "1";
        localStorage.setItem("disableBgAnim", "true");
    }
});
//#endregion
