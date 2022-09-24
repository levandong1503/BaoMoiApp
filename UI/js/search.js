let searchValue = localStorage.getItem("search");
let arrFetch = []
let cnt = document.getElementsByClassName("content-layout");
    fetch(`https://127.0.0.1:5001/api/News/search?title=${searchValue}`)
        .then(res => res.json())
        .then(resjson => { arrFetch = resjson; console.log(resjson); })
        .then(() => {
            
               if(arrFetch.length > 0)
                {
                    cnt[0].innerHTML = arrFetch.map((item) => {
                        return (
                            `
                                    <div class="post-article">
                                        <div class="col-infor-contrainer">
                                            <a class="img-hover-zoom" href="#"><img class="img-col-title-infor img-radius"
                                                    src="https://photo-baomoi.bmcdn.me/w300_r3x2_sm/2022_07_20_146_43220917/c9967eaaa0e849b610f9.jpg"
                                                    alt=""></a>
                                        </div>
                                        <div class="post-title">
                                            <a href="#" class="anchor-post-p anchor-post-p-left">${item.title}</a>
                                            <div class="post-footer">
                                                <a href="#"><img class="img-news" src="./Images/logo-chinh-phu.png" alt=""> Chính
                                                    phủ</a>
                                                <span>2 giờ</span>
                                                <span>315 liên quan</span>
                                                <i class="fa-thin fa-clock"></i>
                                            </div>
                                        </div>
                                    </div>
                                `
                        )
                    }).join('\n');
                }
                else{
                    cnt[0].innerHTML = `<h1 style="color:#913b3b; background-color:#6f5b1d61; margin:20px">
                    Bài viết bạn tìm kiếm không tồn tại
                    </h1>`
                }
            

            localStorage.setItem('search','')
            console.log(localStorage.getItem('search'));
        })