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