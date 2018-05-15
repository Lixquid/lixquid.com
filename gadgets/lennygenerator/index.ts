/// <reference path="../../resources/vendor/vue/vue-global.d.ts" />

namespace LennyGenerator {

    // Components //////////////////////////////////////////////////////////////

    export const ears: ReadonlyArray<Ears> = [
        { id: 0, left: "", right: "" },
        { id: 1, left: "(", right: ")" }
    ];
    export const eyes: ReadonlyArray<Eyes> = [
        { id: 0, left: "", right: "" },
        { id: 1, left: " ͡°", right: " ͡°" },
        { id: 2, left: "^", right: "^" },
        { id: 3, left: "X", right: "X" },
        { id: 4, left: "o", right: "O" },
        { id: 5, left: ".", right: "." }
    ];
    export const mouths: ReadonlyArray<Mouth> = [
        { id: 0, value: "" },
        { id: 1, value: " ͜ʖ" },
        { id: 2, value: " ͜o" },
        { id: 3, value: " ʖ̯" },
        { id: 4, value: "_" }
    ];

    interface Ears {
        readonly id: number,
        readonly left: string,
        readonly right: string
    }
    interface Eyes {
        readonly id: number,
        readonly left: string,
        readonly right: string
    }
    interface Mouth {
        readonly id: number,
        readonly value: string
    }

    // Functions ///////////////////////////////////////////////////////////////

    export function getID(ears: Ears, eyes: Eyes, mouth: Mouth): number {
        return ears.id << 16 + eyes.id << 8 + mouth.id;
    }

    export function fromID(id: number): { ears: Ears, eyes: Eyes, mouth: Mouth } {
        return {
            ears: ears[(id & 0xff0000) >> 16],
            eyes: eyes[(id & 0x00ff00) >> 8],
            mouth: mouths[(id & 0x0000ff)]
        };
    }

    export function random(): { ears: Ears, eyes: Eyes, mouth: Mouth } {
        return {
            ears: ears[Math.floor(Math.random() * (ears.length - 1)) + 1],
            eyes: eyes[Math.floor(Math.random() * (eyes.length - 1)) + 1],
            mouth: mouths[Math.floor(Math.random() * (mouths.length - 1)) + 1]
        };
    }
}

// Application /////////////////////////////////////////////////////////////////

const lennyGeneratorApp = new Vue({
    el: "#main--body",
    data: {
        selectedEars: 1 as number,
        selectedEyes: 1,
        selectedMouth: 1,
        availableEars: LennyGenerator.ears,
        availableEyes: LennyGenerator.eyes,
        availableMouths: LennyGenerator.mouths
    },
    computed: {
        output: function (): string {
            return LennyGenerator.ears[this.selectedEars].left +
                LennyGenerator.eyes[this.selectedEyes].left +
                LennyGenerator.mouths[this.selectedMouth].value +
                LennyGenerator.eyes[this.selectedEyes].right +
                LennyGenerator.ears[this.selectedEars].right;
        }
    },
    methods: {
        random: function (type?: string): void {
            const r = LennyGenerator.random();
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
        copy: function (): void { },
        undo: function (): void { }
    },
    watch: {
    }
});
