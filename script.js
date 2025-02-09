// const API_KEY= "78cb92e78a6e4c448902e593f576b531";
// const url= "https://newsapi.org/v2/everything?q="

// window.addEventListener('load',()=>fetchNews("India"));

// function reload(){
//     window.location.reload();
// }

// async function fetchNews (query){
//     const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
//     const data= await res.json();
//     bindData(data.articles);
// }

// function bindData(articles){
//     const cardsContainer= document.getElementById("cards-container");
//     const newsCardTemplate= document.getElementById("template-news-card");

//     cardsContainer.innerHTML='';

//     articles.forEach(article =>{
//         if(!article.urlToImage) return;
//         const cardClone= newsCardTemplate.content.cloneNode(true);
//         fillDataInCard(cardClone,article);
//         cardsContainer.appendChild(cardClone);
//     });
// }

// function fillDataInCard(cardClone, article){
//     const newsImg=cardClone.querySelector('#news-img');
//     const newsTitle=cardClone.querySelector('#news-title');
//     const newsSource=cardClone.querySelector('#news-source');
//     const newsDesc=cardClone.querySelector('#news-desc');

//     newsImg.src= article.urlToImage;
//     newsTitle.innerHTML=article.title;
//     newsDesc.innerHTML=article.description;

//     const date= new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta"});

//     newsSource.innerHTML= `${article.source.name} • ${date}`;

//     cardClone.firstElementChild.addEventListener("click",() => {
//         window.open(article.url,"_blank");
//     });
// }

// let curSelectedNav =null;
// function onNavItemClick (id) {
//     fetchNews(id);
//     const navItem= document.getElementById(id);
//     curSelectedNav?.classList.remove('active');
//     curSelectedNav=navItem;
//     curSelectedNav.classList.add('active');
// }

// const searchButton=  document.getElementById('search-button');
// const searchText= document.getElementById('search-text');

// searchButton.addEventListener('click',()=>{
//     const query= searchText.value;
//     if(!query) return;
//     fetchNews(query);
//     curSelectedNav?.classList.remove('active');
//     curSelectedNav=null;
// })

const API_KEY = "78cb92e78a6e4c448902e593f576b531";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        
        if (!res.ok) {
            throw new Error(`API Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        
        if (!data.articles || data.articles.length === 0) {
            throw new Error("No articles found. Try a different query.");
        }

        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error.message);
        displayErrorMessage(error.message);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    if (!cardsContainer || !newsCardTemplate) {
        console.error("Error: Missing HTML elements.");
        return;
    }

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    if (!newsImg || !newsTitle || !newsSource || !newsDesc) {
        console.error("Error: Missing template elements.");
        return;
    }

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title || "No Title Available";
    newsDesc.innerHTML = article.description || "No Description Available";

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    newsSource.innerHTML = `${article.source?.name || "Unknown"} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);

    if (navItem) {
        curSelectedNav?.classList.remove("active");
        curSelectedNav = navItem;
        curSelectedNav.classList.add("active");
    }
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

if (searchButton && searchText) {
    searchButton.addEventListener("click", () => {
        const query = searchText.value.trim();
        if (!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    });
}

function displayErrorMessage(message) {
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
        errorContainer.innerText = message;
        errorContainer.style.display = "block";
    }
}
