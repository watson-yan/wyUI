import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/index/index.vue'
import Button from '../views/demo/button.vue'
import Span from '../views/demo/span.vue'
import Table from '../views/demo/table.vue'
import Form from '../views/demo/form.vue'

const routes = [
    {path: '/', component: Index},
    {path: '/button', component: Button},
    {path: '/span', component: Span},
    {path: '/table', component: Table},
    {path: '/form', component: Form}
]

Vue.use(VueRouter)
const routers = new VueRouter({
    mode: 'history',
    routes: routes
})

export default routers