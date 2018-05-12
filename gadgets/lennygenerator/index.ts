namespace LennyGenerator {

    // Components //////////////////////////////////////////////////////////////

    export const ears: ReadonlyArray<Ears> = [
        { id: 0, name: "None", left: "", right: "" },
        { id: 1, name: "The Round", left: "(", right: ")" }
    ];
    export const eyes: ReadonlyArray<Eyes> = [
        { id: 0, name: "None", left: "", right: "" },
        { id: 1, name: "The Happy", left: "^", right: "^" }
    ];
    export const mouths: ReadonlyArray<Mouth> = [
        { id: 0, name: "None", value: "" },
        { id: 1, name: "The Neutral", value: "_" }
    ];

    interface Ears {
        readonly id: number,
        readonly name: string,
        readonly left: string,
        readonly right: string
    }
    interface Eyes {
        readonly id: number,
        readonly name: string,
        readonly left: string,
        readonly right: string
    }
    interface Mouth {
        readonly id: number,
        readonly name: string,
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
            ears: ears[Math.floor(Math.random() * ears.length)],
            eyes: eyes[Math.floor(Math.random() * eyes.length)],
            mouth: mouths[Math.floor(Math.random() * mouths.length)]
        };
    }
}

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
