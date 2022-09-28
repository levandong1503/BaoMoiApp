let contentLayout = document.getElementsByClassName("content-layout")[0];
let responsiveTable = document.createElement('ul');
responsiveTable.className = 'responsive-table';
let resultStr = `
        <li class="table-header">
            <div class="col col-1">STT</div>
            <div class="col col-2">Tên bài viết</div>  
            <div class="col col-3">Thao tác</div>  
        </li>

`
/*delete*/
let idDelete = '';
function deleteHandler(e)  {
    // let isDel = window.confirm("Bạn có chắc muốn xóa bài viết")
    // if(isDel){
    //     e.path.map((item) => {
    //         if(item.onclick != null){
    //             //localStorage.setItem("newsDetail",item.id);
    //             //window.location = "./newsDetail.html"
    //             //console.log(item)
    //             fetch(`https://127.0.0.1:5001/api/News/${item.id}`,{
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Content-Type': 'application/json; charset=utf-8',
    //                     'Access-Control-Allow-Origin': '*',
    //                     'Accept': 'application/json',
    //                     'origin': "*"
    //                 }
    //             })
    //             .then(res => {
    //                 if(res.status == 200){
    //                         //alert("Đã xóa thành công bài viết");
    //                         let removeElement = document.getElementById(item.id)
    //                         removeElement.parentElement.parentElement.style.display = "none";
    //                         removeElement.parentElement.parentElement.className = ""
    //                 }
    //                 else{
    //                     alert("Có lỗi xảy ra vui lòng kiểm tra lại")
    //                 }
    //             })
    //         }
    //     })
    //}
        e.path.map(item => {
            if(item.onclick != null){
                idDelete = item.id;
            }
        })
    
    let dialogContainer =document.getElementById("dialog-container");
    let app = document.getElementById("app");
    dialogContainer.style.display = "block"
    dialogContainer.style.top =  `${window.scrollY}px`;
    console.log(dialogContainer.style.top);
    app.style.overflow = "hidden"

    
}
//let del = document.getElementById("delete");
let agree = document.getElementById("success")
let cancel = document.getElementById("cancel")

agree.onclick = () => {
        fetch(`https://127.0.0.1:5001/api/News/${idDelete}`,{
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
                //alert("Đã xóa thành công bài viết");
                let removeElement = document.getElementById(idDelete)
                removeElement.parentElement.parentElement.remove()
        }
        else{
            alert("Có lỗi xảy ra vui lòng kiểm tra lại")
        }
    })
            
    let dialogContainer =document.getElementById("dialog-container");
    dialogContainer.style.display = "none";
    let app = document.getElementById("app");
    app.style.overflow = "auto"
}

cancel.onclick = () => {
    let dialogContainer =document.getElementById("dialog-container");
    dialogContainer.style.display = "none";
    let app = document.getElementById("app");
    app.style.overflow = "auto"
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








