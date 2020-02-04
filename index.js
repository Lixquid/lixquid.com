(function() {
    var bg = document.querySelector(".lead--bg");
    var searchInput = document.querySelector(".deck--search--input");

    window.addEventListener("load", function() {
        // https://jakearchibald.com/2013/animated-line-drawing-svg/
        var path = document.querySelector(".lead--logo").contentDocument.getElementById("logoPath");
        var length = path.getTotalLength();
        // Clear any previous transition
        path.style.transition = path.style.WebkitTransition = "none";
        // Set up the starting positions
        path.style.strokeDasharray = length + " " + length;
        path.style.strokeDashoffset = length;
        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        path.getBoundingClientRect();
        // Define our transition
        path.style.transition = path.style.WebkitTransition =
            "stroke-dashoffset 3s ease-in-out, fill-opacity 1s ease-in-out, stroke-opacity 1s ease-in-out";
        // Go!
        path.style.strokeDashoffset = "0";
        setTimeout(function() {
            path.style.fillOpacity = "1";
            path.style.strokeOpacity = "0";
            bg.style.opacity = "1";
            bg.style.filter = "blur(0)";
        }, 3000);

        searchInput.style.display = "initial";
        searchInput.addEventListener("keyup", function(ev) {
            document.querySelectorAll(".gadget--list .deck--container").forEach(function(el) {
                el.style.display =
                    ev.target.value === "" || el.innerText.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1
                        ? ""
                        : "none";
            });
        });
    });
    // window.addEventListener(
    //     "scroll",
    //     function() {
    //         bg.style.top = window.scrollY / 2 + "px";
    //     },
    //     { passive: true }
    // );
})();
