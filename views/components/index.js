import Vue from 'vue'
import breadcrumb from './breadcrumb.vue'
import pagination from './pagination.vue'
import modal from './modal.vue'
import popup from './popup.vue'
import table from './table.vue'
import select from './select.vue'

export default {
    install(Vue) {
        Vue.component('breadcrumb', breadcrumb)
        Vue.component('pagination', pagination)
        Vue.component('modal', modal)
        Vue.component('popup', popup)
        Vue.component('wy-table', table)
        Vue.component('wy-select', select)
    }
}