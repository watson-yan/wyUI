<template>
    <div class="area-selector">
        <input type="text" v-model="currentProvice" @click.stop="showProvinces=true" readonly>
        <template v-if="showProvinces">
            <section class="options-box">
                <ul>
                    <li v-for="a of area" @click="getCities(a)">{{a.name}}</li>
                </ul>
            </section>
        </template>

        <template v-if="cities">
            <section class="city-selector">
                <input type="text" v-model="currentCity" @click.stop="showCities=true" readonly>
                <template v-if="showCities">
                    <section class="options-box">
                        <ul>
                            <li v-for="c of cities" @click="selectCity(c)">{{c}}</li>
                        </ul>
                    </section>   
                </template>
            </section>
        </template>
    </div>
</template>
<style lang="sass">
.area-selector {
    position: relative;
    input {
        width: 160px;
        background-color: #eee;
        background-image: linear-gradient(#fcfcfc, #eee);
    }
    .options-box {
        position: absolute;
        max-height: 265px;
        overflow-y: scroll;
        z-index: 2;
        ul {
            padding-left: 0;
            min-width: 170px;
            margin: 0;
            list-style: none;
            background: #fff;
            border: 1px solid #ececec;
            li {
                padding: 0px 10px;
                line-height: 34px;
                border-bottom: 1px solid #ececec;
                &:hover {
                    background: #007ACC;
                    color: #fff;
                }
            }
        }
    }
    .city-selector {
        position: relative;
        display: inline-block;
    }
}
</style>
<script>
import area from '../../static/js/area'

export default {
    props: {
        selected: {
            type: Object
        }
    },
    data() {
        return {
            area: null,
            cities: null,
            currentProvice: '',
            currentCity: '',
            showProvinces: false,
            showCities: false
        }
    },
    watch: {
        showProvinces() {
            if (this.showProvinces) {
                document.body.addEventListener('click', this.tabProviceDisplay)
            } else {
                document.body.removeEventListener('click', this.tabProviceDisplay)
            }
        },
        showCities() {
            if (this.showCities) {
                document.body.addEventListener('click', this.tabCitiesDisplay)
            } else {
                document.body.removeEventListener('click', this.tabCitiesDisplay)
            }
        }
    },
    mounted() {
        this.area = area
        // 如果传入默认值得话，显示默认值
        if (this.selected) {
            this.currentProvice = this.selected.province || ''
            area.forEach((item) => {
                if (item.name === this.currentProvice) {
                    this.cities = item.children
                }
            }, this)
            this.currentCity = this.selected.city || ''
            if (this.currentProvice) {
                this.changed()
            }
        }
    },
    methods: {
        // 选中一级菜单后
        getCities(item) {
            if (this.currentProvice !== item.name) {
                this.currentCity = ''
            }
            this.currentProvice = item.name
            this.cities = item.children
            this.showProvinces = false
            this.changed()
        },
        // 选中二级菜单后
        selectCity(name) {
            this.currentCity = name
            this.showCities = false
            this.changed()
        },
        tabProviceDisplay() {
            this.showProvinces = false
        },
        tabCitiesDisplay() {
            this.showCities = false
        },
        changed() {
            this.$emit('changed', this.currentProvice, this.currentCity)
        }
    }
}
</script>
