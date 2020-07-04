const Parameter = require('parameter')
const rule = require('./rule.js')

module.exports = function (app, translate) {
    let parameter

    if (typeof translate === 'function') {
        parameter = new Parameter({
            translate
        })
    } else {
        parameter = new Parameter()
    }

    Object.keys(rule).forEach(type => {
        let check = rule[type]
        parameter.addRule(type, check)
    })

    app.context.verifyParams = function (rules, params) {
        if (!rules) {
            return
        }

        if (!params) {
            params = ['GET', 'HEAD'].includes(this.method.toUpperCase())
                ? this.request.query
                : this.request.body

            // copy
            params = Object.assign({}, params, this.params)
        }
        const errors = parameter.validate(rules, params)
        if (!errors) {
            return
        }
        this.throw(422, 'Validation Failed', {
            code: 'INVALID_PARAM',
            errors: errors,
            params: params
        })
    }

    return async function verifyParam(ctx, next) {
        try {
            await next()
        } catch (err) {
            if (err.code === 'INVALID_PARAM') {
                ctx.status = 422
                ctx.body = {
                    message: err.message,
                    errors: err.errors,
                    params: err.params
                }
                return
            }
            throw err
        }
    }
}
