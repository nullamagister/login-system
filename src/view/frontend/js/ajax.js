const domParser = new DOMParser();

$("#delete").click(function(e) {
    e.preventDefault();
    $.ajax({
        url: $(this).attr('formaction'),
        type: "DELETE",
        success: (res) => {
            if (res.redirect) {
                window.location.replace(res.redirect)
            } else {
                const document   = domParser.parseFromString(res, 'text/html');
                const head       = document.getElementsByTagName('head')[0];
                const errContent = document.getElementById("errContent");
                
                $('head').replaceWith(head);
                $('#content').replaceWith(errContent);
                $('#errContent').css('height', 'calc(100vh - 209px)');
            }
        }
    });
});

$(".updateBtn").click(function(e) {
    if(!$(this).hasClass("active")){
        return
    }

    e.preventDefault();
    const inputs = $("#selfuser").find("input:not(input[type='submit'])")
    const newUser = {
        first_name: inputs[0].value,
        last_name:  inputs[1].value,
        gender: inputs[2].checked ? inputs[2].value: inputs[3].value,
        date_of_birth = inputs[4].value,
        secret: {
            username: inputs[5].value,
            password: inputs[6].value,
            email:    inputs[7].value
        }
    }

    $.ajax({
        url: $(this).attr('formaction'),
        data: {newUser: JSON.stringify(newUser)},
        type: "PUT",
        success: (res) => {
            if (res.redirect) {
                window.location.replace(res.redirect)
            } else {
                const document   = domParser.parseFromString(res, 'text/html');
                const head       = document.getElementsByTagName('head')[0];
                const errContent = document.getElementById("errContent");
                
                $('head').replaceWith(head);
                $('#content').replaceWith(errContent);
                $('#errContent').css('height', 'calc(100vh - 209px)');
            }
        }
    })
});