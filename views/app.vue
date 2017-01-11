<template>
    <div class="app">
        <header>
            <nav>
                <ul class="logined-list pull-right">
                    <li>
                        <router-link to="/me" class="text white no-decoration">
                            <i class="fa fa-user-circle"></i> 我的信息
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/login" class="text white no-decoration">
                            <i class="fa fa-sign-out"></i> 退出
                        </router-link>
                    </li>
                </ul>
            </nav>
        </header>
        <article>
            <div class="app-left">
                <left-menu></left-menu>
            </div>
            <div class="app-right">
                <breadcrumb :routes="routes"></breadcrumb>
                <div class="app-content">
                    <router-view></router-view>
                </div>
            </div>
        </article>
        <popup v-if="showModal"></popup>
    </div>
</template>
<style lang="sass" src="./app.scss"></style>
<script>
    import leftMenu from './layout/menu.vue'
    import popup from './layout/popup.vue'

    export default {
        data() {
            return {
                routes: {
                    to: '/',
                    name: '面板首页',
                    child: {
                        to: '/me',
                        name: '个人中心'
                    }
                },
                showModal: false,   // 控制弹出框
                popup: {            // 弹出框参数
                    title: '',
                    msg: '',
                    cb: null
                }
            }
        },
        methods: {
            setTitle(val) {
                document.title = val || ''
            },
            alert(option) {
                this.popup.title = option.title || '提示信息'
                this.popup.msg = option.msg
                if (typeof(option.cb) !== 'function') {
                    option.cb = null
                } else {
                    this.popup.cb = option.cb
                }
                this.showModal = true
            }
        },
        components: {
            leftMenu,
            popup
        }
    }
</script>
