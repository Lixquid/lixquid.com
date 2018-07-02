"use strict";
exports.__esModule = true;
var index_1 = require("../index");
var vm = new index_1["default"]({
    props: ["bar"],
    data: {
        a: true
    },
    foo: "foo",
    methods: {
        foo: function () {
            this.a = false;
        }
    },
    computed: {
        BAR: function () {
            return this.bar.toUpperCase();
        }
    }
});
vm.$instanceProperty;
vm.$instanceMethod();
index_1["default"].staticProperty;
index_1["default"].staticMethod();
