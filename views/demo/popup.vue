<template>
    <div class="init-page">
        <h4 class="title">Alert框</h4>
        <button @click="alertMsg" class="button big info">提示框</button>

        <p>使用方式：</p>
<pre>
this.$plugins.Popup.alert('设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。')
</pre>

        <h4 class="title">Confirm框</h4>
        <button @click="confirmMsg" class="button big danger">确认框</button>
        <p>使用方式：</p>
<pre>
this.$plugins.Popup.confirm({
    title: '删除提示',
    text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。',
    cb: () => {
        this.$plugins.Popup.alert('删除成功!')
    }
})
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
        alertMsg() {
            this.$plugins.Popup.alert('设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。')
        },
        confirmMsg() {
            this.$plugins.Popup.confirm({
                title: '删除提示',
                text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。',
                cb: () => {
                    this.$plugins.Popup.alert('删除成功!')
                }
            })
        }
    }
}
</script>
<style>
</style>