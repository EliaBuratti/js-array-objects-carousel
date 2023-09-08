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
let slideDirection = 'next';
let slideAuto; //la utilizzo per decidere quando attivare o disattivare il timer usando una funzione

// seleziono gli elementi della dom
const sliderImagesEl = document.querySelector('.slider .images');
const prevEl = document.querySelector('.prev');
const nextEl = document.querySelector('.next');
const thumbsElement = document.querySelector('.thumbnails');
const buttonReverse = document.querySelector('button');
const buttonSlide = document.querySelector('#scrolling');
const infoScroll = document.querySelector('p');
  
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

//volendo posso racchiudere parte del contenuto di questi eventlistener in una funzione------------

        // intercept click on the next icon 
        nextEl.addEventListener('click', function(){
            //interrompo lo scrolling
            autoScroll(false);

            //rimuovo il suggerimento
            removeClass(infoScroll, 'active');

            //cambio la direzione della slide
            slideDirection = 'next';

            //richiamo la funzione con il parametro con la direzione della slide
            onClick(slideDirection);

        });

        // intercept click on the prev icon
        prevEl.addEventListener('click', function () {
            //interrompo lo scrolling
            autoScroll(false);

            //rimuovo il suggerimento
            removeClass(infoScroll, 'active');

            //cambio la direzione della slide
            slideDirection = 'prev';

            //richiamo la funzione con il parametro con la direzione della slide
            onClick(slideDirection);
        });
//volendo posso racchiudere parte del contenuto di questi eventlistener in una funzione------------

//inverto lo scorrimento automatico delle slide
buttonReverse.addEventListener('click', function(){
    
    if (slideDirection === 'next'){
        autoScroll(false);
        slideDirection = 'prev';
        console.log('cambio in prev');

    } else {
        autoScroll(false);
        slideDirection = 'next';
        console.log('cambio in next');
    };
    autoScroll(true);
    infoScroll.classList.add('active');
});
//funzione da eseguire al click

/**
 * 
 * @param {string} direction accept only 'next' or 'prev'
 */
function onClick(direction) {

    const slidesImages = document.querySelectorAll('.slider .images > img');

    // select the current slide
    const currentSlide = slidesImages[activeSlide];

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

// add to the next thumb the active class
nextThumb.classList.add('active');
    
};


/**
 * 
 * @param {boolean} boolean richiede un valore true o false
 */
function autoScroll (boolean){

    if (!boolean) {

        //interrompo il timer e ripristino la scritta del bottone    
        clearInterval(slideAuto);
        buttonSlide.innerHTML = 'Start scrolling';
        
    } else {   
        slideAuto = setInterval(function(){
            onClick(slideDirection);
            console.log(slideDirection);
        }, 1000);

        //cambio testo nel bottone
        buttonSlide.innerHTML = 'Click to reverse scrolling';

    }
};

/**
 * 
 * @param {DomElement} DOMel inserire l'elemento targhet
 * @param {string} className inserire nome della classe senza il punto
 */
function removeClass (DOMel, className) {
    DOMel.classList.remove(className);
};



