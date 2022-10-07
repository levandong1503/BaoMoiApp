 
 
/*block not permision*/
if(document.cookie == ''){
    window.location = "./index.html"
}

let contentLayout = document.getElementsByClassName("content-layout")[0];
let responsiveTable = document.createElement('ul');
let pagination = document.getElementsByClassName('pagination')[0]
responsiveTable.className = 'responsive-table';

/*delete*/
let idDelete = '';                                                              // lưu id bài báo
function deleteHandler(e)  {
    
        e.path.map(item => {                                                    // lấy id
            if(item.onclick != null){
                idDelete = item.id;
            }
        })
    
    let dialogContainer =document.getElementById("dialog-container");              // mở dialog
    let app = document.getElementById("app");
    dialogContainer.style.display = "block"
    dialogContainer.style.top =  `${window.scrollY}px`;
    console.log(dialogContainer.style.top);
    app.style.overflow = "hidden"

    
}
//let del = document.getElementById("delete");
let agree = document.getElementById("success")
let cancel = document.getElementById("cancel")

agree.onclick = () => {                                                            // đồng ý
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
let renderPage = (page = 1) => {
    let url = page == 1 ? `https://127.0.0.1:5001/api/News?page=1&size=10` : `https://127.0.0.1:5001/api/News?page=${page}&size=10`
    fetch(url)
        .then(res => res.json())
        .then(
            response => {
                let resultStr = `
                <li class="table-header">
                    <div class="col col-1">STT</div>
                    <div class="col col-2">Tên bài viết</div>  
                    <div class="col col-3">Thao tác</div>  
                </li>
                `
                let listNewsArr = response.data.map( (item,index) => {

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
            //contentLayout.innerHTML = ''
            contentLayout.appendChild(responsiveTable);
            console.log("logInfor");
            pagination.innerHTML = `
                    ${page == 1?(''):(`
                    <li onclick="renderPage(${page-1})" class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                    `)}
                    ${
                        (function(){
                            let lLi = '';
                            if(response.totalPage <= 5){
                                for(let i = 1; i<=response.totalPage ; i++ ){
                                    lLi+= `
                                       <li onclick="renderPage(${i})" class="page-item ${i==response.currentPage?'active':''} "><a class="page-link " href="#">${i}</a></li>
                                       `
                                }
                            }
                            if(response.totalPage >5){
                                for(let i = response.currentPage - 2 <= 0? 1 : response.currentPage-2 ; i<3+response.currentPage && i<=response.totalPages ; i++){
                                 
                                    lLi+= `
                                       <li onclick="renderPage(${i})" class="page-item ${i==response.currentPage?'active':''} "><a class="page-link " href="#">${i}</a></li>
                                       `
                                   
                               }
                            }
                            
                            return lLi
                        })()
                    }
                    ${page == response.totalPage ?(''):(`
                        <li onclick="renderPage(${response.currentPage+1})" class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    `)}
                    `


        })


}

 
             

// fetch("https://127.0.0.1:5001/api/News?page=2&size=10")
// .then(j => j.json())
// .then( response => {

//         let listNewsArr = response.data.map( (item,index) => {

//             return `
//             <li class="table-row">
//                 <div class="col col-1" data-label="STT">${index+1}</div>
//                 <div class="col col-2" data-label="Name">${item.title}</div> 
//                 <div class="col col-3" >
//                     <button id="${item.id}" class="btn btn-danger" onclick="deleteHandler(event)">Delete</button>
//                     <button id="${item.id}" class="btn btn-warning" onclick="updateHandler(event)" >Edit</button>
//                 </div> 
//             </li>
            
//             `

//         })

//         resultStr += listNewsArr.join('\n');
//         //responsiveTable.innerHTML = resultStr;
//         //contentLayout.appendChild(responsiveTable);
// } )
renderPage(); 





