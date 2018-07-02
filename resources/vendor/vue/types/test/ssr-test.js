"use strict";
exports.__esModule = true;
var index_1 = require("../index");
var VueSSRClientPlugin = require("../../packages/vue-server-renderer/client-plugin");
var VueSSRServerPlugin = require("../../packages/vue-server-renderer/server-plugin");
var webpack = require("webpack");
var fs_1 = require("fs");
var vue_server_renderer_1 = require("../../packages/vue-server-renderer");
function createApp(context) {
    return new index_1["default"]({
        data: {
            url: context.url
        },
        template: "<div>The visited URL is: {{ url }}</div>"
    });
}
// Renderer test
var app = createApp({ url: 'http://localhost:8000/' });
var renderer = vue_server_renderer_1.createRenderer({
    template: fs_1.readFileSync('./index.template.html', 'utf-8')
});
var context = {
    title: 'Hello',
    meta: "\n    <meta name=\"description\" content=\"Vue.js SSR Example\">\n  "
};
renderer.renderToString(app, function (err, html) {
    if (err)
        throw err;
    var res = html;
});
renderer.renderToString(app, context, function (err, html) {
    if (err)
        throw err;
    var res = html;
});
renderer.renderToString(app)
    .then(function (html) {
    var res = html;
})["catch"](function (err) {
    throw err;
});
renderer.renderToString(app, context)
    .then(function (html) {
    var res = html;
})["catch"](function (err) {
    throw err;
});
renderer.renderToStream(app, context).on('data', function (chunk) {
    var html = chunk.toString();
});
var bundleRenderer = vue_server_renderer_1.createBundleRenderer('/path/to/vue-ssr-server-bundle.json', {
    inject: false,
    runInNewContext: 'once',
    basedir: '/path/to/base',
    shouldPreload: function (file, type) {
        if (type === 'script' || type === 'style') {
            return true;
        }
        if (type === 'font') {
            return /\.woff2$/.test(file);
        }
        if (type === 'image') {
            return file === 'hero.jpg';
        }
        return false;
    },
    cache: {
        get: function (key) {
            return cacheClient[key];
        },
        set: function (key, val) {
            cacheClient[key] = val;
        },
        has: function (key) {
            return !!cacheClient[key];
        }
    },
    directives: {
        example: function (vnode, directiveMeta) {
            // transform vnode based on directive binding metadata
        }
    }
});
bundleRenderer.renderToString(context, function (err, html) {
    if (err)
        throw err;
    var res = html;
});
bundleRenderer.renderToString().then(function (html) {
    var res = html;
});
bundleRenderer.renderToString(context).then(function (html) {
    var res = html;
});
bundleRenderer.renderToStream(context).on('data', function (chunk) {
    var html = chunk.toString();
});
// webpack plugins
webpack({
    plugins: [
        new VueSSRClientPlugin({
            filename: 'client-manifest.json'
        }),
        new VueSSRServerPlugin({
            filename: 'server-bundle.json'
        })
    ]
});
