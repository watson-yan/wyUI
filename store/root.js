import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0,
        list: [
            {id: '001', createTime: '2016-10-01', money: '￥1,020', customer: 'Kimber David' },
            {id: '002', createTime: '2016-10-01', money: '￥1,020', customer: 'Kimber David' },
            {id: '003', createTime: '2016-10-01', money: '￥1,020', customer: 'Kimber David' },
            {id: '004', createTime: '2016-10-01', money: '￥1,020', customer: 'Kimber David' },
            {id: '005', createTime: '2016-10-01', money: '￥1,020', customer: 'Kimber David' },
            {id: '006', createTime: '2016-10-01', money: '￥1,020', customer: 'Kimber David' },
            {id: '007', createTime: '2016-10-01', money: '￥1,020', customer: 'Kimber David' },
        ]
    },
    mutations: {
        add(state) {
            return state.count++
        }
    }
})

export default store