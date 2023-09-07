/* Modifichiamo il codice dell'esercizio per renderlo funzionante con un array di oggetti al posto di un array di stringhe.
Bonus 0:
Non eramamo ancora a conoscenda di molti strumenti utili, come ad esempio le funzioni. É possibile fare refactoring del codice, pulendolo e creando quanche funzione che possa rendere tutto piú leggibile e pulito?
Bonus 1:
Sperimentiamo attraverso l'uso delle timing functions anche una funzionalità di scorrimento al nostro carosello:
al click di un bottone o già dall'inizio possiamo far partire, ad intervalli di tempo a piacere, lo scorrimento delle immagini disponibili nel carosello stesso.
Bonus 2:
E se volessi un bottone per invertire la "direzione" del carosello? */


//Modifichiamo il codice dell'esercizio per renderlo funzionante con un array di oggetti al posto di un array di stringhe.
const slides = [

    { picture:'01.webp'},
    { picture:'02.webp'},
    { picture:'03.webp'},
    { picture:'04.webp'},
    { picture:'05.webp'},
    
];
  
let activeSlide = 0;

// select the dom elements
const sliderImagesEl = document.querySelector('.slider .images');
const prevEl = document.querySelector('.prev');
const nextEl = document.querySelector('.next');
const thumbsElement = document.querySelector('.thumbnails');
  
//ciclo le slide con un forEach  
slides.forEach((slide, index) => {

    //costante con il percorso
    const slidePath = slide.picture;

    //creo il markup per la slide e thumbnail
    const thumbMarkup = `<img class="thumb ${activeSlide === index ? 'active' : ''}" src="./assets/img/${slidePath}" alt="">`;
    const slideMarkup = `<img class="${activeSlide === index ? 'active' : '' }" src="./assets/img/${slidePath}" alt="">`;
    
    //inserisco nella dom il markup
    sliderImagesEl.insertAdjacentHTML('beforeend', slideMarkup);
    thumbsElement.insertAdjacentHTML('beforeend', thumbMarkup)

});
  
const slidesImages = document.querySelectorAll('.slider .images > img')
console.log(slidesImages);

// intercept click on the next icon 
nextEl.addEventListener('click', function(){
    onClick('next');
});

// intercept click on the prev icon
prevEl.addEventListener('click', function () {
    onClick('prev');
});


//funzione da eseguire al click

/**
 * 
 * @param {string} direction accept only 'next' or 'prev'
 */
function onClick(direction) {
    
    // select the current slide
    const currentSlide = slidesImages[activeSlide]

    // remove the active class from the current slide
    currentSlide.classList.remove('active')
    
    // select the active thumb
    const currentThumb = document.querySelector('.thumbnails > img.active')

    // remove the active class from the active thumb
    currentThumb.classList.remove('active')
    
    

    switch (direction) {

        case 'next':
            
            // activeSlide = 4
            if (activeSlide === slidesImages.length - 1) {
                activeSlide = 0
                // activeSlide = 5
            } else {
                // increment the activeSlide of 1
                activeSlide++
            }
        break;

        case 'prev':
        
            // activeSlide = 0
            if (activeSlide === 0) {
                activeSlide = slidesImages.length - 1
                // activeSlide = 5
            } else {
                // decrement the activeSlide of 1
                activeSlide--
            }
        break;

    };

// select the next slide
const nextSlide = slidesImages[activeSlide];
// add the active class to the next slide
nextSlide.classList.add('active');

// select the next thumb
const nextThumb = document.querySelectorAll('.thumb')[activeSlide]
console.log(nextThumb);

// add to the next thumb the active class
nextThumb.classList.add('active');
    
    
}



