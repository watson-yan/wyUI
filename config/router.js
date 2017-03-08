import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/index/index.vue'
import Button from '../views/demo/button.vue'
import Span from '../views/demo/span.vue'
import Table from '../views/demo/table.vue'
import Form from '../views/demo/form.vue'

const routes = [
    {path: '/', name:'主页', component: Index},
    {path: '/button', name:'按钮', component: Button},
    {path: '/span', name:'标签', component: Span},
    {path: '/table', name:'表格', component: Table},
    {path: '/form', name:'表单', component: Form}
]

Vue.use(VueRouter)
const routers = new VueRouter({
    mode: 'history',
    routes: routes
})

export default routers