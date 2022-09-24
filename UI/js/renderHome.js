if (document.title == "Home") {

    



    let headCnt = document.getElementsByClassName("big-cnt-pe")[0];
    let colRight = document.getElementsByClassName("col-right")[0];
    let listCnt = document.getElementsByClassName("manage-cate")[0];
    let mainBigCnt = ""
    let idMainBigCnt = 0;
    fetch("https://127.0.0.1:5001/api/News/test")
        .then((res) => res.json())
        .then((resjson) => {
            let arrBightml = resjson.hotnews.map((item, index) => {
                if (index == 0) {
                    idMainBigCnt = item.id
                    mainBigCnt = `
                                    

                                        <div class="img-hover-zoom">
                                            <a href="#"  value="./newsDetail">
                                                <img src="${item.img}"
                                                    alt="">
                                            </a>
                                        </div>
                                        <a href="#" value="./posts/phi-cong-anh-16-tuoi-bay-mot-minh-den-vn.html" class="text-hover">${item.title}</a>
                                        <div class="post-footer">
                                            
                                            <span>${item.createAt}</span>
                                            
                                        </div>
                                    
                                `
                }
                else{
                    return ( `

                                    <div class="small-cnt-pe" id="${item.id}" onclick="newsDetail(event)">
                                        <div class="img-hover-zoom"><img src="${item.img}" alt=""></div>
                                            <div class="small-cnt-pe-right">
                                                <a href="" class="text-hover">${item.title}</a>
                                                    <div class="post-footer">
                                                        <a href="#"><img class="img-news " src="./Images/bao-giao-du-thoi-dai.png" alt=""></a>
                                                        <span>${item.createAt}</span>
                                                        <i class="fa-thin fa-clock"></i>
                                                    </div>
                                            </div>
                                    </div>

                            ` ) 
                }
            });
            headCnt.innerHTML = mainBigCnt ;
            headCnt.id = idMainBigCnt
            headCnt.onclick = newsDetail
            colRight.innerHTML =  arrBightml.join("\n");
             
            
            // cac bai bao phia duoi
            let categoryCnt = resjson.dataCate.map( (item, index) => {
                let headerCroup = `
                                            <div class="header-cate">
                                                <p class="article-group-title">
                                                    <a href="#"> ${item.category}</a>
                                                </p>
                                            </div>
                                `
                let cateDetail = item.data.map( (item,index) => {
                        return (
                            `
                                        <div class="bottom-other" id="${item.id}" onclick="newsDetail(event)">
                                            <div class="bt-o-img img-hover-zoom">
                                                <a href="#"><img src="${item.img}" alt=""></a>
                                            </div>
                                            <div class="bt-o-right">
                                                <a href="#" class="text-hover">${item.title}</a>
                                                <div class="post-footer">
                                                    <span>${item.createAt}</span>
                                                </div>
                                            </div>
                                        </div>
                            `

                        )

                            
                }).join("\n");
                
                return headerCroup + "<section class=\"list-news-cate\">"+cateDetail+'</section>';

            });


            listCnt.innerHTML = categoryCnt.join("\n");
        })
}