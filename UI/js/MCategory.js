const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const addEditBtn = $('#add_edit');
let _categories = $('#categories')
let edit = $('.btn-edit')
let dIp = $('#data-input')
let btnAdd = $('#btn-add')
let btnLogin = $('#btn-login')
let btns = $$('.page-item')
let pagination = $('.pagination');

let currentPage = 0;

const OGet = {
    method: 'GET',

    credentials: 'include',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-headers': "*",
        'Accept': 'application/json',
        'origin': "*",
    }
}

let OPost = {
    method: 'POST',

    credentials: 'include',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-headers': "*",
        'Accept': 'application/json',
        'origin': "*",
    }
}
let OPut = {
    method: 'PUT',

    credentials: 'include',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-headers': "*",
        'Accept': 'application/json',
        'origin': "*",
    }
}


const handleEvent = {
    DelC: (event, id) => {
            event.preventDefault()  
            let dialogContainer =$("#dialog-container");
            dialogContainer.style.display = "block"
            dialogContainer.style.top =  `${window.scrollY}px`;
            let app = document.getElementById("app");
            app.style.overflow = 'hidden';
            let btnCan = $('#cancel');
            btnCan.onclick = () =>{
                dialogContainer.style.display = "none"; 
                let app = document.getElementById("app");
                app.style.overflow = 'auto';
            }
            let btnSuccess = $('#success');
            btnSuccess.onclick = () => {fetch(`http://127.0.0.1:8080/api/category/del/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',

                    'access-control-allow-headers': "*",
                    'Accept': 'application/json',
                    'origin': "*", 
                }
            }).then(res => res.json())
            .then(res => {
                
                dialogContainer.style.display = "none"
                let app = document.getElementById("app");
                app.style.overflow = 'auto';
                app.render(currentPage)
            })}
             
        }

        ,
    AddC: (e) => {
        if(dIp.value==''){
            handleEvent.toast({title:'Warning!',message:'Không được để trống!',type:'warning' });

        }else{
            fetch(`http://127.0.0.1:8080/api/category/add`, {
                method: 'POST',
                body: JSON.stringify({
                    name: dIp.value
                }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'access-control-allow-headers': "*",
                    'Accept': 'application/json',
                    'origin': "*",
                    'cookie': 'username'
                }
            }).then(res => res.json())
            .then(res => {
                handleEvent.toast({title:'Success!',message:res.data.name,type:'success'});
                dIp.value = ''
                dIp.focus()
                app.render(currentPage)
            })
            .catch(err => {
                handleEvent.toast({title:'Error!',message:res.data.message,type:'err'});
            })
        }
    },

    clickEdit: async (e, id, index) => {
        e.preventDefault();
        const res = await fetch(`http://127.0.0.1:8080/api/category/${id}`, OGet)

        let data = await res.json()
        data = data.data
        const eleEdit = `<div class="col col-1" data-label="STT">${index+1}</div>
                        <input ondblClick="handleEvent.dbClickInput" id='I${id}' class="col col-2 input-c" data-label="Name" value='${data.name}' required /> 
                        <div class="col col-3" >
                        <button class="btn btn-outline-success" onclick="handleEvent.handleUpdate(event,${id},${index})">Update</button>
                        </div>`
        const eleLiT = $(`#C${id}`);
        eleLiT.innerHTML = eleEdit
        $(`#I${id}`).focus()
    },

    handleUpdate: async (event, id, index) => {
        const IU =  $(`#I${id}`);
       
        if(IU.value == ''){
            handleEvent.toast({title:'Warning!',message:'Không được để trống!',type:'warning' });
        }else{
            OPut.body = JSON.stringify({
                id: id,
                name: $(`#I${id}`).value
            })
            const response = await fetch(`http://127.0.0.1:8080/api/category/edit`, OPut);

        let res = await response.json();
        app.render()
        }
        
    },

    selectPage: (page) => {
        return app.render(page);
    },

    toast: ({
        title = '',
        message = '',
        type = 'info',
        duration = 3000

    }) => {
        const main = $('#toast')
        if (main) {
            const toast = document.createElement('div')
            toast.classList.add('toast', `toast-${type}`);
            const autoRemoveId = setTimeout(function () {
                main.removeChild(toast)
            }, duration + 1000)
            toast.onclick = function (e) {
                if (e.target.closest('.toast_close')) {
                    main.removeChild(toast)
                    clearTimeout(autoRemoveId)
                }
            }
            toast.innerHTML = ` 
                <div class="toast_message">
                    <h3 class="toast_title">${title}</h3>
                    <p class="toast_msg">${message}</p>
                </div>
                <div class="toast_close">x</div>
            `

            main.appendChild(toast)

        }
    }


}

 

const app = {
    render: (page = 1) => {
        let url = page == 1 ? `http://127.0.0.1:8080/api/category/?size=5` : `http://127.0.0.1:8080/api/category/?page=${page}&size=5`
        fetch(url, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'access-control-allow-headers': "*",
                    'Accept': 'application/json',
                    'origin': "*",
                }
            })
            .then(res => res.json())
            .then(res => {
                let categories = '';
                currentPage = res.currentPage;
                categories = res.data.map((item, index) => (
                    `<li class="table-row" id='C${item.id}' >
            <div class="col col-1" data-label="STT">${index+1}</div>
            <div ondblClick="handleEvent.dbClickInput"  class="col col-2" data-label="Name">${item.name}</div> 
            <div class="col col-3" >
                <button class="btn btn-danger" onclick="handleEvent.DelC(event,${item.id})">Delete</button>
                <button class="btn btn-warning btn-edit" onclick="handleEvent.clickEdit(event,${item.id},${index})" >Edit</button>
            </div> 
        </li>`
                )).join('');

                _categories.innerHTML = categories;

                pagination.innerHTML = `
                        ${res.currentPage == '1'?(''):(`
                        <li onclick="handleEvent.selectPage(${res.currentPage-1})" class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                        `)}
                        ${
                            (function(){
                                 let lLi = '';
                                 
                                for(let i = res.currentPage - 2 <= 0? 1 : res.currentPage-2;i<3+res.currentPage && i<=res.totalPages;i++){
                                     
                                     lLi+= `
                                        <li onclick="handleEvent.selectPage(${i})" class="page-item ${i==res.currentPage?'active':''} "><a class="page-link " href="#">${i}</a></li>
                                        `
                                    
                                }
                                return lLi
                            })()
                        }
                        ${res.currentPage == res.totalPages ?(''):(`
                            <li onclick="handleEvent.selectPage(${res.currentPage+1})" class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        `)}
                        `


            })


    },

    start: () => {
        app.render();
    }
}
app.start()


/*
${res.currentPage == '1'?(''):(`
                        <li class="page-item active">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                        `)}
                        <li class="page-item"><a class="page-link" href="#">${res.currentPage}</a></li>
                        ${(function(){
                            if(res.currentPage != res.totalPages){
                                for (let i = 0; i < 2   || res.currentPage==res.totalPages; i++) {
                                    return(`
                                    <li class="page-item"><a class="page-link" href="#">${res.currentPage+i+1}</a></li>
                                    `)
                               }
                            }else return ''
                            
                        })()}
                        ${res.currentPage == res.totalPages ?(''):(`
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        `)}
*/