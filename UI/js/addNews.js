/*load list category*/
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


/*add news*/
let sendAdd = document.getElementById("sendAdd");

//dich anh thanh base64
let imgInp = document.getElementById("image");
let showImg = document.getElementById("showImg")
let dataImg = '';
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

sendAdd.onclick = () => {
    let titleInp = document.getElementById("title");
    let descInp = document.getElementById("desc");
    let contentInp = document.getElementById("content");
    let CateInp = document.getElementById("cate");
    let status = document.getElementById("status")
    let ListValueCnt = contentInp.value.split('\n');
    let rst=''
    ListValueCnt.map( (item) => rst  +=  "<p>" + item + "</p>" )
    let newsObj = {
        cateId: CateInp.value,
        title: titleInp.value,
        description : descInp.value,
        content: rst,
        img: dataImg
    }
    console.log(newsObj)
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
    if(dataImg == ''){
        let valid = document.getElementById('valid-img');
        valid.innerHTML = "(*) Bạn chưa nhập hình ảnh bài viết"
    }
    if(titleInp.value != '' && descInp.value != '' && contentInp.value != '' && dataImg != '')
    fetch('https://127.0.0.1:5001/api/News', {
                method: "POST",
                body: JSON.stringify(newsObj),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                }
            }).then(res => {
                if(res.status < 300){
                    status.style.color = "#155724";
                    status.style.padding = ".75rem 1.25rem"
                    status.style.backgroundColor = "#d4edda";
                    status.innerHTML = `Bài báo ${titleInp.value} đã được thêm thành công`;
                }
                else{
                    status.style.color = "#f8d7da";
                    status.style.backgroundColor = "#721c24";
                    status.style.padding = ".75rem 1.25rem"
                    status.innerHTML =  `Bài báo ${titleInp.value} không được thêm, kiểm tra lại`
                }
               return res.json()
            })
                .then(res => console.log(res.data))
    //console.log(newsObj);
    //console.log(FileList);
}