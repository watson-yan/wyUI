<template>
    <div v-if="show" class="wy-modal">
        <div v-if="!hideMask" class="wy-modal-mask"></div>
        <div v-bind:style="{ width: w + 'px', height: h + 'px' }" class="wy-modal-body">
            <header>
                <slot name="header"></slot>
                <span @click="closeModal" class="close">x</span>
            </header>
            <div class="main">
                <slot></slot>
            </div>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            close: {
                type: Function,
                required: true
            },
            w: {
                type: Number,
                default: 400
            },
            h: {
                type: Number,
                default: 200
            },
            hideMask: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                show: true
            }
        },
        methods: {
            closeModal() {
                this.close()
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
            border-radius: 4px;
            z-index: 100;
            &>header {
                position: relative;
                padding: 0px 40px 0px 10px;
                flex-grow: 0;
                border-bottom: 1px solid #ddd;
                .close {
                    position: absolute;
                    width: 40px;
                    right: 0px;
                    top: 0px;
                    background: #f0f0f0;
                    text-align: center;
                    cursor: pointer;
                    &:hover {
                        background: #007ACC;
                        color: #fff;
                    }
                }
            }
            &>.main{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-grow: 1;
                padding: 10px;
                overflow-y: auto;
            }
            &>footer {
                flex-grow: 0;
                padding: 0px 10px;
                border-top: 1px solid #ddd;
            }
        }
    }
</style>
