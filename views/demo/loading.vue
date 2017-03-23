<template>
    <div class="init-page">
        <h4 class="title">全局加载</h4>
        <button @click="setLoding" class="button big primary">loading</button>

        <p>使用方式：</p>
        <pre>
setLoding() {
    this.$plugins.Loading.show()
    setTimeout(() => {
        this.$plugins.Loading.close()
    }, 5000)
}
        </pre>

        <h4 class="title">箭头标签</h4>
        <div style="margin-bottom: 20px;">
            <span class="span arrow-left" style="margin: 0px 25px;">default</span>
            <span class="span primary arrow-right" style="margin: 0px 25px;">primary</span>
        </div>
        <div>
            <span class="span info arrow-left" style="margin: 0px 25px;">info</span>
            <span class="span danger arrow-right" style="margin: 0px 25px;">danger</span>
        </div>

        <p>使用方式：</p>
        <pre>
&lt;span class="span arrow-left"&gt;default&lt;/span&gt;
&lt;span class="span primary arrow-right"&gt;primary&lt;/span&gt;
&lt;span class="span info arrow-left"&gt;info&lt;/span&gt;
&lt;span class="span danger arrow-right"&gt;danger&lt;/span&gt;
        </pre>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        setLoding() {
            this.$plugins.Loading.show()
            setTimeout(() => {
                this.$plugins.Loading.close()
            }, 5000)
        }
    }
}
</script>
<style>
</style>