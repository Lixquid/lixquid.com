
<template>
    <div id="app" class="container my-5">
        <div class="row align-items-center">
            <div class="col">
                <div class="line"></div>
            </div>
            <div class="col-auto">
                <router-link to="/">
                    <img src="@/assets/logo.png" alt="Lixquid" />
                </router-link>
            </div>
            <div class="col">
                <div class="line"></div>
            </div>
        </div>
        <nav class="nav">
            <router-link to="/">Home</router-link>
            <span class="separator">/</span>
            <router-link to="/">Home</router-link>
        </nav>
        <router-view />
    </div>
</template>

<style lang="stylus" scoped>
.nav
    display block
    margin-bottom 1em

    color #bbb
    text-align center
    font-size 1.3em

.separator
    display inline-block
    margin 0 .5em

.line
    width 60%
    height 1px
    margin 0 20%

    background #ccc
</style>

<style lang="stylus" src="./App.styl"></style>