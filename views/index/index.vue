<template>
    <div class="init-page">
        <section class="module-link-area flex">
            <div class="col1">
                <a class="no-decoration">
                    <i class="fa fa-comments-o"></i> 消息
                </a>
            </div>
            <div class="col1">
                <a class="no-decoration">
                    <i class="fa fa-envelope-o"></i> 邮件
                </a>
            </div>
            <div class="col1">
                <a class="no-decoration">
                    <i class="fa fa-paper-plane"></i> 计划
                </a>
            </div>
            <div class="col1">
                <a class="no-decoration">
                    <i class="fa fa-shopping-cart"></i> 购物车
                </a>
            </div>
            
            
                
        </section>

        <h4 class="title">表格</h4>
        <div class="btn-group">
            <button 
                :class="{'button': true, 'small': true, 'active': active == 'value1'}" 
                @click="active='value1'">全部</button>
            <button 
                :class="{'button': true, 'small': true, 'active': active == 'value2'}" 
                @click="active='value2'">最近30天</button>
            <button 
                :class="{'button': true, 'small': true, 'active': active == 'value3'}" 
                @click="active='value3'">最近一年</button>
        </div>

        <div class="input-icon pull-right">
            <input type="text" class="input icon-right" style="width: 300px;">
            <section class="icon-box right">
                <i class="fa fa-search"></i>
            </section>
        </div>
        <table class="table table-striped" border="0">
            <thead>
                <th>订单编号</th>
                <th>成交时间</th>
                <th>成交金额</th>
                <th>状态</th>
                <th>客户</th>
                <th>操作</th>
            </thead>
            <tbody>
                <tr v-for="item of list" class="center">
                    <td>{{item.id}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.money}}</td>
                    <td>
                        <span v-if="item.status=='finished'" class="span primary">已完成</span>
                        <span v-if="item.status=='cancel'" class="span">已取消</span>
                        <span v-if="item.status=='pending'" class="span info">交易中</span>
                    </td>
                    <td>{{item.customer}}</td>
                    <td>
                        <a to="/">
                            <i class="fa fa-cog" aria-hidden="true"></i>
                        </a>
                        <a to="/">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div style="margin-top: 10px;">
            <pagination :total="124" :pn="1"></pagination>
        </div>
    </div>
</template>
<style lang="sass" src="./index.scss"></style>
<script>
    export default {
        data() {
            return {
                active: 'value1'
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
        
        }
    }
</script>