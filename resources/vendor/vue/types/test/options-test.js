"use strict";
exports.__esModule = true;
var index_1 = require("../index");
var option = {
    data: function () {
        return {
            a: 123
        };
    }
};
// contravariant generic should use never
var anotherOption = option;
var componentType = option;
index_1["default"].component('sub-component', {
    components: {
        a: index_1["default"].component(""),
        b: {}
    }
});
index_1["default"].component('prop-component', {
    props: {
        size: Number,
        name: {
            type: String,
            "default": '0',
            required: true
        }
    },
    data: function () {
        return {
            fixedSize: this.size.toFixed(),
            capName: this.name.toUpperCase()
        };
    }
});
index_1["default"].component('string-prop', {
    props: ['size', 'name'],
    data: function () {
        return {
            fixedSize: this.size.whatever,
            capName: this.name.isany
        };
    }
});
var User = /** @class */ (function () {
    function User() {
        this.u = 1;
    }
    return User;
}());
var Cat = /** @class */ (function () {
    function Cat() {
        this.u = 1;
    }
    return Cat;
}());
index_1["default"].component('union-prop', {
    props: {
        primitive: [String, Number],
        object: [Cat, User],
        regex: RegExp,
        mixed: [RegExp, Array],
        union: [User, Number] // requires annotation
    },
    data: function () {
        this.primitive;
        this.object;
        this.union;
        this.regex.compile;
        this.mixed;
        return {
            fixedSize: this.union
        };
    }
});
index_1["default"].component('component', {
    data: function () {
        this.$mount;
        this.size;
        return {
            a: 1
        };
    },
    props: {
        size: Number,
        name: {
            type: String,
            "default": '0',
            required: true
        }
    },
    propsData: {
        msg: "Hello"
    },
    computed: {
        aDouble: function () {
            return this.a * 2;
        },
        aPlus: {
            get: function () {
                return this.a + 1;
            },
            set: function (v) {
                this.a = v - 1;
            },
            cache: false
        }
    },
    methods: {
        plus: function () {
            this.a++;
            this.aDouble.toFixed();
            this.aPlus = 1;
            this.size.toFixed();
        }
    },
    watch: {
        'a': function (val, oldVal) {
            console.log("new: " + val + ", old: " + oldVal);
        },
        'b': 'someMethod',
        'c': {
            handler: function (val, oldVal) {
                this.a = val;
            },
            deep: true
        }
    },
    el: "#app",
    template: "<div>{{ message }}</div>",
    render: function (createElement) {
        return createElement("div", {
            attrs: {
                id: "foo"
            },
            props: {
                myProp: "bar"
            },
            domProps: {
                innerHTML: "baz"
            },
            on: {
                click: new Function
            },
            nativeOn: {
                click: new Function
            },
            "class": {
                foo: true,
                bar: false
            },
            style: {
                color: 'red',
                fontSize: '14px'
            },
            key: 'myKey',
            ref: 'myRef'
        }, [
            createElement(),
            createElement("div", "message"),
            createElement(index_1["default"].component("component")),
            createElement({}),
            createElement({
                functional: true,
                render: function (c) {
                    return createElement();
                }
            }),
            createElement(function () { return index_1["default"].component("component"); }),
            createElement(function () { return ({}); }),
            createElement(function (resolve, reject) {
                resolve({});
                reject();
            }),
            "message",
            [createElement("div", "message")]
        ]);
    },
    staticRenderFns: [],
    beforeCreate: function () {
        this.a = 1;
    },
    created: function () { },
    beforeDestroy: function () { },
    destroyed: function () { },
    beforeMount: function () { },
    mounted: function () { },
    beforeUpdate: function () { },
    updated: function () { },
    activated: function () { },
    deactivated: function () { },
    errorCaptured: function (err, vm, info) {
        err.message;
        vm.$emit('error');
        info.toUpperCase();
        return true;
    },
    directives: {
        a: {
            bind: function () { },
            inserted: function () { },
            update: function () { },
            componentUpdated: function () { },
            unbind: function () { }
        },
        b: function (el, binding, vnode, oldVnode) {
            el.textContent;
            binding.name;
            binding.value;
            binding.oldValue;
            binding.expression;
            binding.arg;
            binding.modifiers["modifier"];
        }
    },
    components: {
        a: index_1["default"].component(""),
        b: {}
    },
    transitions: {},
    filters: {
        double: function (value) {
            return value * 2;
        }
    },
    parent: new index_1["default"],
    mixins: [index_1["default"].component(""), {}],
    name: "Component",
    "extends": {},
    delimiters: ["${", "}"]
});
index_1["default"].component('provide-inject', {
    provide: {
        foo: 1
    },
    inject: {
        injectFoo: 'foo',
        injectBar: Symbol(),
        injectBaz: { from: 'baz' },
        injectQux: { "default": 1 },
        injectQuux: { from: 'quuz', "default": function () { return ({ value: 1 }); } }
    }
});
index_1["default"].component('provide-function', {
    provide: function () { return ({
        foo: 1
    }); }
});
index_1["default"].component('component-with-scoped-slot', {
    render: function (h) {
        return h('div', [
            h('child', [
                // default scoped slot as children
                function (props) { return [h('span', [props.msg])]; }
            ]),
            h('child', {
                scopedSlots: {
                    // named scoped slot as vnode data
                    item: function (props) { return [h('span', [props.msg])]; }
                }
            })
        ]);
    },
    components: {
        child: {
            render: function (h) {
                return h('div', [
                    this.$scopedSlots['default']({ msg: 'hi' }),
                    this.$scopedSlots['item']({ msg: 'hello' })
                ]);
            }
        }
    }
});
index_1["default"].component('narrow-array-of-vnode-type', {
    render: function (h) {
        var slot = this.$scopedSlots["default"]({});
        if (typeof slot !== 'string') {
            var first = slot[0];
            if (!Array.isArray(first) && typeof first !== 'string') {
                return first;
            }
        }
        return h();
    }
});
index_1["default"].component('functional-component', {
    props: ['prop'],
    functional: true,
    inject: ['foo'],
    render: function (createElement, context) {
        context.props;
        context.children;
        context.slots();
        context.data;
        context.parent;
        context.listeners.click;
        return createElement("div", {}, context.children);
    }
});
index_1["default"].component('functional-component-object-inject', {
    functional: true,
    inject: {
        foo: 'foo',
        bar: Symbol(),
        baz: { from: 'baz' },
        qux: { "default": 1 },
        quux: { from: 'quuz', "default": function () { return ({ value: 1 }); } }
    },
    render: function (h) {
        return h('div');
    }
});
index_1["default"].component('functional-component-check-optional', {
    functional: true
});
index_1["default"].component("async-component", (function (resolve, reject) {
    setTimeout(function () {
        resolve(index_1["default"].component("component"));
    }, 0);
    return new Promise(function (resolve) {
        resolve({
            functional: true,
            render: function (h) { return h('div'); }
        });
    });
}));
index_1["default"].component('async-es-module-component', function () { return Promise.resolve().then(function () { return require('./es-module'); }); });
