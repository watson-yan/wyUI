<template>
    <div class="wy-popup">
        <modal v-if="mode == 'ALERT'" :show="showModal">
            <div slot="header">
                {{title}}
            </div>
            <div>
                {{msg}}
            </div>
            <div slot="footer">
                <button @click="callback" class="button primary shadow">确定</button>
            </div>
        </modal>
        <modal v-if="mode == 'CONFIRM'" :show="showModal">
            <div slot="header">
                {{title}}
            </div>
            <div>
                {{msg}}
            </div>
            <div slot="footer">
                <button class="button shadow">取消</button>
                <button @click="callback" class="button primary shadow">确定</button>
            </div>
        </modal>
    </div>
</template>
<script>
    export default {
        props: {
            mode: {
                type: String,
                required: true
            },
            title: {
                type: String,
                default: '提示信息'
            },
            msg: {
                type: String
            },
            cb: {
                type: Function,
                default() {
                    this.showModal = false
                }
            }
        },
        data() {
            return {
                showModal: true
            }
        },
        methods: {
            callback() {
                this.cb()
                this.showModal = false
            }
        }
    }
</script>
<style>
</style>
