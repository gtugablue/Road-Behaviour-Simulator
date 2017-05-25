var config = require('./../configuration/config');
var errors = require('./../utils/errors');

function render(res, page, options, breadcrumb) {

    var new_options = {
        title: config.app_title,
        layout: 'layout',
        breadcrumb: breadcrumb ? breadcrumb : [],
        errors: errors.getErrors()
    }

    res.render(page, Object.assign(new_options, options));
}

module.exports = {
    render: render
}