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
    

    //console.log(e);
}




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
                    <button id="${item.id}" class="btn btn-warning">Edit</button>
                </div> 
            </li>
            
            `

        })

        resultStr += listNewsArr.join('\n');
        responsiveTable.innerHTML = resultStr;
        contentLayout.appendChild(responsiveTable);
} )




let sendAdd = document.getElementById("sendAdd");

sendAdd.onclick = () => {
    let titleInp = document.getElementById("title");
    let descInp = document.getElementById("desc");
    let contentInp = document.getElementById("content");
    let imgInp = document.getElementById("img");
    let newsObj = {
        title: titleInp.vavlue,
        description : descInp.value,
        content: contentInp.value,
        img: imgInp.value
    }
    console.log(newsObj);
}