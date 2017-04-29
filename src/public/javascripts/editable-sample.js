$.fn.editable.defaults.mode = 'inline';

// <a id="username" class="editable editable-set-enabled" data-type="text" data-pk="1" data-title="Enter username">superuser</a>

$(document).ready(function () {
    // #username -> CSS selector of the editable element
    $('#username').editable();

    $('.editable-set-enabled').editable({
        success: function (data, config) {
            console.log(config);
            console.log($(this));
        }
    });
});