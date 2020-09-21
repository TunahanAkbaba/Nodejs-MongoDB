const { helpers } = require('handlebars')
const moement = require('moment')

module.exports = {
    generateDate: (date, format) => {
        return moment(date).format(format)
      }
}