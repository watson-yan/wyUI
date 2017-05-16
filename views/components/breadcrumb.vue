<template>
    <div class="breadcrumb">
        <nav>
            当前位置：
            <router-link :to="routes.to" class="primary no-decoration">{{routes.name}}</router-link>
            <router-link v-if="routes.child" :to="routes.child.to" class="primary no-decoration">
                &nbsp;/&nbsp;{{routes.child.name}}</router-link>
        </nav>
    </div>
</template>
<style lang="sass">
    .breadcrumb {
        background: #fff;
        border-bottom: 1px solid #e1e2e2;
        nav {
            padding: 0px 26px;
            line-height: 40px;
            font-size: 12px;
            color: gray;
        }
    }
</style>
<script>
export default {
    props: {
        routes: {
            type: Object,
            required: true
        }
    },
    data() {
        return {}
    },
    watch: {
        $route: {
            handler(newVal) {
                console.warn(newVal)
            }
        }
    },
    created() {
        console.warn('123')
    }
}
</script>
