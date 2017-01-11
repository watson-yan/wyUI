import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/index/index.vue'
import Button from '../views/index/button.vue'
import Label from '../views/index/label.vue'

const routes = [
    {path: '/', component: Index},
    {path: '/button', component: Button},
    {path: '/label', component: Label},
]

Vue.use(VueRouter)
const routers = new VueRouter({
    mode: 'history',
    routes: routes
})

export default routers