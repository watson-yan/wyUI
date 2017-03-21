<template>
    <article class="init-page">
        <h4 class="title">表单测试</h4>
        <div style="display: flex; justify-content: space-around;">
            <form class="form" style="width: 450px; display: inline-block;">
                <section class="col4">
                    <div class="form-group item">
                        <label for="">用户名:</label>
                        <input type="text" class="input">
                    </div>
                    <div class="form-group item">
                        <label for="">密&#12288;码:</label>
                        <input type="password" class="input">
                    </div>
                    <div class="form-group item">
                        <label for="">邮&#12288;箱:</label>
                        <input type="email" class="input">
                    </div>
                    <div class="form-group item">
                        <label for="">手&#12288;机:</label>
                        <input type="text" class="input">
                    </div>
                    <div class="form-group item">
                        <label for="">银&#12288;行:</label>
                        <select style="width: 200px;">
                            <option value="1">中国农业银行</option>
                            <option value="2">中国工商银行</option>
                            <option value="3">中国建设银行</option>
                            <option value="4">中国平安银行</option>
                        </select>
                    </div>
                    <div class="form-group item">
                        <label for="">性&#12288;别:</label>
                        <section>
                            <input type="radio" name="gender"> 男&nbsp;
                            <input type="radio" name="gender"> 女&nbsp;
                        </section>
                    </div>
                    <div class="form-group item">
                        <label for="">爱&#12288;好:</label>
                        <section>
                            <input type="checkbox"> 乒乓球&nbsp;
                            <input type="checkbox"> 羽毛球&nbsp;
                            <input type="checkbox"> 篮球&nbsp;
                            <input type="checkbox"> 足球&nbsp;
                            <input type="checkbox"> 网球&nbsp;
                        </section>
                    </div>
                    <div class="form-group item">
                        <label for="" style="align-self: top;">地&#12288;址:</label>
                        <textarea name="" id="" rows="5"></textarea> 
                    </div>
                    <div class="form-group item" style="display: flex; justify-content: flex-end;">
                        <button class="button danger shadow pull-right">确认</button>
                    </div>
                </section>
            </form>
            <form class="form" style="width: 450px; display: inline-block;">
                <section>
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
                    <div class="form-group item" style="display: flex; justify-content: flex-end;">
                        <button class="button primary shadow">确认</button>
                    </div>
                </section>
                <section class="col5"></section>
            </form>
        </div>
        <h4 class="title">带ICON的输入框</h4>
        <div class="input-icon">
            <input class="input icon-right" type="text" style="width: 300px;">
            <section class="icon-box right">
                <i class="fa fa-search"></i>
            </section>
        </div>
        <div class="input-icon">
            <section class="icon-box left">
                <i class="fa fa-envelope"></i>
            </section>
            <input class="input icon-left" type="text" style="width: 300px;">
        </div>
        <div class="input-icon">
            <section class="icon-box left">
                <i class="fa fa-phone"></i>
            </section>
            <input class="input icon-left" type="text" style="width: 300px;">
        </div>
    </article>
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