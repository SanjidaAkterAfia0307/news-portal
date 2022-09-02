const menuLoadData=()=>{
    let url=`https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>setMenu(data.data.news_category))
}
const setMenu=(datas)=>{
    const nav=document.getElementById("navbar")
    datas.forEach(data=>{
        const li=document.createElement("li")
        li.innerHTML=`<a href="#" onclick="" class="block py-2 pr-4 pl-3 text-white text-xl bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">${data.category_name}</a>`
        nav.appendChild(li)
    })
}
menuLoadData()