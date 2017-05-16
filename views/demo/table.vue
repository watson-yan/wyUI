<template>
    <div class="init-page">
        <h4 class="title">默认颜色表格</h4>
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
        <p>使用方式：</p>
        <pre>
    &lt;table class="table"&gt;
        &lt;thead&gt;
            &lt;th&gt;...&lt;/th&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
            &lt;tr&gt;
                &lt;td&gt;...&lt;/td&gt;
            &lt;/tr&gt;
        &lt;/tbody&gt;
    &lt;/table&gt;
        </pre>
            

        <h4 class="title">主颜色表格</h4>
        <table class="table primary" border="0">
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
        <p>使用方式：</p>
        <pre>
    &lt;table class="table primary"&gt;
        &lt;thead&gt;...&lt;/thead&gt;
        &lt;tbody&gt;...&lt;/tbody&gt;
    &lt;/table&gt;
        </pre>


        <h4 class="title">斑马线效果</h4>
        <table class="table table-striped " border="0">
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
        <p>使用方式：</p>
        <pre>
    &lt;table class="table primary"&gt;
    &lt;thead&gt;...&lt;/thead&gt;
    &lt;tbody&gt;...&lt;/tbody&gt;
    &lt;/table&gt;
        </pre>

        <!--<h4 class="title">滑动表格</h4>
        <div style="height: 300px; width:800px; overflow-y: auto;">
            <table class="table fixed-top" border="0">
                <thead>
                    <th>订单编号</th>
                    <th>商品名称</th>
                    <th>成交数量</th>
                    <th>折扣</th>
                    <th>成交单价</th>
                    <th>成交时间</th>
                    <th>成交总额</th>
                    <th>客户</th>
                    <th>仓库</th>
                    <th>操作</th>
                </thead>
            </table>-->
            <!--<table class="table fixed-top" border="0">
                <thead>
                    <th>订单编号</th>
                    <th>商品名称</th>
                    <th>成交数量</th>
                    <th>折扣</th>
                    <th>成交单价</th>
                    <th>成交时间</th>
                    <th>成交总额</th>
                    <th>客户</th>
                    <th>仓库</th>
                    <th>操作</th>
                </thead>
                <tbody>
                    <tr v-for="item of list1" class="center">
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.sales}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.orderTime}}</td>
                        <td>{{item.total}}</td>
                        <td>{{item.customer}}</td>
                        <td>{{item.warehouse}}</td>
                        <td>
                            <a to="/" class="primary">详情</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>使用方式：</p>
        <pre>
    &lt;table class="table primary"&gt;
    &lt;thead&gt;...&lt;/thead&gt;
    &lt;tbody&gt;...&lt;/tbody&gt;
    &lt;/table&gt;
        </pre>-->
    </div>
</template>
<style lang="sass">
    .table {
        &.fixed-top {
            white-space: nowrap;
        }
    }
</style>
<script>
export default {
    data() {
        return {
            list1: [
                {
                    id: '001',
                    name: '随便其他什么人吃的东西随便其他什么人吃的东西随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库(储物仓)'
                },
                {
                    id: '002',
                    name: '随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库'
                },
                {
                    id: '003',
                    name: '随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库'
                },
                {
                    id: '004',
                    name: '随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库'
                },
                {
                    id: '005',
                    name: '随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库'
                },
                {
                    id: '005',
                    name: '随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库'
                },
                {
                    id: '005',
                    name: '随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库'
                },
                {
                    id: '005',
                    name: '随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库'
                },
                {
                    id: '005',
                    name: '随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库'
                },
                {
                    id: '005',
                    name: '随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库'
                },
                {
                    id: '005',
                    name: '随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库'
                },
                {
                    id: '005',
                    name: '随便其他什么人吃的东西',
                    quantity: 10,
                    sales: 0,
                    price: 10.00,
                    orderTime: '2017-03-01 10:00',
                    total: 100.00,
                    customer: 'John Rogeborger',
                    warehouse: '上海市二号仓库'
                }
            ]
        }
    },
    computed: {
        list() {
            return this.$store.state.list
        }
    },
    methods: {}
}
</script>
