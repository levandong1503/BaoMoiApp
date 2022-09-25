let newsUI = document.getElementsByClassName("content-layout")[0];
let idNews = localStorage.getItem("newsDetail")
let content = '';
fetch(`https://127.0.0.1:5001/api/News/${idNews}`)
.then(r => r.json())
.then(res => {
    content += `<h1>${res.title}</h1>`
    content += `<p class="main-infor-news">${res.description}</p>`
    content +=  `<img class="img-infor-news" src="${res.img}"> `
    content += `<p class="infor-news"> ${res.content} </h1>`
    newsUI.innerHTML = content
})
