let newsUI = document.getElementsByClassName("content-layout")[0];
let idNews = localStorage.getItem("newsDetail")
let content = '';
fetch(`https://127.0.0.1:5001/api/News/${idNews}`)
.then(r => r.json())
.then(res => {
    content += `<h1>${res.title}</h1>`
    content +=  `<img class="img-infor-news" src="${res.img}"> `
    content += `<p class="infor-news"> ${res.contentNews} </h1>`
    newsUI.innerHTML = content
})
