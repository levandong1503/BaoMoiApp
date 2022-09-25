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
    let titleInp = document.getElementById("title");
    let descInp = document.getElementById("desc");
    let contentInp = document.getElementById("content");
    let CateInp = document.getElementById("cate");
    let ImgInpt = document.getElementById("image")
    fetch(`https://127.0.0.1:5001/api/News?id=${newsId}`,
    {
        method:"PUT",
       body: JSON.stringify({
            cateId: CateInp.value,
            title: titleInp.value,
            description : descInp.value,
            content: "rst",
            img: dataImg
       }),
       headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
    }   
    })

}
