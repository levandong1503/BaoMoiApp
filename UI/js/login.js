let inpUser = document.getElementById("username-login");
let passUser = document.getElementById("password-login");
let btnLogin = document.getElementById("btn-login");
let validLogin = document.getElementById("valid-login");
 
btnLogin.onclick = () => { 

    if (inpUser.value == "" || passUser.value == "") validLogin.innerHTML = "Bạn chưa nhập tài khoản hoặc mật khẩu";
    else{

        fetch("https://127.0.0.1:5001/api/Accounts/login", {
            method: "POST",
            body: JSON.stringify({
                username: inpUser.value,
                password: passUser.value
            }),
            credentials: 'include',
            headers: {
                
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'origin': "*"
            }
        })
            .then(res => {
                if (res.status != 200) {
                    validLogin.innerHTML = "tài khoản hoặc mật khẩu không chính xác"
                     
                }
                else {
                     window.location = "/index.html"
                    ;
                } 
            })
             
    }
    console.log("login")
}