<template>
    <div v-if="showModal" class="wy-modal">
        <div v-if="!hideMask" class="wy-modal-mask"></div>
        <div v-bind:style="{ width: w + 'px', height: h + 'px' }" class="wy-modal-body">
            <header>
                <span @click="close" class="close">+</span>
                <slot name="header"></slot>
            </header>
            <main>
                <slot></slot>
            </main>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            // 是否隐藏遮罩层
            hideMask: {
                type: Boolean,
                default: false
            },
            w: {
                type: Number,
                default: 400
            },
            h: {
                type: Number,
                default: 200
            }
        },
        data() {
            return {
                showModal: false
            }
        },
        watch: {
            show(newVal) {
                this.showModal = newVal
            }
        },
        created() {
            this.showModal = this.show
        },
        methods: {
            close() {
                this.$parent.showModal = false
            }
        }
    }
</script>
<style lang="sass">
    .wy-modal {
        display: inline-block;
        .wy-modal-mask {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 99;
            background: rgba(0, 0, 0, 0.3)
        }
        .wy-modal-body {
            position: absolute;
            display: flex;
            flex-direction: column;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%);
            background: #fff;
            z-index: 100;
            &>header {
                position: relative;
                padding: 0px 10px;
                flex-grow: 0;
                border-bottom: 1px solid #ddd;
                .close {
                    position: absolute;
                    right: -9px;
                    top: -9px;
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                    color: #fff;
                    background: rgba(0,0,0,0.8);
                    text-align: center;
                    cursor: pointer;
                    border-radius: 100%;
                    transform: rotate(45deg)
                }
            }
            &>main{
                flex-grow: 1;
            }
            &>footer {
                flex-grow: 0;
                padding: 0px 10px;
                border-top: 1px solid #ddd;
            }
        }
    }
</style>