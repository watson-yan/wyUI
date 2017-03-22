<template>
    <modal :show="alert">
        <div slot="header">
            {{title}}
        </div>
        <div slot="main">
            {{content}}
        </div>
        <div slot="footer">
            <button class="button">确定</button>
        </div>
    </modal>
</template>
<style>
</style>
<script>
    export default {
        data() {
            return {
                alert: false,
                title: '',
                content: '',
                cb: null
            }
        },
        methods: {
            show(msg, title, msgType) {
                console.log('success')
                this.content = msg
                this.title = title || '提示'
            },
            close() {
                if (this.cb) {
                    this.cb()
                }
                this.alert = false // 关闭
            }
        }
    }
</script>