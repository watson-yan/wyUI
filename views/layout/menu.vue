<template>
    <div class="side-menu">
        <h4 class="menu-title detail" v-if="mode=='detail'">
            网站导航 <i @click="mode='brief'" class="fa fa-outdent" aria-hidden="true"></i>
        </h4>
        <h4 class="menu-title brief" v-if="mode=='brief'">
            <i @click="mode='detail'" class="fa fa-indent" aria-hidden="true" style="margin-left: 14px;"></i>
        </h4>
        <ul v-if="mode=='detail'" class="detail">
            <li v-for="item in list">
                <a v-if="item.outer" :href="item.to" target="_blank" class="text-ellipsis no-decoration">
                    <i :class="item.icon"></i> {{item.title}}
                </a>
                <a v-else v-on:click="next(item, $event)" class="text-ellipsis no-decoration">
                    <i :class="item.icon"></i> {{item.title}}
                </a>
                <div v-if="!item.outer && item.children && item.children.length != 0">
                    <ul class="children-box" style="display: none;">
                        <li v-for="c of item.children">
                            <router-link :to="c.to" class="text-ellipsis no-decoration">
                                {{c.title}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>

        <ul v-if="mode=='brief'" class="brief">
            <li v-for="item of list">
                <a v-if="item.outer" :href="item.to"
                     target="_blank" :title="item.title">
                    <i :class="item.icon"></i>
                </a>
                <router-link v-if="!item.outer && !item.children" @mouseenter="mouseenter"
                 :to="item.to" class="brief-item text-ellipsis no-decoration" :title="item.title">
                    <i :class="item.icon"></i>
                </router-link>
                <a v-if="!item.outer && item.children && item.children.length != 0" :title="item.title">
                    <i :class="item.icon"></i>
                </a>
                <div v-if="!item.outer && item.children && item.children.length != 0">
                    <p style="color: #666;">{{item.title}}</p>
                    <ul class="children-box">
                        <li v-for="c of item.children">
                            <router-link :to="c.to" class="text-ellipsis no-decoration">
                                {{c.title}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>
<style lang="sass" src="./menu.scss"></style>
<script>
    export default {
        data() {
            return {
                mode: 'detail',     // 菜单模式切换 'brief': 缩略    'detail'： 详情
                list: []
            }
        },
        created() {
            this.list = [
                    {
                        title: '综合首页',
                        to: '/', 
                        icon: 'fa fa-home'
                    },
                    {
                        title: '按钮标签',
                        to: '/button',
                        icon: 'fa fa-hand-o-up',
                        children: [
                            {title: '按钮', to: '/button'},
                            {title: '标签', to: '/span'}
                        ]
                    },
                    {
                        title: '文本表单',
                        icon: 'fa fa-align-left',
                        children: [
                            {title: '表单', to: '/form'},
                            {title: '下拉框', to: '/select'}
                        ]
                    },
                    {
                        title: '表格样式',
                        to: '/table',
                        icon: 'fa fa-table'
                    },
                    {
                        title: '弹框提醒', 
                        to: '/popup', 
                        icon: 'fa fa-arrows-alt'
                    },
                    {
                        title: '加载动画', 
                        to: '/loading', 
                        icon: 'fa fa-hourglass-half'
                    }
            ]
        },
        watch: {
            mode(newVal) {
                if (newVal === 'brief') {
                    this.briefBind()
                }
            }
        },
        methods: {
            briefBind() {
                let list = document.getElementsByClassName('brief-item')
                if (!list || list.length === 0) {
                    return
                }
                list.forEach((item) => {
                    item.addEventListener('mouseenter', () => {
                        console.log('enter')
                        const target = event.target
                        const childrenBox = event.target.parentNode.querySelector('div')
                        childrenBox.style.display = childrenBox.style.display === 'none' ? 'block' : 'none'
                    }, false)
                })
            },
            next(item, event) {
                event.preventDefault()
                if (item.children && item.children.length > 0) {
                    const childrenBox = event.target.parentNode.querySelector('ul')
                    childrenBox.style.display = childrenBox.style.display === 'none' ? 'block' : 'none'
                } else {
                    this.$router.push({path: `${item.to}`})
                }
            },
            mouseenter() {
                console.warn('asd')
            }
        }
    }
</script>

