var LennyGenerator;
(function (LennyGenerator) {
    // Components //////////////////////////////////////////////////////////////
    LennyGenerator.ears = [
        { id: 0, name: "None", left: "", right: "" },
        { id: 1, name: "The Round", left: "(", right: ")" }
    ];
    LennyGenerator.eyes = [
        { id: 0, name: "None", left: "", right: "" },
        { id: 1, name: "The Happy", left: "^", right: "^" }
    ];
    LennyGenerator.mouths = [
        { id: 0, name: "None", value: "" },
        { id: 1, name: "The Neutral", value: "_" }
    ];
    // Functions ///////////////////////////////////////////////////////////////
    function getID(ears, eyes, mouth) {
        return ears.id << 16 + eyes.id << 8 + mouth.id;
    }
    LennyGenerator.getID = getID;
    function fromID(id) {
        return {
            ears: LennyGenerator.ears[(id & 0xff0000) >> 16],
            eyes: LennyGenerator.eyes[(id & 0x00ff00) >> 8],
            mouth: LennyGenerator.mouths[(id & 0x0000ff)]
        };
    }
    LennyGenerator.fromID = fromID;
    function random() {
        return {
            ears: LennyGenerator.ears[Math.floor(Math.random() * LennyGenerator.ears.length)],
            eyes: LennyGenerator.eyes[Math.floor(Math.random() * LennyGenerator.eyes.length)],
            mouth: LennyGenerator.mouths[Math.floor(Math.random() * LennyGenerator.mouths.length)]
        };
    }
    LennyGenerator.random = random;
})(LennyGenerator || (LennyGenerator = {}));
// Application /////////////////////////////////////////////////////////////////
var app = new Vue({
    el: "#main--body",
    data: {
        selectedEars: 1,
        selectedEyes: 1,
        selectedMouth: 1,
        ears: LennyGenerator.ears,
        eyes: LennyGenerator.eyes,
        mouths: LennyGenerator.mouths,
        output: ""
    }
});
