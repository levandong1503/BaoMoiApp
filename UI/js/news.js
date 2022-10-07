const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let content = $('.content-news');
let pagination = $('.pagination');


let currentPage = 0;

const handleEvent ={
    selectPage: (page) => {
        return app.render(page);
    },
}

const app = {

    render : (page =1) => {
        let url = page == 1 ? `http://127.0.0.1:8080/api/news/` : `http://127.0.0.1:8080/api/news/?page=${page}`
       if(content){
        fetch(url, {
            method: 'GET',
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
            let data = res.data.map((item)=>{
                return `
                    <div class="post-article" id="${item.id}" onclick={newsDetail(event)}>
                    <div class="col-infor-contrainer">
                        <a class="img-hover-zoom" ><img class="img-col-title-infor img-radius"
                                src="${item.img}"
                                alt=""></a>
                    </div>
                    <div class="post-title">
                        <a href="#" class="anchor-post-p anchor-post-p-left">${item.title}</a>
                        <div class="post-footer">
                            
                            <span>${item.createAt}</span> 
                            <span>${item.createBy}</span>
                        </div>
                    </div>
                    </div>
                `
            }).join('')
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
            
            content.innerHTML = data
             
        })}
    }
    

    ,
    start : () => {
        app.render();
    }
}

app.start()
