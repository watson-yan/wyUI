<template>
    <div class="app-left-menu">
        <h4 class="toggle-menu detail" v-if="mode=='detail'">
            网站导航 <a @click="mode='brief'" class="fa fa-outdent" aria-hidden="true"></i>
        </h4>
        <h4 class="toggle-menu brief" v-if="mode=='brief'">
            &nbsp;<a @click="mode='detail'" class="fa fa-indent" aria-hidden="true"></i>
        </h4>
        <ul v-if="mode=='detail'" class="detail">
            <li v-for="item in list">
                <a v-if="item.outerLink" :href="item.to" target="_blank" class="no-decoration">
                    <i :class="item.icon"></i> {{item.title}}
                </a>
                <a v-else @click="next(item)" class="no-decoration">
                    <i :class="item.icon"></i> {{item.title}}
                </a>
                <div v-if="!item.outerLink && item.children && item.children.length != 0">
                    <ul class="children-box" style="display: none;">
                        <li v-for="c of item.children">
                            <router-link :to="c.to" class="no-decoration">
                                {{c.title}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>

        <ul v-if="mode=='brief'" class="brief">
            <li v-for="item of list">
                <a v-if="item.outerLink" :href="item.to"
                     target="_blank" class="no-decoration" :title="item.title">
                    <i :class="item.icon"></i>
                </a>
                <router-link v-if="!item.outerLink && !item.children" @mouseenter="mouseenter"
                 :to="item.to" class="brief-item no-decoration" :title="item.title">
                    <i :class="item.icon"></i>
                </router-link>
                <a v-if="!item.outerLink && item.children && item.children.length != 0" :title="item.title">
                    <i :class="item.icon"></i>
                </a>
                <div v-if="!item.outerLink && item.children && item.children.length != 0">
                    <ul class="children-box">
                        <li v-for="c of item.children">
                            <router-link :to="c.to" class="no-decoration">
                                {{c.title}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>
<style lang="sass">
    .app-left-menu {
        display: inline-block;
        height: 100%;
        background: #f8f8f8;
        border-right: 1px solid #e1e2e2;
        transition: all ease .2s;

        .toggle-menu{
            margin: 0;
            line-height: 40px;
            background: #f2f3f4;
            border-bottom: 1px solid #e1e2e2;
            a {
                float: right;
                margin-right: 15px;
                line-height: 40px;
            }

            &.brief {
                padding-left: 0px;
            }
            &.detail {
                padding-left: 46px;
            }
        }
        
        ul {
            margin: 0px;
            list-style: none;
            &.brief {
                width: 40px;
                padding: 5px 5px 5px 5px;
                li {
                    position: relative;
                    a {
                        padding-left: 14px;
                    }
                    &>div {
                        display: none;
                        position: absolute;
                        left: 40px;
                        top: 0;
                        .children-box {
                            padding-left: 0px;
                            margin-left: 5px;
                            width: 100px;
                            background: #fff;
                            border-top: 1px solid #ddd;
                            border-bottom: 1px solid #ddd;
                            li {
                                border-left: 1px solid #ddd;
                                border-right: 1px solid #ddd;
                                line-height: 30px;
                            }
                        }
                    }
                    &:hover {
                        &>div {
                            display: inline;
                        }
                    }
                }
            }
            &.detail {
                width: 140px;
                padding: 5px 10px 5px 5px;
                ul {
                    padding-left: 24px;
                    li {
                        line-height: 30px;
                    }
                }
            }
            li {
                line-height: 40px;
                a{
                    display: block;
                    padding-left: 20px;
                    color: #888888;
                    &:hover {
                        color: #007ACC;
                        background: #f3f4f4;
                    }
                }
            }
        } 
    }
</style>
<script>
// {  // 菜单项应该写成的格式
//     title: '',   // 名称
//     to: '',      // 链接地址
//     outerLink: '',  // Boolean, 是否是外部链接  内部链接用router-link, 外部链接使用传统a标签
//     icon: '',    // 对应的fontawesome图标的class
//     children: []  // 子分类(不渲染图标)
// },
    export default {
        data() {
            return {
                mode: 'detail',     // 菜单模式切换 'brief': 缩略    'detail'： 详情
                list: []
            }
        },
        created() {
            this.list = [
                    {title: '综合首页', to: '/', icon: 'fa fa-home'},
                    {title: '按钮标签', to: '/button', icon: 'fa fa-hand-o-up', children: [
                        {title: '按钮', to: '/button'},
                        {title: '标签', to: '/label'}
                    ]},
                    {title: '文本表单', to: '/button', icon: 'fa fa-align-left'},
                    {title: '弹框提醒', to: '/', icon: 'fa fa-arrows-alt'},
                    {title: '加载动画', to: '', icon: 'fa fa-hourglass-half'}
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
            next(item) {
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

