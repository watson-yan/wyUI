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
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {
        list() {
            return this.$store.state.list
        }
    },
    methods:{}
}
</script>