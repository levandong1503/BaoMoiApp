let contentLayout = document.getElementsByClassName("content-layout")[0];
let responsiveTable = document.createElement('ul');
responsiveTable.className = 'responsive-table';
let resultStr = `
        <li class="table-header">
            <div class="col col-1">STT</div>
            <div class="col col-2">Name</div>  
            <div class="col col-3"> </div>  
        </li>

`

/*delete*/
function deleteHandler(e)  {

    let isDel = window.confirm("Bạn có chắc muốn xóa bài viết")
    if(isDel){
        e.path.map((item) => {
            if(item.onclick != null){
                //localStorage.setItem("newsDetail",item.id);
                //window.location = "./newsDetail.html"
                //console.log(item)
                fetch(`https://127.0.0.1:5001/api/News/${item.id}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Access-Control-Allow-Origin': '*',
                        'Accept': 'application/json',
                        'origin': "*"
                    }
                })
                .then(res => {
                    if(res.status == 200){
                            alert("Đã xóa thành công bài viết");
                            window.location = "./NewsManage.html"
                    }
                    else{
                        alert("Có lỗi xảy ra vui lòng kiểm tra lại")
                    }
                })
            }
        })
    }
    

    
}

/**  update  **/
function updateHandler(e){
    localStorage.setItem("update",e.target.id);
    window.location = "/updateNews.html"
}

/*add list news update and delete*/
fetch("https://127.0.0.1:5001/api/News")
.then(j => j.json())
.then( response => {

        let listNewsArr = response.map( (item,index) => {

            return `
            <li class="table-row">
                <div class="col col-1" data-label="STT">${index+1}</div>
                <div class="col col-2" data-label="Name">${item.title}</div> 
                <div class="col col-3" >
                    <button id="${item.id}" class="btn btn-danger" onclick="deleteHandler(event)">Delete</button>
                    <button id="${item.id}" class="btn btn-warning" onclick="updateHandler(event)" >Edit</button>
                </div> 
            </li>
            
            `

        })

        resultStr += listNewsArr.join('\n');
        responsiveTable.innerHTML = resultStr;
        contentLayout.appendChild(responsiveTable);
} )




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

    fetch('https://127.0.0.1:5001/api/News', {
                method: "POST",
                body: JSON.stringify(newsObj),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                }
            }).then(res => res.json())
                .then(res => console.log(res.data))
    //console.log(newsObj);
    //console.log(FileList);
}