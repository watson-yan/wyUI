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
            <button @click="showModal = !showModal">模态框</button>
            <modal :show="showModal">
                <div slot="header">
                    <p class="clear-margin" style="line-height: 40px;">这里是头部11</p>
                </div>
                <div slot="footer">
                    <p class="clear-margin" style="padding: 10px 0px; text-align:right;">
                        <button class="button shadow">取消</button>
                        <button class="button primary shadow">确定</button>
                    </p>
                </div>
            </modal>


            <button class="button small">小</button>
            <button class="button shadow">中</button>
            <button class="button danger shadow">中</button>
            <button class="button primary shadow">中</button>
            <button @click="alertMsg" class="button big info">大</button>

            <section>
                <input type="checkbox" value='1' v-model='choose'>
                <input type="checkbox" value='2' v-model='choose'>
                <input type="checkbox" value='3' v-model='choose'>
                <input type="checkbox" value='4' v-model='choose'>
            </section>
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
                choose: []
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
                console.log(this.$root)
                this.$root.alert({
                    title: '提示',
                    msg: '你知道了吗?',
                    cb() {
                        return;
                    }
                })
            }
        }
    }
</script>