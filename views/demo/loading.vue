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