// ==================================== about slider =====================================

const aboutSlider = document.querySelector('.about-slider');
const aboutSliderScrollArea = document.querySelector('.about__scroll-area');
const aboutSliderPlayStop = document.querySelector('.about__stop-play');
const aboutSliderReverse = document.querySelector('.about__reverse');
let isMoving = true;

// ==== about slider interval move 
function aboutSliderMove () {
    aboutSlider.classList.add('about-slider_moving');
    let offset = aboutSlider.offsetLeft;
    aboutSlider.style.left = `${offset - 4}px`;   
}

let startSliderMove = setInterval(aboutSliderMove, 100);

function aboutSliderPlayToggle () {
    if(isMoving) {
        clearInterval(startSliderMove);
        isMoving = false;
    } else {
        startSliderMove = setInterval(aboutSliderMove, 100);
        isMoving = true;
    }
}

aboutSliderPlayStop.addEventListener('click', aboutSliderPlayToggle);

aboutSliderReverse.addEventListener('click', () => {
    clearInterval(startSliderMove);
    aboutSlider.style.left = "0px";
    setTimeout(() => {
        startSliderMove = setInterval(aboutSliderMove, 100);
    }, 200);  
    isMoving = true;
})

// ==== about slider wheel scroll

aboutSliderScrollArea.addEventListener('wheel', (e) => {
    e.preventDefault();
    clearInterval(startSliderMove);

    aboutSlider.classList.add('about-slider_moving');
    let offset = aboutSlider.offsetLeft;
    aboutSlider.style.left = `${offset - (e.deltaY*3)}px`; 

    if (isMoving == true) startSliderMove = setInterval(aboutSliderMove, 100);
})

// ==== about slider drag scroll
let sliderPressed = false;
let sartX, currX;

aboutSliderScrollArea.addEventListener('mouseenter', () => {
    aboutSliderScrollArea.style.cursor = 'grab';
})
aboutSliderScrollArea.addEventListener('mouseup', () => {
    aboutSliderScrollArea.style.cursor = 'grab';
})

aboutSliderScrollArea.addEventListener('pointerdown', (e) => {
    sliderPressed = true;
    clearInterval(startSliderMove);
    aboutSlider.classList.remove('about-slider_moving');
    startX = e.offsetX - aboutSlider.offsetLeft;
    aboutSliderScrollArea.style.cursor = 'grabbing';
 
})

aboutSliderScrollArea.addEventListener('pointermove', (e) => {
    if (!sliderPressed) return;
    e.preventDefault();
    currX = e.offsetX;
    aboutSlider.style.left = `${currX - startX}px`;
})

window.addEventListener('pointerup', () => {
    if (!sliderPressed) return;
    sliderPressed = false;
    if (isMoving == true) startSliderMove = setInterval(aboutSliderMove, 100);
    aboutSlider.classList.add('about-slider_moving');
})

// ================================  mess header string ================================

const headerName = document.querySelector('.header__name');
const headerProfession = document.querySelector('.header__profession');
const initialString = headerProfession.innerHTML;

headerName.addEventListener('mouseover', () => {

    function setDelay (index) {
            let length = initialString.length;
            setTimeout(() => {
                    let random = Math.floor(Math.random() * length);
                    headerProfession.innerHTML = initialString.replace(initialString.charAt(random), initialString.charAt(random).toUpperCase());
                    if(length == index) {
                        headerProfession.innerHTML = initialString;
                    }
            }, 45 * index);
        }

    for (let i = 0; i <= initialString.length; i++) {
        setDelay(i);
    } 

})

headerName.addEventListener('mouseout', () => {
    headerProfession.innerHTML = initialString;
})


// ==================================== skill slider =====================================

const slider = document.querySelector('.skill-slider__row');
const sliderItems = document.querySelectorAll('.skill-slider__item');
const sliderButtonPrev = document.querySelector('.skill-slider__button_left');
const sliderButtonNext = document.querySelector('.skill-slider__button_right');
const sliderDots = document.querySelector('.skill-slider__dots');

slide(slider, sliderItems, sliderButtonPrev, sliderButtonNext, sliderDots);

function slide(wrapper, items, prev, next, dots) {

    let posInitial = 0;
        slidesLength = items.length;
        slideSize = items[0].offsetWidth,
        posInitial = -slideSize;
        firstSlide = items[0],
        lastSlide = items[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    wrapper.appendChild(cloneFirst);
    wrapper.insertBefore(cloneLast, firstSlide);
  
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    for (let i = 0; i < slidesLength; i++) {
        let dot = document.createElement('div');
        dot.classList.add('skill-slider__dot');
        dots.appendChild(dot);
        dot.addEventListener('click', () => shiftByDot(i));
    }

    shiftSlide(1);
    index = 0;
    dotAddActive(0);
    allowShift = true;

    wrapper.addEventListener('transitionend', checkIndex, false);

    function shiftSlide(dir) {
        wrapper.classList.add('skill-slider__shifting');
        if (allowShift) {
          posInitial = wrapper.offsetLeft;
          if (dir == 1) {
            wrapper.style.left = (posInitial - slideSize) + "px";
            index++;      
          } else if (dir == -1) {
            wrapper.style.left = (posInitial + slideSize) + "px";
            index--;      
          }
        };
          
        allowShift = false;
    }
    
    function checkIndex (){
        wrapper.classList.remove('skill-slider__shifting');
        if (index == -1) {
            wrapper.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }
        if (index == slidesLength) {
            wrapper.style.left = -(1 * slideSize) + "px";
            index = 0;
        }
        dotAddActive(index);
        allowShift = true;
    }

    function shiftByDot (i) {
        wrapper.classList.add('skill-slider__shifting');
        wrapper.style.left = -((i + 1) * slideSize) + "px";
        index = i;

        dotAddActive(i); 
    }

    function dotAddActive (i) {
        for(dot of dots.children) {
            dot.classList.remove('skill-slider__dot_active');
        }
        dots.children[i].classList.add('skill-slider__dot_active');
    }

    window.addEventListener('resize', function(event) {
        this.setTimeout(() => {
            slideSize = items[0].offsetWidth; 
            shiftByDot (0);
        }, 100)   
    }, true);
}



// ==================================== footer smooth scroll to header =====================================

const footer = document.querySelector('.footer');

footer.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
})


// ==================================== burger active ===========================================

const headerBurger = document.querySelector('.header__burger');
const headerNav = document.querySelector('.header__nav');

headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('header__burger_active');
    headerNav.classList.toggle('header__nav_showed');
})

// ==================================== animate by scroll ===========================================

const observerOption = {threshold: 0.2};

const elementsClasses = ['.git15__container', '.memo__container', '.skills__container', '.iwant__container'];

let elementsForObserve = [];

elementsClasses.forEach(elementClass => {
    let element = document.querySelector(elementClass);
    elementsForObserve.push(element);
})

hideForObserver(elementsForObserve);

function hideForObserver (elements) {
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(25px)';
        element.style.transition = 'all .7s'
    })
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const block = entry.target;
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
            observer.unobserve(block);
        }
    })
}, observerOption)

window.addEventListener('DOMContentLoaded', () => {
    elementsForObserve.forEach(i => {
        observer.observe(i);
    })    
})

