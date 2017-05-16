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

        <h4 class="title">Message框</h4>
        <button @click="messageBox" class="button big primary">message框</button>
        <p>使用方式：</p>
<pre>
// 参数可为string类型或object, object要求格式为{text: '', duration: 1000}  duration为关闭的延迟时间
// 如果参数为string类型的话，默认关闭时间为5秒
this.$plugins.Popup.message({text:'设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的1', duration: 1000})
this.$plugins.Popup.message({text:'设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的2', duration: 3000})
this.$plugins.Popup.message({text:'设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的3', duration: 6000})
this.$plugins.Popup.message({text:'设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的4', duration: 10000})
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
        },
        messageBox() {
            this.$plugins.Popup.message({ text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的1', duration: 1000 })
            this.$plugins.Popup.message({ text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的2', duration: 3000 })
            this.$plugins.Popup.message({ text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的3', duration: 6000 })
            this.$plugins.Popup.message({ text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的4', duration: 10000 })
        }
    }
}
</script>
<style>
</style>
