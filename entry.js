import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import router from './config/router.js'  // 路由
import store from './store/root.js'  // 根数据
import App from './views/app.vue'
import components from './views/components/index.js' // 公共组件
import plugins from './views/plugins/index.js'

Vue.use(components)
Vue.use(Vuex)

Vue.prototype.$plugins = plugins


const app = new Vue({
    el: '#app',
    router,
    store,
    render(h) {
        return h(App)
    }
})
