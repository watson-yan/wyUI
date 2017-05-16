import Vue from 'vue'
import Loading from './loading.vue'

const loadingBox = document.createElement('div')
document.body.appendChild(loadingBox)

const loadingComponent = new Vue(Loading).$mount(loadingBox)
const show = () => {
    loadingComponent.show = true
}
const close = () => {
    loadingComponent.show = false
}

export default {
    show, close
}
