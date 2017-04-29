if (window.location.hash && window.location.hash == '#_=_') {
    window.location.hash = '';
}

$(document).ready(function () {
    $('.editable-set-enabled').editable();
});

function toggleEditableEnabled() {
    $('.editable').editable('toggleDisabled');
}

function setEditableEnabled(enabled) {
    $('.editable').editable({'disabled': !enabled});
}