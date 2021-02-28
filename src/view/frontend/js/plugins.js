$(function() {  
    // Setup niceScroll
    $("body").niceScroll({
        cursorcolor: "#007bff",
        cursorwidth: "10px",
        horizrailenabled:false
    });

    // Setup hide/display password
    $(".fa-eye-slash").on("click", function (e) {
        const element = e.target
        $(this).hide();
        $(this).next(".fa-eye").show();
        $(element).prev("input").attr('type', 'text');
    });

    $(".fa-eye").click(function (e) {
        const element = e.target
        $(this).hide();
        $(this).prev(".fa-eye-slash").show();
        $(element).prev(".fa-eye-slash").prev("input").attr('type', 'password');
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
    $(".errContent, .sucContent").css('height', 'calc(100vh - ' +dlHeight+ 'px)');    

    // Customize update form
    $(".updateBtn").one('click', function(e) {
        e.preventDefault();
        $(this).addClass('active');
        $(this).parentsUntil("form").siblings().find("input").removeAttr('disabled');
        $(this).attr('value', 'Done');
    });
});