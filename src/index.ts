import { codeRain } from "./backgrounds/codeRain";
import { dvdJoy } from "./backgrounds/dvdJoy";
import { gameOfLife } from "./backgrounds/gameOfLife";
import { shiftingNetwork } from "./backgrounds/shiftingNetwork";
import { smoothGradients } from "./backgrounds/smoothGradients";
import { triangleTunnel } from "./backgrounds/triangleTunnel";
import quotesStr from "./blog/QUOTES.txt?raw";

const cover = document.getElementById("landing-cover") as HTMLDivElement;
const animControls = document.getElementById(
    "landing-controls"
) as HTMLDivElement;

//#region Intro Animation
addEventListener("load", () => {
    // Remove the no-js class
    document.querySelector("html")!.classList.remove("no-js");

    // Start the logo animation
    const logoPath = (
        document.getElementById("landing-logo") as HTMLObjectElement
    ).contentDocument?.querySelector("path") as SVGPathElement | undefined;
    if (logoPath) {
        logoPath.style.fillOpacity = "0";
        logoPath.style.strokeOpacity = "1";

        const len = logoPath.getTotalLength();
        logoPath.style.strokeDasharray = `${len} ${len}`;
        logoPath.style.strokeDashoffset = `${len}`;
        // Trigger a reflow so the animation starts from the beginning
        logoPath.getBoundingClientRect();
        logoPath.style.transition =
            "stroke-dashoffset 3s ease-in-out, fill-opacity 1s ease-in-out, stroke-opacity 1s ease-in-out";
        logoPath.style.strokeDashoffset = "0";
        setTimeout(() => {
            logoPath.style.fillOpacity = "1";
            logoPath.style.strokeOpacity = "0";
        }, 3000);
    }

    // Fade out the canvas cover and fade in the animation controls after 3 seconds
    setTimeout(() => {
        animControls.style.opacity = "1";
        if (!localStorage.getItem("disableBgAnim")) {
            cover.style.opacity = "0.5";
        }
    }, 3000);
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
    ["Interconnection", shiftingNetwork],
    ["DVD Joy", dvdJoy],
    ["Triangle Tunnel", triangleTunnel],
] as const satisfies ReadonlyArray<
    readonly [
        string,
        (ctx: CanvasRenderingContext2D, stopSignal: { stop: boolean }) => void
    ]
>;
const selectedAnimation =
    animations[Math.floor(Math.random() * animations.length)]!;
// animations[5];

const canvas = document.getElementById("landing-canvas") as HTMLCanvasElement;
const animToggleButton = document.getElementById(
    "landing-controls-toggle"
) as HTMLButtonElement;
const animTitle = document.getElementById(
    "landing-controls-title"
) as HTMLHeadingElement;
const stopSignal = { stop: false };
const ctx = canvas.getContext("2d", {
    alpha: false,
}) as CanvasRenderingContext2D;

// Set the longest side of the canvas to a static size, and the other side to a
// ratio based on the window size.
const canvasResolution = 500;
if (window.innerWidth > window.innerHeight) {
    canvas.width = canvasResolution;
    canvas.height = (canvasResolution * window.innerHeight) / window.innerWidth;
} else {
    canvas.width = (canvasResolution * window.innerWidth) / window.innerHeight;
    canvas.height = canvasResolution;
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

//#region Inspirational Quotes
const quotes = quotesStr.split("\n").filter((line) => line.length > 0);
document.getElementById("footer")!.innerHTML =
    quotes[Math.floor(Math.random() * quotes.length)]!;
//#endregion

//#region Search
const search = document.getElementById("search") as HTMLInputElement;
search.addEventListener("input", () => {
    const query = search.value.toLowerCase();

    // Hide or show the cards that contain the query
    for (const card of Array.from(
        document.querySelectorAll(".card")
    ) as HTMLDivElement[]) {
        card.style.display = card.innerText.toLowerCase().includes(query)
            ? ""
            : "none";
    }

    // Hide or show the headers if there are no cards
    for (const header of Array.from(
        document.querySelectorAll(".title")
    ) as HTMLDivElement[]) {
        header.style.display =
            Array.from(
                header.nextElementSibling!.querySelectorAll(
                    ".card"
                ) as NodeListOf<HTMLDivElement>
            ).filter((card) => card.style.display !== "none").length > 0
                ? ""
                : "none";
    }
});
//#endregion
