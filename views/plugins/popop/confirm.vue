<template>
    <div v-if="show" class="popup-confirm">
        <modal :show="show" :close="close">
            <div slot="header">
                <p class="clear-margin" style="line-height: 40px;">{{option.title}}</p>
            </div>
            <div class="content">
                <p>{{option.text}}</p>
            </div>
            <div slot="footer">
                <p class="clear-margin" style="padding: 10px 0px; text-align:right;">
                    <button @click="close" class="button shadow">取消</button>
                    <button @click="confirm" class="button primary shadow">确定</button>
                </p>
            </div>
        </modal>
    </div>
</template>
<style lang="sass">
    .popup-confirm {
        .content {
            display: flex;
            align-items: center;
            justify-content: center;
            &>p {
                text-align: left;
            }
        }
    }
</style>
<script>
    import modal from '../../components/modal.vue'

    export default {
        data() {
            return {
                option: {}
            }
        },
        computed: {
            show() {
                return JSON.stringify(this.option) !== '{}'
            }
        },
        methods: {
            confirm() {
                if (this.option.cb && typeof this.option.cb === 'function') {
                    this.option.cb()
                }
                this.close()
            },
            close() {
                this.option = {}
            }
        },
        components: {
            modal
        }
    }
</script>