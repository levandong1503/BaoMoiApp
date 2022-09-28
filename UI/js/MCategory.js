const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const addEditBtn = $('#add_edit');
let _categories = $('#categories')
let edit = $('.btn-edit')
let dIp = $('#data-input')
let btnAdd = $('#btn-add')
let btnLogin = $('#btn-login')

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
            alert('OK')
            if (window.confirm) {
                fetch(`http://127.0.0.1:8080/api/category/del/${id}`, {
                        method: 'DELETE',
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
                        let eC = $(`#C${id}`)
                        eC.remove();
                    })

            }
        }

        ,
    AddC: (e) => {
        fetch(`http://127.0.0.1:8080/api/category/add`, {
                method: 'POST',
                body: JSON.stringify({
                    name: e.target.value
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
                location.reload()
            })
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

    compEdit: async (event, id, index) => { 
        const response = await fetch(`http://127.0.0.1:8080/api/category/${id}`, OGet)
        const res = await response.json();
        const item = await res.data;

        $(`#C${id}`).innerHTML = `
            <div class="col col-1" data-label="STT">${index+1}</div>
            <div ondblClick="handleEvent.dbClickInput"  class="col col-2" data-label="Name">${item.name}</div> 
            <div class="col col-3" >
                <button class="btn btn-danger" onclick="handleEvent.DelC(event,${item.id})">Delete</button>
                <button class="btn btn-warning btn-edit" onclick="handleEvent.clickEdit(event,${item.id},${index})" >Edit</button>
            </div> 
        `
    },

    handleUpdate: async (event, id, index) => {

        OPut.body = JSON.stringify({
            id: id,
            name: $(`#I${id}`).value
        }) 
        const response = await fetch(`http://127.0.0.1:8080/api/category/edit`, OPut);

        let res = await response.json();

         handleEvent.compEdit(event, id, index);
    },

    


}


if (btnLogin) {
    btnLogin.onclick = () => {

        fetch('http://127.0.0.1:8080/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: 'admin',
                    password: 'admin'
                }),
                credentials: 'include   ',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',

                    'access-control-allow-headers': "*",
                    'Accept': 'application/json',
                    'origin': "*",
                }
            })
            .then(res => res.json())
            .then(res => console.log(res.data))
    }
}




fetch('http://127.0.0.1:8080/api/category/', {
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
        categories = res.data.map((item, index) => (
            `<li class="table-row" id='C${item.id}' >
                <div class="col col-1" data-label="STT">${index+1}</div>
                <div ondblClick="handleEvent.dbClickInput"  class="col col-2" data-label="Name">${item.name}</div> 
                <div class="col col-3" >
                    <button class="btn btn-danger" onclick="handleEvent.DelC(event,${item.id})">Delete</button>
                    <button class="btn btn-warning btn-edit" onclick="handleEvent.clickEdit(event,${item.id},${index})" >Edit</button>
                </div> 
            </li>`
        )).join('')

        _categories.innerHTML = categories
    })