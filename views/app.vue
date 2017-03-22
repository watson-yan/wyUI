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
                <nav-menu></nav-menu>
            </div>
            <div class="app-right">
                <!--<breadcrumb :routes="routes"></breadcrumb>-->
                <div class="app-content">
                    <router-view></router-view>
                </div>
            </div>
        </article>
    </div>
</template>
<style lang="sass" src="./app.scss"></style>
<script>
    import navMenu from './layout/menu.vue'

    export default {
        data() {
            return {
            }
        },
        created() {
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
            },
            show() {
                console.warn('hello')
            }
        },
        components: {
            navMenu
        }
    }
</script>
