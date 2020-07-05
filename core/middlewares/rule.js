module.exports = {
    phone: function (rule, value) {
        if (rule.required == true) {
            if (!value) {
                if (!rule.hasOwnProperty('allowEmpty') || rule.allowEmpty == false) {
                    return this.t('should not be empty')
                }
            }
            let reg = /^1[3456789]\d{9}$/
            if (!reg.test(value)) {
                return this.t('should be a phone number')
            }
        }
    }
}