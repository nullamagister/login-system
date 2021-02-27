$(function() {  
    // Setup niceScroll
    $("body").niceScroll({
        cursorcolor: "#007bff",
        cursorwidth: "10px",
        horizrailenabled:false
    });

    // Setup hide/display password
    $(".fa-eye-slash").on("click", function () {
        $(this).hide();
        $(this).next(".fa-eye").show();
        $(this).prevUntil("input").attr('type', 'text');
    });

    $(".fa-eye").click(function () {
        $(this).hide();
        $(this).prev(".fa-eye-slash").show();
        $(this).prevUntil("input").attr('type', 'password');
    });

    //Setup online/offline section height & scrolling
    const height = $(".selfUser").css('height');
    $(".activeUsers, .inActiveUsers").css('height', height);

    $(".activeUsers").niceScroll({
        cursorcolor: "#007bff",
        cursorwidth: "7px",
        horizrailenabled:false
    });

    $(".inActiveUsers").niceScroll({
        cursorcolor: "#007bff",
        cursorwidth: "7px",
        horizrailenabled:false
    });

    // Customize errContent & sucContent Height
    const hdHeghit = $("header").outerHeight(true);
    const ftHeight = $("footer").outerHeight(true);
    const dlHeight = (hdHeghit + ftHeight);
    $(".errContent, .errContent").css('height', 'calc(100vh - ' +dlHeight+ 'px)');


    // Customize update form
    $(".updateBtn").one('click', function(e) {
        e.preventDefault();
        $(this).addClass('active');
        $(this).parentsUntil("form").siblings().find("input").removeAttr('disabled');
        $(this).attr('value', 'Done');
    });
});