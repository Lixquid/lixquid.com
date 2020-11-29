import quotes from "./QUOTES.json";
// Set the Inspirational Quote (tm)
const quoteDiv = document.querySelector(".footer--quote") as HTMLDivElement;
quoteDiv.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];

// Shows JS only elements via CSS rules
const html = document.querySelector("html");
html.classList.add("js-enabled");

// Card Search Box
{
    const searchBox = document.querySelector(".card--search--input") as HTMLInputElement;
    const searchBoxClear = document.querySelector(".card--search--clear") as HTMLButtonElement;
    const updateSearchValue = () => {
        const searchTerm = searchBox.value.toLowerCase();
        document.querySelectorAll(".main--card--link").forEach((card: HTMLDivElement) => {
            const parent = card.closest(".main--card");
            if (card.innerText.toLowerCase().indexOf(searchTerm) > -1) {
                parent.classList.remove("d-none");
            } else {
                parent.classList.add("d-none");
            }
        });
        if (searchTerm) {
            searchBoxClear.classList.remove("d-none");
        } else {
            searchBoxClear.classList.add("d-none");
        }
    };
    searchBox.addEventListener("input", updateSearchValue);
    searchBoxClear.addEventListener("click", () => {
        searchBox.value = "";
        updateSearchValue();
    });
}

window.addEventListener("load", () => {
    // Fade in the background
    const bg = document.querySelector(".header--bg") as HTMLDivElement;
    setTimeout(() => {
        bg.style.opacity = "1";
        bg.style.filter = "blur(6px)";
    }, 3000);

    // Line drawing technique is from:
    // https://jakearchibald.com/2013/animated-line-drawing-svg
    const path = ((document.querySelector(".header--logo") as HTMLObjectElement).contentDocument.getElementById(
        "logoPath"
    ) as unknown) as SVGPathElement;
    path.style.fillOpacity = "0";
    path.style.strokeOpacity = "1";

    const length = path.getTotalLength();

    path.style.strokeDasharray = length + " " + length;
    path.style.strokeDashoffset = String(length);
    // Trigger a layout
    path.getBoundingClientRect();
    path.style.transition =
        "stroke-dashoffset 3s ease-in-out, fill-opacity 1s ease-in-out, stroke-opacity 1s ease-in-out";
    path.style.strokeDashoffset = "0";
    setTimeout(() => {
        path.style.fillOpacity = "1";
        path.style.strokeOpacity = "0";
    }, 3000);
});
