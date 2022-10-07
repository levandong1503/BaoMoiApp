var nav = document.getElementById("dropdown");
var dropLayout = document.querySelector(".nav-supper");
var isBodyHidden = false;
var isDropNav = false;

nav.addEventListener('click', function () {
    var cls = dropLayout.getAttribute("class");
    var index = cls.indexOf("dropsupport");

    if (index == -1) { /*ẩn đi*/
        dropLayout.setAttribute("class", cls + " dropsupport");
        isDropNav = false;
    }
    else { /*hiện lên*/
        dropLayout.setAttribute("class", cls.replace(" dropsupport", ""))
        isDropNav = true;

    }

    if (window.innerWidth < 970 && !isBodyHidden) {
        var body = document.getElementById("app");
        body.setAttribute("style", "overflow:hidden");
        isBodyHidden = true;

    } else if (isBodyHidden) {
        var body = document.getElementById("app");
        body.setAttribute("style", "  ")
        isBodyHidden = false;

    }

})

window.onresize = function () {

    if (isDropNav && window.innerWidth < 970) {
        var body = document.getElementById("app");
        body.setAttribute("style", "overflow:hidden");
        isBodyHidden = true;
        //console.log("is body hidden: "+ isBodyHidden);
    }
    if (window.innerWidth >= 970) {
        let dialog = document.getElementById("dialog-container");
        if(dialog != null){
            if(dialog.style.display == "block"){
                var body = document.getElementById("app");
                body.setAttribute("style", "overflow:hidden");
                isBodyHidden = true;
                console.log("ban dang su dung dialog");
            }
            else{
                var body = document.getElementById("app");
                body.setAttribute("style", "  ")
                isBodyHidden = false;
                console.log("ban dang tat su dung dialog");
            }
        }
        else{
            var body = document.getElementById("app");
            body.setAttribute("style", "  ")
            isBodyHidden = false;
            console.log("trang khong su dung dialog");
        }
    }
}

var DropCloseBtn = document.getElementsByClassName("btn-close-drop");
DropCloseBtn[0].onclick = function () {
    if (isDropNav) {
        var cls = dropLayout.getAttribute("class");
        dropLayout.setAttribute("class", cls + " dropsupport");
        isDropNav = false;
        if (isBodyHidden) {
            var body = document.getElementById("app");
            body.setAttribute("style", "  ");
            isBodyHidden = false;
        }
    }
}


// fix nav
let elNav = document.querySelector('.nav-container');
let layout_drop = document.querySelector('.nav-supper');

function fixNav() {
    let clsLayout = layout_drop.getAttribute("class");

    if (window.scrollY > elNav.offsetTop) {
        elNav.setAttribute("class", "nav-container fix");

        if (window.innerWidth > 970) {

        }

    } else {
        elNav.setAttribute('class', 'nav-container');


    }

}


window.addEventListener('scroll', fixNav)



/*show account and option when login*/
if(document.cookie != ''){
    let login = document.getElementById("login");
    login.innerHTML = 
        `<button href="manage">${document.cookie.split("=")[1]} </button>` + 
        `
            <div class="dropdown-menu">
                <a href="#" class="dropdown-item logout">Đăng xuất</a>
                <a href="./NewsManage.html" class="dropdown-item">Quản lí bài viết</a>
                <a href="./CategoryManage.html" class="dropdown-item">Quản lí loại báo</a>
            </div>
        `
    let btnShow = document.querySelector("#login button")
    btnShow.onclick = () => {
        let drowdownMenu = document.getElementsByClassName("dropdown-menu")[0]
        if(drowdownMenu.style.display == ''){
            drowdownMenu.style.display = "block"
        }
        else{
            drowdownMenu.style.display = ""
        }
        console.log(drowdownMenu.style.display);
    }
    
}


/*logout*/
let logout = document.getElementsByClassName("logout")[0];
 
if(logout !=null && document.cookie != ''){
    logout.onclick = () => {
        document.cookie = "username" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location = "./index.html"
        console.log("dang xuat thanh cong")
    }
}








/*  search  */

let linkSearch = document.getElementById("search-icon");
const ESearch = (e) => {
    
    
    if (e.keyCode == 13) {
        let seacrchInp = document.getElementById('search').value;
        localStorage.setItem("search",seacrchInp) 
        window.location = './search.html'
        
    }
} 

linkSearch.onclick = () => {
    let seacrchInp = document.getElementById('search').value;
    localStorage.setItem("search",seacrchInp) 
    window.location = './search.html'
    //result[0].innerHTML = ""
}



/*link to news detail*/
function newsDetail(e,t) {
    //console.log(e.srcElement);
    //let element = document.createElement('div');
    e.path.map((item) => {
        if(item.onclick != null){
            localStorage.setItem("newsDetail",item.id);
            window.location = "./newsDetail.html"
            //console.log(item)
        }
    })


    
}













// search action
// let seacrchInp = document.getElementById("search");
// let result = document.getElementsByClassName("search-result");
// let arrFetch = [];
// seacrchInp.onkeyup = () => {
//     console.log(seacrchInp.value);
// //      

//     fetch(`https://127.0.0.1:5001/api/News/search?title=${seacrchInp.value}`)
//     .then(res => res.json())
//     .then(resjson => {  arrFetch = resjson; console.log(resjson);})
//     .then(() => {

//         console.log("prepare render to UI",arrFetch);
//         //result[0].innerHTML = arrFetch.map(item => `<li>${item.title}</li>`).join(' ')
//     })

// }

// show search result action


// load home action





/*
if(document.title == "Home"){

    if(document.cookie != ''){
        let login = document.getElementById("login");
        login.innerHTML = document.cookie
    }

    fetch("https://127.0.0.1:5001/api/News/test")
    .then((res) => res.json())
    .then( ( resjson)  =>{
        
        let contentLeft = document.getElementsByClassName("content-left")[0];
        let contentRight = document.getElementsByClassName("content-right")[0];
        let contentArticle = document.getElementsByClassName("content-article")[0];
        let mainContent = "";
        let arrJson = resjson.hotnews.map( (item,index) => {
            if(index == 0){
                 mainContent =  `
                            <div class="main-content">
                                <div class="img-main-big img-hover-zoom">
                                    <a href="./posts/news-sau-9-ngay-van-chua-tim-thay-dau-vet-tau-ca.html"><img class="img-radius"
                                            src="${item.img}"></a>
                                </div>
                                <a href="./posts/news-sau-9-ngay-van-chua-tim-thay-dau-vet-tau-ca.html">${item.title}</a>
                                <div class="post-footer">
                                    <a href="#"><img class="img-news" src="./Images/bao-tin-tuc.png" alt=""></a>
                                    <span>1 giờ</span>
                                    <span>8 liên quan</span>
                                    <i class="fa-thin fa-clock"></i>
                                </div>
                            </div>
                            `
                    



            }

            else{
                return ( `

                                <div class="post-article">
                                <div class="col-infor-contrainer">
                                    <a class="img-hover-zoom" href="#"><img class="img-col-title-infor img-radius"
                                            src="${item.img}" alt=""></a>
                                </div>
                                <div class="post-title">
                                    <a href="#" class="anchor-post-p anchor-post-p-left">${item.title}</a>
                                    <div class="post-footer">
                                        <a href="#"><img class="img-news" src="./Images/bao-to-quoc.png" alt=""></a>
                                        <span>1 giờ</span>
                                        <span>2 liên quan</span>
                                        <i class="fa-thin fa-clock"></i>
                                    </div>
                                </div>
                            </div>

                ` ) 
            }
        });
 
        //mainContent.innerHTML = mainContentRight.join('');
        contentRight.innerHTML = arrJson.join('');

        let categoryCnt = resjson.dataCate.map( (item, index) => {
                let headerCroup = `
                                    <p class="article-group-title">
                                        <a href="#"> ${item.category}</a>
                                    </p>
                                `
                let cateDetail = item.data.map( (item,index) => {
                        return (
                            `
                            <div class="post-article">
                                <div class="col-infor-contrainer">
                                    <a class="img-hover-zoom" href="#"><img class="img-col-title-infor img-radius"
                                            src="${item.img}" alt=""></a>
                                </div>
                                <div class="post-title">
                                    <a href="#" class="anchor-post-p anchor-post-p-left">${item.title}</a>
                                    <div class="post-footer">
                                        <a href="#"><img class="img-news" src="./Images/bao-to-quoc.png" alt=""></a>
                                        <span>1 giờ</span>
                                        <span>2 liên quan</span>
                                        <i class="fa-thin fa-clock"></i>
                                    </div>
                                </div>
                            </div>
                            `

                        )

                
                }).join("\n");

                return headerCroup+cateDetail;

        })
        contentLeft.innerHTML = mainContent;
        contentArticle.innerHTML = categoryCnt.join("\n");

    }) 


}
*/