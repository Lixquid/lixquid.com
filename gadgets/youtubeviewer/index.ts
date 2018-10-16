/// <reference path="../../resources/vendor/vue/index.d.ts" />

const YoutubeViewerData = {
    targetUrl: "",
    videoHeight: 450,
    loop: false,
    autoplay: false
};
const YoutubeViewer = new Vue({
    el: "#main--body",
    data: YoutubeViewerData,
    methods: {
        toggleLoop: function(): void {
            this.loop = !this.loop;
            this.$forceUpdate();
        },
        setTitle: function(): void {
            let string = "";
            if (this.loop)
                string += "&loop=1";
            if (this.getYoutubeId)
                string += "&id=" + this.getYoutubeId;
            if (string !== "")
                string = "#" + string.slice(1);

            window.history.replaceState(
                "",
                document.title,
                window.location.pathname + window.location.search + string
            );
        }
    },
    watch: {
        targetUrl: function() { this.setTitle(); },
        loop: function() { this.setTitle(); },
    },
    computed: {
        getYoutubeId: function(this: typeof YoutubeViewerData): string {
            if (!this.targetUrl)
                return null;
            const videoId = this.targetUrl.match(/(?:\&|\?)v=([a-zA-Z0-9_-]{11})(?:\&|$)/i);
            if (!videoId)
                return null;
            return videoId[1];
        },
        getYoutubeUrl: function(): string {
            const id = this.getYoutubeId;
            if (!id)
                return null;
            let url = `https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`;
            if (this.loop)
                url += "&loop=1";
            return url;
        }
    },
    mounted: function(this: typeof YoutubeViewerData): void {
        if (!window.location.hash)
            return;
        const params = window.location.hash.slice(1).split("&");
        for (const fragment of params) {
            if (fragment === "loop=1")
                this.loop = true;
            if (fragment.indexOf("id=") === 0)
                this.targetUrl = "https://www.youtube.com/watch?v=" + fragment.slice(3);
        }
    }
});