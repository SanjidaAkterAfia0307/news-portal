const menuLoadData = () => {
  let url = `https://openapi.programming-hero.com/api/news/categories`
  fetch(url)
    .then((res) => res.json())
    .then((data) => setMenu(data.data.news_category))
    .catch((error) => console.log(error))
}
const setMenu = (datas) => {
  const nav = document.getElementById("navbar")
  
  datas.forEach(data => {
    console.log(data)
    const li = document.createElement("li")
    li.innerHTML = `<a href="#" onclick="loadNews('${data.category_id}','${data.category_name}')" >${data.category_name}</a>`
    nav.appendChild(li)
  })
}

const loadNews = (id, name) => {
  preLoader(true)
  let url = `https://openapi.programming-hero.com/api/news/category/${id}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNews(data.data, name))
    .catch((error) => console.log(error))
    
}

const showNews = (datas, name) => {
  console.log(datas)
  let totalView=[]
  for(let data of datas){
    totalView.push(data.total_view)
  }
  console.log(totalView)
  const cardContainer = document.getElementById("card-container")
  cardContainer.textContent = "";
  const itemNum = document.getElementById("itemNum")
  const item = document.getElementById("item")
  item.classList.remove("hidden")
  itemNum.innerText = `${datas.length} items found for category ${name}`
 datas=datas.sort(function(a,b){
  return b.total_view - a.total_view
 })
  datas.forEach(data => {

    
    console.log(data)
    const { image_url, author, rating, details, title, total_view } = data
    let card = document.createElement("div")
    card.innerHTML = `<div class="card bg-base-100 shadow-xl">
        <figure><img src="${image_url}" class="" alt="Movie"></figure>
        <div class="card-body">
          <h2 class="card-title">${title.length>60? title.slice(0,60)+"...":title}</h2>
          <p>${details.length > 260 ? details.slice(0, 260) + "..." : details}</p>
          
          <div class="card-actions justify-evenly flex ">
            <div class="flex">
                <img src=${author.img} class="rounded-full h-16 w-16" alt="" srcset="">
                <div>
                  <h2>${author.name ? author.name : "Not found"}</h2>
                  <p>${author.published_date ? author.published_date : "Not found"}</p>
                </div>
            </div>
            <div class="flex justify-evenly items-center">
              <i class="fa-regular fa-eye"></i>
              <p>${total_view ? total_view : "Not found"}</p>
            </div>
            <div>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star-half-stroke"></i>
            </div>
            
              <label for="my-modal-3" class="btn modal-button" onclick="loadDetails('${data._id}')" >Show Details</label>
            
          </div>
        </div>
      </div>`
    cardContainer.appendChild(card)
    
  });
  preLoader(false)
}
const loadDetails=(id)=>{
  let url=`https://openapi.programming-hero.com/api/news/${id}`
  fetch(url)
  .then((res) => res.json())
  .then((data) => showDetails(data.data[0]))
  .catch((error) => console.log(error))
}


const showDetails=(data)=>{
  console.log(data)
  const { image_url, author, rating, details, title, total_view } = data
  const modalBody=document.getElementById("modal-body")
  modalBody.innerHTML=""
  modalBody.innerHTML=`
  <figure><img src="${image_url}" class="" alt="Movie"></figure>
  <div class="card-body">
    <h2 class="card-title">${title}</h2>
    <p>${details}</p>
    
    <div class="card-actions justify-evenly flex ">
      <div class="flex">
          <img src=${author.img} class="rounded-full h-16 w-16" alt="" srcset="">
          <div>
            <h2>${author.name ? author.name : "Not found"}</h2>
            <p>${author.published_date ? author.published_date : "Not found"}</p>
          </div>
      </div>
      <div class="flex justify-evenly items-center">
        <i class="fa-regular fa-eye"></i>
        <p>${total_view ? total_view : "Not found"}</p>
      </div>
      <div>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-regular fa-star-half-stroke"></i>
      </div>     
    </div>
  </div>`
}

const preLoader=isLoading=>{
  const loader=document.getElementById("loader")
  if(isLoading){
    loader.classList.remove("hidden")
  }
  else{
    loader.classList.add("hidden")
  }
}
menuLoadData()