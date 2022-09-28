let newsId = localStorage.getItem("update");


function contentHandler(s){
    
    if(s != null && typeof s == "string"){
        while(s.includes('<p>')){
            s = s.replace("<p>","")
            console.log("da thay doi")
        }
        while(s.includes('</p>')){
            s = s.replace("</p>","\n")
            console.log("da them xuong dong")
        }
    }
    
    return s;
}


/*     base64    */
let imgInp = document.getElementById("image");
let showImg = document.getElementById("showImg");
let dataImg = ''
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}
  
imgInp.onchange = () => {
    console.log(URL.createObjectURL(imgInp.files[0]));
    showImg.src = URL.createObjectURL(imgInp.files[0])
    getBase64(imgInp.files[0]).then(
        data => {
            //console.log(data)
            dataImg = data;
        }
    );
 
}



fetch("https://127.0.0.1:5001/api/Categories")
.then(r => r.json())
.then(json => {
    let lstCate = document.getElementById("list-cate");
    let lstCateStr = json.map((item,index) => {
        return `<option value="${item.id}">${item.name}</option>`
    })
    let strAppend =  `<div class="form-lable">Loại bài báo</div>`
    strAppend += `<select id="cate">`;
    strAppend += lstCateStr.join("\n");
    strAppend += `</select>`;
    lstCate.innerHTML = strAppend;
})
.then(() => {

    let titleInp = document.getElementById("title");
    let descInp = document.getElementById("desc");
    let contentInp = document.getElementById("content");
    let CateInp = document.getElementById("cate");

    fetch(`https://127.0.0.1:5001/api/News/${newsId}`)
    .then(r => r.json())
    .then(res => {
            console.log(CateInp);
            titleInp.value = res.title
            descInp.value = res.description;
            contentInp.value = contentHandler(res.content);
            CateInp.value = res.cateId;
            showImg.src = res.img
    })
})




/*   update news   */
let updateBtn = document.getElementById("sendUpdate")
updateBtn.onclick = () => {
    let dialogContainer =document.getElementById("dialog-container");
    let app = document.getElementById("app");
    dialogContainer.style.display = "block"
    dialogContainer.style.top =  `${window.scrollY}px`;
    console.log(dialogContainer.style.top);
    app.style.overflow = "hidden"
}
let agree = document.getElementById("success")
let cancel = document.getElementById("cancel")
agree.onclick = () => {
    let dialogContainer =document.getElementById("dialog-container");
    dialogContainer.style.display = "none";
    let app = document.getElementById("app");
    app.style.overflow = "auto"
        let titleInp = document.getElementById("title");
        let descInp = document.getElementById("desc");
        let contentInp = document.getElementById("content");
        let CateInp = document.getElementById("cate");
        //let ImgInpt = document.getElementById("image")
        let rst=''
        let ListValueCnt = contentInp.value.split('\n');
        if(titleInp.value == ''){
            let valid = document.getElementById("valid-title");
            valid.innerHTML = "(*) Bạn chưa nhập tiêu đề bài báo"
        }
        if(descInp.value == ''){
            let valid = document.getElementById("valid-desc");
            valid.innerHTML = "(*) Bạn chưa nhập môt tả bài viết"
        }
        if(contentInp.value == ''){
            let valid = document.getElementById('valid-content');
            valid.innerHTML = "(*) Bạn chưa nhập nội dung bài viết"
        }
        
        ListValueCnt.map( (item) => rst  +=  "<p>" + item + "</p>" )
        if(titleInp.value != '' && descInp.value != '' && contentInp.value != '')
        fetch(`https://127.0.0.1:5001/api/News?id=${newsId}`,
        {
            method:"PUT",
           body: JSON.stringify({
                cateId: CateInp.value,
                title: titleInp.value,
                description : descInp.value,
                content: rst,
                img: dataImg
           }),
           headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        }   
        }).then((res) => {
            let status = document.getElementById("valueR");
            if(res.status == 200){
                //window.alert("Bạn đã sửa bài viết thành công")
                status.style.color = "#155724";
                status.style.padding = ".75rem 1.25rem"
                status.style.backgroundColor = "#d4edda";
                status.innerHTML = `Bài báo ${titleInp.value} đã được sửa thành công`;
            }
            else{
               // window.alert("Bạn không sửa được. Kiểm tra lại!")
                status.style.color = "#f8d7da";
                status.style.backgroundColor = "#721c24";
                status.style.padding = ".75rem 1.25rem"
                status.innerHTML =  `Bài báo ${titleInp.value} không được sửa, kiểm tra lại`
            }
        })
}

cancel.onclick = () => {
    let dialogContainer =document.getElementById("dialog-container");
    dialogContainer.style.display = "none";
    let app = document.getElementById("app");
    app.style.overflow = "auto"
}


// updateBtn.onclick = () => {
//     let titleInp = document.getElementById("title");
//     let descInp = document.getElementById("desc");
//     let contentInp = document.getElementById("content");
//     let CateInp = document.getElementById("cate");
//     let ImgInpt = document.getElementById("image")
//     let rst=''
//     let ListValueCnt = contentInp.value.split('\n');
//     ListValueCnt.map( (item) => rst  +=  "<p>" + item + "</p>" )
//     fetch(`https://127.0.0.1:5001/api/News?id=${newsId}`,
//     {
//         method:"PUT",
//        body: JSON.stringify({
//             cateId: CateInp.value,
//             title: titleInp.value,
//             description : descInp.value,
//             content: rst,
//             img: dataImg
//        }),
//        headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//         'Accept': 'application/json'
//     }   
//     }).then((res) => {
//         if(res.status == 200){
//             window.alert("Bạn đã sửa bài viết thành công")
//         }
//         else{
//             window.alert("Bạn không sửa được. Kiểm tra lại!")
//         }
//     })

// }
