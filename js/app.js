const carousel = document.querySelector('.carousel');
let sliders = []

let slideIndex= 0;
const createSlide = () => {
    if(slideIndex >= movies.length){
        slideIndex=0;
    }  

    //creating DOM elements
    let slide = document.createElement('div');
    let imgElement = document.createElement('img');
    let content = document.createElement('div');
    let h1 = document.createElement('h1');
    let small = document.createElement('small');
    let p = document.createElement('p');
    let h2 = document.createElement('h2');


    //attaching all elements
    imgElement.appendChild(document.createTextNode(''));    
    h1.appendChild(document.createTextNode(movies[slideIndex].name));
    small.appendChild(document.createTextNode(movies[slideIndex].moreInfo));
    p.appendChild(document.createTextNode(movies[slideIndex].des));
    h2.appendChild(document.createTextNode(movies[slideIndex].watch));
    content.appendChild(h1);
    content.appendChild(small);
    content.appendChild(p);
    content.appendChild(h2);

    slide.appendChild(content);
    slide.appendChild(imgElement);
    carousel.appendChild(slide);

    //setting up img
    imgElement.src = movies[slideIndex].image;
    slideIndex++;

    //setting elements classname
    slide.className= 'slider';
    content.className= 'slide-content';
    h1.className= 'movie-title';
    small.className= 'more-info'
    p.className= 'movie-des';
    h2.className= 'watch-movie';

    sliders.push(slide)

    //adding sliding effects
    
    if(sliders.length){
        sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${30 * (sliders.length - 2)}px)`;
    }
}

for(let i=0; i<3; i++){
    createSlide();
}

setInterval(() => {
    createSlide();
}, 3000)

//video cards
const videoCards = [...document.querySelectorAll('.video-card')];

videoCards.forEach( item => {
    item.addEventListener('mouseover', () =>{
        let video = item.children[1];
        video.play();
    })
    item.addEventListener('mouseout', () =>{
        let video = item.children[1];
        video.pause();
    })
})

// card sliders

const tmdbKey = "api_key=8d161379f654c57bcc85080c93e2ac4f";
const url = "https://api.themoviedb.org/3"
const recommended_url = `${url}/discover/movie?sort_by=popularity.desc&${tmdbKey}`
const drama_url = url + "/discover/movie?with_genres=18&primary_release_year=2022&" + tmdbKey

function getRecommendedMovies(url) {
    fetch(url)
        .then(res => res.json()).then(data => {
            // console.log(data.results)
            showMovies(data.results, ".recommended-list")
            showMovies(data.results, ".recommended-list-1")
        })
}
function getDramaMovies(url) {
    fetch(url)
        .then(res => res.json()).then(data => {
            // console.log(data.results)
            showMovies(data.results, ".drama-list")
            showMovies(data.results, ".drama-list-1")
        })
}
getRecommendedMovies(recommended_url)
getDramaMovies(drama_url)

async function showMovies(data, className) {
    data.forEach(el => {
        let div = document.createElement('div')
        div.classList.add('card-container')
        let div3 = document.createElement('div')
        div3.classList.add('card')
        let img = document.createElement('img')
        img.src = `https://image.tmdb.org/t/p/original${el.poster_path}`
        img.classList.add('card-img')
        let div2 = document.createElement('div')
        div2.classList.add('card-body')
        let h2 = document.createElement("h2")
        h2.classList.add('name')
        h2.innerText = el.title
        let h6 = document.createElement("h6")
        h6.classList.add('des')
        h6.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing"
        let button = document.createElement("button")
        button.classList.add('watchlist-btn')
        button.innerText = `+   Add to Watchlist`
        div2.append(h2, h6, button)
        div3.append(img, div2)
        div.append(div3)
        document.querySelector(className).append(div)
    })
    let cardContainers = [...document.querySelectorAll('.movie-cards')];
    let preBtns = [...document.querySelectorAll('.pre-btn')];
    let nxtBtns = [...document.querySelectorAll('.nxt-btn')];
    
    cardContainers.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;
    
        nxtBtns[i].addEventListener('click', ()=>{
            item.scrollLeft += containerWidth - 200;
        })
    
        preBtns[i].addEventListener('click', ()=>{
            item.scrollLeft -= containerWidth + 200;
        })
    })
}




