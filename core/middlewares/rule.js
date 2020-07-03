export default {
    phone: function (rule, value) {
        let reg = /^1[3456789]\d{9}$/
        if(!reg.test(value)) {
            return this.t('请输入正确的手机号')
        }
    }
}