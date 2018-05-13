/// <reference path="../../resources/vendor/vue/vue-global.d.ts" />
var LennyGenerator;
(function (LennyGenerator) {
    // Components //////////////////////////////////////////////////////////////
    LennyGenerator.ears = [
        { id: 0, left: "", right: "" },
        { id: 1, left: "(", right: ")" }
    ];
    LennyGenerator.eyes = [
        { id: 0, left: "", right: "" },
        { id: 1, left: " ͡°", right: " ͡°" },
        { id: 2, left: "^", right: "^" },
        { id: 3, left: "X", right: "X" },
        { id: 4, left: "o", right: "O" },
        { id: 5, left: ".", right: "." }
    ];
    LennyGenerator.mouths = [
        { id: 0, value: "" },
        { id: 1, value: " ͜ʖ" },
        { id: 2, value: " ͜o" },
        { id: 3, value: " ʖ̯" },
        { id: 4, value: "_" }
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
            ears: LennyGenerator.ears[Math.floor(Math.random() * (LennyGenerator.ears.length - 1)) + 1],
            eyes: LennyGenerator.eyes[Math.floor(Math.random() * (LennyGenerator.eyes.length - 1)) + 1],
            mouth: LennyGenerator.mouths[Math.floor(Math.random() * (LennyGenerator.mouths.length - 1)) + 1]
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
        availableEars: LennyGenerator.ears,
        availableEyes: LennyGenerator.eyes,
        availableMouths: LennyGenerator.mouths
    },
    computed: {
        output: function () {
            return LennyGenerator.ears[this.selectedEars].left +
                LennyGenerator.eyes[this.selectedEyes].left +
                LennyGenerator.mouths[this.selectedMouth].value +
                LennyGenerator.eyes[this.selectedEyes].right +
                LennyGenerator.ears[this.selectedEars].right;
        }
    },
    methods: {
        random: function (type) {
            var r = LennyGenerator.random();
            switch (type) {
                case "ears":
                    this.selectedEars = r.ears.id;
                    return;
                case "eyes":
                    this.selectedEyes = r.eyes.id;
                    return;
                case "mouth":
                    this.selectedMouth = r.mouth.id;
                    return;
            }
            this.selectedEars = r.ears.id;
            this.selectedEyes = r.eyes.id;
            this.selectedMouth = r.mouth.id;
        },
        copy: function () { },
        undo: function () { }
    },
    watch: {}
});
