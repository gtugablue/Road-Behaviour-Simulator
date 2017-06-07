var config = require('./../configuration/config');
var errors = require('./../utils/errors');

function render(res, page, options, breadcrumb) {

    var new_options = {
        title: config.app_title,
        layout: 'layout',
        breadcrumb: breadcrumb ? breadcrumb : [],
        errors: errors.getErrors(),
        baseURL: (process.env.NODE_ENV === 'production') ? 'https://mssi-tps.herokuapp.com/' : 'http://localhost:3000/',
    }

    res.render(page, Object.assign(new_options, options));
}

module.exports = {
    render: render
}
