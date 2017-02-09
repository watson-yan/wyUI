<template>
    <div class="init-page">
        <section class="flex">
             <form class="form col4" action="">
                <h4 class="form-title">表单测试/下划线样式</h4>
                <div class="form-group item">
                    <label for="">用户名:</label>
                    <input type="text" class="underline">
                </div>
                <div class="form-group item">
                    <label for="">密&#12288;码:</label>
                    <input type="password" class="underline">
                </div>
                <div class="form-group item">
                    <label for="">邮&#12288;箱:</label>
                    <input type="email" class="underline">
                </div>
                <div class="form-group item">
                    <label for="">手&#12288;机:</label>
                    <input type="text" class="underline">
                </div>
                <div class="form-group item">
                    <label for="">地&#12288;址:</label>
                    <input type="text" class="underline">
                </div>
                <div class="form-group">
                    <button class="button primary shadow pull-right">确认</button>
                </div>
            </form>
            <div class="col1">
            </div>
            <form class="form col4" action="">
                <h4 class="form-title">表单测试/普通样式</h4>
                <div class="form-group item">
                    <label for="">用户名:</label>
                    <input type="text">
                </div>
                <div class="form-group item">
                    <label for="">密&#12288;码:</label>
                    <input type="password">
                </div>
                <div class="form-group item">
                    <label for="">邮&#12288;箱:</label>
                    <input type="email">
                </div>
                <div class="form-group item">
                    <label for="">手&#12288;机:</label>
                    <input type="text">
                </div>
                <div class="form-group item">
                    <label for="" style="align-self: top;">地&#12288;址:</label>
                    <textarea name="" id="" rows="5"></textarea> 
                </div>
                <div class="form-group">
                    <button class="button danger shadow pull-right">确认</button>
                </div>
            </form>
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {

    }
}
</script>