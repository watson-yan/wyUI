<template>
    <div class="init-page">
        <h4 class="title">下拉框</h4>
        <wy-select :options="options" v-on:changed="changed"></wy-select>
        <p>使用方式：</p>
        <pre>
&lt;wy-select :options="options" v-on:changed="changed"&gt;&lt;/wy-select&gt;
// 参数列表

// 1. options--选择项列表
//      type: Array
//      example: [{value: 1, text: 'select1'},{value: 2, text: 'select2'}, ...]
//      可以没有value, 但是必须要有text属性，它将作为显示项

// 2. v-on:changed = "someMethod"
//      type： Function
//      下拉框选定或者改变值得时候都会触发父元素定义的changed事件，并有一个选中的对象作为参数

// 3. width
//      type: Number
//      下拉框的宽度, 默认是200px宽

// 4. selected
//      type: Object
//      默认选中的值，须和options中选择项一样
        </pre>


        <h4 class="title">
            省市级联特效
        </h4>
        <wy-area v-on:changed="areaChanged" :selected="{province: '上海', city: '徐汇区'}"></wy-area>
        <p>使用方式：</p>
        <pre>
&lt;wy-area v-on:changed="areaChanged" :selected="{province: '上海', city: '徐汇区'}"&gt;&lt;/wy-area&gt;
// 参数列表

// 1. v-on:changed = "someMethod"
//      type： Function
//      下拉框选定或者改变值得时候都会触发父元素定义的changed事件，并有两个字符串(province, city)作为参数

// 2. selected
//      type: Object
//      默认选中的值，必须保证area数据中的一级选项和二级选项对应
        </pre>
    </div>
</template>
<style lang="sass">

</style>
<script>
export default {
    data() {
        return {
            options: [
                {value: 1, text: '中国工商银行'},
                {value: 2, text: '中国农业银行'},
                {value: 3, text: '中国建设银行'},
                {value: 4, text: '中国交通银行'},
                {value: 5, text: '招商银行'},
                {value: 6, text: '平安银行'},
                {value: 7, text: '农村信用社'}
            ]
        }
    },
    methods: {
        changed(item) {
            console.warn(item)
        },
        areaChanged(province, city) {
            console.warn(`${province}-${city}`)
        }
    }
}
</script>