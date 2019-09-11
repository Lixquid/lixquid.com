<template>
    <div>
        <h1>Find and Replace</h1>
        <div class="row">
            <b-form-group label="Find" class="col">
                <b-form-input v-model="findString" :class="regexFind ? 'text-monospace' : ''" />
            </b-form-group>
            <b-form-group label="Replace" class="col">
                <b-form-input v-model="replaceString" />
            </b-form-group>
        </div>
        <div class="row">
            <div class="col">
                <b-form-checkbox v-model="ignoreCase">Ignore Case</b-form-checkbox>
            </div>
            <div class="col">
                <b-form-checkbox v-model="findWholeWord">Find Whole World</b-form-checkbox>
            </div>
            <div class="col">
                <b-form-checkbox v-model="regexFind">Regex Find</b-form-checkbox>
                <b-form-checkbox v-model="regexFindMultiline" :disabled="!regexFind">Multiline</b-form-checkbox>
            </div>
            <div class="col">
                <b-form-checkbox v-model="replaceEscapes">Replace Escapes</b-form-checkbox>
                <b-button variant="link" class="text-info" v-b-modal.replaceEscapesHelpModal>
                    <i class="fas fa-info-circle" /> Help
                </b-button>
                <b-modal id="replaceEscapesHelpModal" title="Replace Escapes" hide-footer>
                    <p>
                        When
                        <em>Replace Escapes</em> is enabled, certain sequences in the
                        <em>Replace</em> box will be substituted when performing the replace:
                    </p>
                    <ul>
                        <li>
                            <code>$$</code>: Replaced with a literal
                            <code>$</code>
                        </li>
                        <li>
                            <code>$&amp;</code>: Replaced with the string that match
                            <em>Find</em>
                        </li>
                        <li>
                            <code>$`</code>: Replaced with the input that occurs before the matched string
                        </li>
                        <li>
                            <code>$'</code>: Replaced with the input that occurs after the matched string
                        </li>
                        <li>
                            <code>$n</code> (where
                            <code>n</code> is a positive integer): Replaced with the
                            <code>n</code>th group from the
                            <em>Find</em> query. Only applies if
                            <em>Regex Find</em> is enabled.
                        </li>
                    </ul>
                </b-modal>
            </div>
        </div>
        <b-form-group label="Input">
            <b-textarea rows="4" v-model="inputString" />
        </b-form-group>
        <div class="text-right mb-3">
            <b-button variant="primary" size="lg" @click="replace">Replace</b-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class FindAndReplaceGadget extends Vue {
    public findString = "";
    public replaceString = "";
    public inputString = "";
    public ignoreCase = false;
    public findWholeWord = false;
    public regexFind = false;
    public regexFindMultiline = false;
    public replaceEscapes = false;

    public replace() {
        let find = this.findString;
        let replace = this.replaceString;

        if (!this.regexFind) find = FindAndReplaceGadget.escapeRegex(find);
        if (this.findWholeWord) find = "\\b" + find + "\\b";
        if (!this.replaceEscapes)
            replace = FindAndReplaceGadget.escapeReplace(replace);

        const regex = new RegExp(
            find,
            "g" +
                (this.ignoreCase ? "i" : "") +
                (this.regexFindMultiline && this.regexFind ? "m" : "")
        );

        this.inputString = this.inputString.replace(regex, replace);
    }

    private static escapeRegex(input: string): string {
        return input.replace(/[^a-zA-Z0-9 ]/g, "\\$&");
    }
    private static escapeReplace(input: string): string {
        // One for the $, two for the show
        // Three for the escape, and four to go
        return input.replace("$", "$$$$");
    }
}
</script>