import Vue from 'vue'
import Alert from './alert.vue'
import Confirm from './confirm.vue'
import Message from './message.vue'

// Alert框
const alertBox = document.createElement('div')
document.body.appendChild(alertBox)

const alertComponent = new Vue(Alert).$mount(alertBox)
const alert = (text) => {
    alertComponent.text = text
}

// Confirm框
const confirmBox = document.createElement('div')
document.body.appendChild(confirmBox)

const confirmComponent = new Vue(Confirm).$mount(confirmBox)
const confirm = (option) => {
    confirmComponent.option = option
}

// Message列表
const messageBox = document.createElement('div')
document.body.appendChild(messageBox)

const messageComponent = new Vue(Message).$mount(messageBox)
let counter = 1
const message = (option) => {
    const temp = counter
    if (typeof option === 'string') {
        messageComponent.queue.push({
            text: option,
            stamp: temp
        })
    }
    if (typeof option === 'object') {
        messageComponent.queue.push({
            text: option.text,
            stamp: temp
        })
    }
    counter++
    setTimeout(function() {
        messageComponent.queue.forEach((item, index) => {
            if (item.stamp === temp) {
                messageComponent.queue.splice(index, 1)
            }
        })
    }, option.duration || 5000);
}


export default {
    alert,
    confirm,
    message
}