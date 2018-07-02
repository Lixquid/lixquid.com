"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var index_1 = require("../index");
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.a = 0;
        return _this;
    }
    Test.prototype.testProperties = function () {
        this.$data;
        this.$el;
        this.$options;
        this.$parent;
        this.$root;
        this.$children;
        this.$refs;
        this.$slots;
        this.$isServer;
        this.$ssrContext;
        this.$vnode;
    };
    Test.prototype.testReification = function () {
        this.$refs.vue.$data;
        this.$refs.element.value;
        this.$refs.vues[0].$data;
        this.$refs.elements[0].value;
    };
    Test.prototype.testMethods = function () {
        var _this = this;
        this.$mount("#app", false);
        this.$forceUpdate();
        this.$destroy();
        this.$set({}, "key", "value");
        this.$delete({}, "key");
        this.$watch("a", function (val, oldVal) { }, {
            immediate: true,
            deep: false
        })();
        this.$watch(function () { return _this.a; }, function (val) { });
        this.$on("", function () { });
        this.$once("", function () { });
        this.$off("", function () { });
        this.$emit("", 1, 2, 3);
        this.$nextTick(function () {
            this.$nextTick;
        });
        this.$nextTick().then(function () { });
        this.$createElement("div", {}, "message");
    };
    Test.testConfig = function () {
        var config = this.config;
        config.silent;
        config.optionMergeStrategies;
        config.devtools;
        config.errorHandler = function (err, vm) {
            if (vm instanceof Test) {
                vm.testProperties();
                vm.testMethods();
            }
        };
        config.warnHandler = function (msg, vm) {
            if (vm instanceof Test) {
                vm.testProperties();
                vm.testMethods();
            }
        };
        config.keyCodes = { esc: 27 };
        config.ignoredElements = ['foo', /^ion-/];
    };
    Test.testMethods = function () {
        this.extend({
            data: function () {
                return {
                    msg: ""
                };
            }
        });
        this.nextTick(function () { });
        this.nextTick().then(function () { });
        this.set({}, "", "");
        this.set([true, false, true], 1, true);
        this["delete"]({}, "");
        this["delete"]([true, false], 0);
        this.directive("", { bind: function () { } });
        this.filter("", function (value) { return value; });
        this.component("", { data: function () { return ({}); } });
        this.component("", { functional: true, render: function (h) { return h("div", "hello!"); } });
        this.use;
        this.mixin(Test);
        this.compile("<div>{{ message }}</div>");
    };
    return Test;
}(index_1["default"]));
var HelloWorldComponent = index_1["default"].extend({
    props: ["name"],
    data: function () {
        return {
            message: "Hello " + this.name
        };
    },
    computed: {
        shouted: function () {
            return this.message.toUpperCase();
        }
    },
    methods: {
        getMoreExcited: function () {
            this.message += "!";
        }
    },
    watch: {
        message: function (a) {
            console.log("Message " + this.message + " was changed!");
        }
    }
});
var FunctionalHelloWorldComponent = index_1["default"].extend({
    functional: true,
    props: ["name"],
    render: function (createElement, ctxt) {
        return createElement("div", "Hello " + ctxt.props.name);
    }
});
var Parent = index_1["default"].extend({
    data: function () {
        return { greeting: 'Hello' };
    }
});
var Child = Parent.extend({
    methods: {
        foo: function () {
            console.log(this.greeting.toLowerCase());
        }
    }
});
var GrandChild = Child.extend({
    computed: {
        lower: function () {
            return this.greeting.toLowerCase();
        }
    }
});
new GrandChild().lower.toUpperCase();
for (var _ in (new Test()).$options) {
}
index_1["default"].extend(options);
index_1["default"].component('test-comp', options);
new index_1["default"](options);
// cyclic example
index_1["default"].extend({
    props: {
        bar: {
            type: String
        }
    },
    methods: {
        foo: function () { }
    },
    mounted: function () {
        this.foo();
    },
    // manual annotation
    render: function (h) {
        var a = this.bar;
        return h('canvas', {}, [a]);
    }
});
