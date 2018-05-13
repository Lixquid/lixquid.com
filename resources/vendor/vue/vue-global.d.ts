/// <reference path="types/index.d.ts" />

import * as _Vue from "./types/index"

declare global {
    const Vue: typeof _Vue.default
}
