$("#delete").click(function(e) {
    e.preventDefault();
    $.ajax({
        url: $(this).attr('formaction'),
        type: "DELETE",
        success: (json) => window.location.replace(json.redirect),
        error:   (res) =>  $("body").html(res.match('/<body>(.*)<\/body>/')[1])
    });
});

$(".updateBtn").click(function(e) {
    if(!$(this).hasClass("active")){
        return
    }

    console.log("HERE AJAX")
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
        success: (json) => window.location.replace(json.redirect),
        error:   (res) =>  $("body").html(res.match('/<body>(.*)<\/body>/')[1])
    })
});