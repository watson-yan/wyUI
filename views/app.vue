<template>
    <div class="app">
        <header>
            <nav>
                <h3>WYUI</h3>
                <ul class="logined-list pull-right">
                    <li>
                        <router-link to="/me" class="text white no-decoration">
                            <i class="fa fa-user-circle"></i> 个人信息
                        </router-link>
                        <section>
                            <ul>
                                <li>我的资料</li>
                                <li>浏览历史</li>
                                <li>修改密码</li>
                                <li>登录记录</li>
                            </ul>
                        </section>
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
                    <transition :name="transitionName">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    import navMenu from './layout/menu.vue'

    export default {
        data() {
            return {
                transitionName: ''
            }
        },
        watch: {
            $route(to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
        },
        components: {
            navMenu
        }
    }
</script>
<style lang="sass" src="./app.scss"></style>

