<template>
    <div v-if="text" class="popup-alert">
        <modal :show="text" :close="close">
            <div slot="header">
                <p class="clear-margin" style="line-height: 40px;">提示信息</p>
            </div>
            <div class="content">
                <section class="icon">
                    <span style="font-size: 20px;line-height: 30px;">!</span>
                </section>
                <section class="main">
                    {{text}}
                </section>
            </div>
            <div slot="footer">
                <p class="clear-margin" style="padding: 10px 0px; text-align:right;">
                    <button @click="close" class="button info shadow">确定</button>
                </p>
            </div>
        </modal>
    </div>
</template>
<style lang="sass">
    .popup-alert {
        .content {
            display: flex;
            align-items: center;
            justify-content: center;
            &>.icon {
                width: 30px;
                min-width: 30px;
                height: 30px;
                text-align: center;
                font-size: 22px;
                font-weight: bolder;
                display: inline-block;
                border-radius: 100%;
                color: #fff;
                border: none;
                background: #00b4aa;
            }
            &>.main {
                padding-left: 10px;
            }
        }
    }
</style>
<script>
    import modal from '../../components/modal.vue'

    export default {
        data() {
            return {
                text: ''
            }
        },
        methods: {
            close() {
                this.text = ''
            }
        },
        components: {
            modal
        }
    }
</script>