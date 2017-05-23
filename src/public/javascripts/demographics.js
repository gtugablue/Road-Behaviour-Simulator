$(document).ready(function () {
    var radio_button = $("#form-drivers-license");
    radio_button.click(function () {
        if (radio_button.is(':checked')) {
            $(".demographics-form-optional").show();
        } else {
            $(".demographics-form-optional").hide();
        }
    });
    $(".demographics-form-optional").hide();

    $("#submit-button").click(function() {
        console.log($("#form-birthday").val());
        console.log($("#form-gender-male").is(":checked"));
    });
});