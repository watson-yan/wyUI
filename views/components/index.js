import Vue from 'vue'
import breadcrumb from './breadcrumb.vue'
import pagination from './pagination.vue'
import modal from './modal.vue'
import popup from './popup.vue'

export default {
    install(Vue) {
        Vue.component('breadcrumb', breadcrumb)
        Vue.component('pagination', pagination)
        Vue.component('modal', modal)
        Vue.component('popup', popup)
    }
}