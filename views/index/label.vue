<template>
    <div class="init-page">
        <p v-for="item in list">
            {{item.name}},{{item.age}}岁
        </p>
        <button @click="add">点</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {name: '阿萨德1', age: 123},
                {name: '阿萨德4', age: 124},
                {name: '阿萨德3', age: 125},
                {name: '阿萨德2', age: 126}
            ]
        }
    },
    created() {
    },
    methods: {
        add() {
            this.list.forEach((item) => {
                item.age = item.age + 1
            })
        }
    }
}
</script>
<style>
</style>