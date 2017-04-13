<template>
    <div class="wy-select">
        <input type="text" :value="selectedText" @click.stop="show = !show" readonly :style="{width: width + 'px'}">
        <span class="arrow-down" :style="{left: width + 'px'}"></span>
        <section v-if="show" class="list-box">
            <ul :style="{minWidth: width + 10 + 'px'}">
                <li v-for="item of options" @click="select(item)">{{item.text}}</li>
            </ul>
        </section>
    </div>
</template>

<style lang="sass">
    .wy-select {
        position: relative;
        input {
            background-color: #eee;
            background-image: linear-gradient(#fcfcfc, #eee);
            cursor: pointer;
        }
        .arrow-down {
            content: '';
            display: block;
            position: absolute;
            top: 14px;
            border-top: 4px solid #888;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
        }
        &>section {
            position: absolute;
            background: #fff;
            max-height: 165px;
            overflow-y: scroll;
            border: 1px solid #ececec;
            z-index: 100;
            ul {
                list-style: none;
                margin: 0;
                padding-left: 0px;
                li {
                    padding: 0px 10px;
                    line-height: 32px;
                    cursor: pointer;
                    border-bottom: 1px solid #e5e5e5;
                    &:hover {
                        color: #fff;
                        background: #007ACC;
                    }
                }
            }
        }
    }
</style>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 200
        },
        options: {
            type: Array,
            required: true
        },
        selected: {
            type: Object
        }
    },
    data() {
        return {
            show: false,
            selectedText: ''
        }
    },
    mounted() {
        // 如果传入默认选中值的话
        if (this.selected) {
            for (const option of this.options){
                if (option.text === this.selected.text || option.value === this.selected.value) {
                    this.selectedText = option.text
                    this.$emit('changed', option)
                    break
                }
            }
        }
    },
    watch: {
        show() {
            if(this.show) {
                document.body.addEventListener('click', this.tab)
            } else {
                document.body.removeEventListener('click', this.tab)
            }
        }
    },
    methods: {
        select(item) {
            this.selectedText = item.text
            this.$emit('changed', item)
        },
        tab() {
            this.show = false
        }
    }
}
</script>