module.exports = {
    phone: function (rule, value) {
        if (rule.required == true && rule.allowEmpty != true) {
            return this.t('should not be empty');
        }
        if (rule.required == true) {
            let reg = /^1[3456789]\d{9}$/
            if (!reg.test(value)) {
                return this.t('should be a phone number')
            }
        }
    }
}