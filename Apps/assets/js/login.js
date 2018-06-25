(function () {
    var email = $('#email');
    var password = $('#pass');
    //Validating email using simple regex
    function ValidateEmail(mail) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (mail === "") {
            return true;
        }
        if (re.test(mail)) {
            console.log('Email hop le!')
            return (true)
        }
        console.log("Email không hợp lệ!");
        return (false)
    }
    //Time interval for auto validating 
    var typingTimer; //timer identifier
    var doneTypingInterval = 2000; //time in ms, 3 second for example
    //FOR EMAIL
    //on keyup, start the countdown
    email.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(emailDoneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    email.on('keydown', function () {
        clearTimeout(typingTimer);
        email.removeClass('error').removeClass('success');
    });
    //user is "finished typing," do something
    function emailDoneTyping() {
        if(!ValidateEmail(email.val())){ //Email ko hop le
            email.addClass('error');
        }
        else{
            email.removeClass('error'); //if exist
            email.addClass('success');
        }
    }

    //
    $('#loginBtn').on('click', function () {
        //Do something
    });
})();