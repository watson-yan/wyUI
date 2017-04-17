<template>
    <div class="init-page">
        <table class="table" border="0">
            <thead>
                <th>订单编号</th>
                <th>成交时间</th>
                <th>成交金额</th>
                <th>客户</th>
                <th>操作</th>
            </thead>
            <tbody>
                <tr v-for="item of list" class="center">
                    <td>{{item.id}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.money}}</td>
                    <td>{{item.customer}}</td>
                    <td>
                        <a to="/" class="primary">详情</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div style="margin-top: 10px;">
            <pagination :total="124" :pn="1"></pagination>
        </div>

        <div>
            <button @click="alertMsg" class="button big info">消息列表</button>
            <button @click="confirmMsg" class="button big danger">确认框</button>
            <button @click="setLoding" class="button big primary">loading</button>
            <br>
            <br>
            <wy-select :options="options" v-on:changed="changed" :selected="selected"></wy-select>
            <br>
            <br>
            <wy-area v-on:changed="areaChanged" :selected="{province: '上海', city: '徐汇区'}"></wy-area>
            <br>
            <br>
            <div style="width: 410px;">
                <upload :src="'/api/imgs'"></upload>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
    .app-home {
    }
</style>
<script>
    export default {
        data() {
            return {
                showModal: false,
                options: [
                    {value: 1, text: '创建后也是响应式的1'},
                    {value: 2, text: '创建后也是响应式的2'},
                    {value: 3, text: '创建后也是响应式的3'},
                    {value: 4, text: '创建后也是响应式的4'},
                    // {value: 1, text: '创建后也是响应式的1'},
                    // {value: 2, text: '创建后也是响应式的2'},
                    // {value: 3, text: '创建后也是响应式的3'},
                    // {value: 4, text: '创建后也是响应式的4'},{value: 1, text: '创建后也是响应式的1'},
                    // {value: 2, text: '创建后也是响应式的2'},
                    // {value: 3, text: '创建后也是响应式的3'},
                    // {value: 4, text: '创建后也是响应式的4'}

                ],
                selected: {value: 4, text: '创建后也是响应式的4'}
            }
        },
        computed: {
            list() {
                return this.$store.state.list
            }
        },
        created() {
        },
        methods: {
            alertMsg() {
                this.$plugins.Popup.message({text:'设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的1', duration: 1000})
                this.$plugins.Popup.message({text:'设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的2', duration: 3000})
                this.$plugins.Popup.message({text:'设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的3', duration: 6000})
            },
            confirmMsg() {
                this.$plugins.Popup.confirm({
                    title: '删除提示',
                    text: '设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。',
                    cb: () => {
                        this.$plugins.Popup.alert('删除成功!')
                    }
                })
            },
            setLoding() {
                this.$plugins.Loading.show()
                setTimeout(() => {
                    this.$plugins.Loading.close()
                }, 5000)
            },
            changed(result) {
                console.warn(result)
            },
            areaChanged(province, city) {
                console.warn(`${province}-${city}`)
            }
        }
    }
</script>