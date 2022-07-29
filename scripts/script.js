// ==== git15 mail block 

const mailBlock = document.querySelector('.git15__mail');
const mailBlockText = document.querySelector('.git15__mail__text');
const mailBlockHint = document.querySelector('.git15__mail__hint');

window.addEventListener('scroll', function() {


    if (pageYOffset = 300 && mailBlockHint.style.top != '10px') {
        setTimeout(() => {
            mailBlockHint.style.top = '10px';
        }, 1500);
    }
  });

mailBlock.addEventListener('click', () => {

    let area = document.createElement('textarea');
    document.body.appendChild(area);
    area.value = mailBlockText.innerHTML;
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);

    setTimeout(() => {
        mailBlockHint.style.top = '-30px';
    }, 100);
})

// ==== portfolio stack hints 

const stackImg = document.querySelectorAll('.slider__item__img');

for (img of stackImg) {

    let hint = document.createElement('div');
    hint.classList.add('img_hint');
    hint.innerHTML = img.alt;

    img.insertAdjacentElement('afterEnd', hint);
}

// ==== about stack hints 

const stackAboutImg = document.querySelectorAll('.about__stack__img');

for (img of stackAboutImg) {

    let hint = document.createElement('div');
    hint.classList.add('img_hint');
    hint.innerHTML = img.alt;

    img.insertAdjacentElement('afterEnd', hint);
}


// === sostoyanie profile images

const sostoyanieRow = document.querySelector('.sostoyanie__slider_row');
let sostoyanieStep = sostoyanieRow.offsetWidth;
let sostoyanieOffset = 0;

let sostoyanieRowSlider = setInterval(() => {
    sostoyanieOffset -= sostoyanieStep;
    if (sostoyanieOffset < -(sostoyanieStep * 2)) {
        sostoyanieOffset = 0;
    } 
    sostoyanieRow.style.left = sostoyanieOffset + 'px';   
}, 2000);

// === portfoli0 slider image

const portfolioSlider = document.querySelector('.slider__row');
const portfolioSliderButtons = document.querySelectorAll('.slider__nav__item');
let portfolioSliderStep = portfolioSlider.offsetWidth;

window.addEventListener('resize', function(event) {
    portfolioSliderStep = portfolioSlider.offsetWidth;
}, true);
portfolioSlider.style.left = portfolioSliderStep + 'px';
portfolioSlider.style.left = 0;

portfolioSliderButtons.forEach((item, index) => {

    item.addEventListener('click', function() {
        portfolioSlider.style.left = -(portfolioSliderStep * index) + 'px';
        portfolioSliderButtons.forEach((i) => {
            i.classList.remove('slider__nav__active');
        })
        item.classList.add('slider__nav__active');
    })
})

// === smooth scroll 

function smoothScrollTo (element) {
    element.scrollIntoView({block: "center", behavior: "smooth"});
}

const linkToPortfolio = document.querySelector('.header__link_portfolio');
const linkToAbout = document.querySelector('.header__link_about');
const linkToContacts = document.querySelector('.header__link_contacts');
const footerLinkToUp = document.querySelector('.footer');

const porfolio = document.querySelector('.porfolio');
const about = document.querySelector('.about');
const contacts = document.querySelector('.contacts');
const header = document.querySelector('.header');

linkToPortfolio.addEventListener('click', () => {
    smoothScrollTo(porfolio);
    headerBurger.classList.remove('header__burger__active');
    headerNav.classList.remove('header__nav_active');
});
linkToAbout.addEventListener('click', () => {
    smoothScrollTo(about);
    headerBurger.classList.remove('header__burger__active');
    headerNav.classList.remove('header__nav_active');
});
linkToContacts.addEventListener('click', () => {
    smoothScrollTo(contacts);
    headerBurger.classList.remove('header__burger__active');
    headerNav.classList.remove('header__nav_active');
});
footerLinkToUp.addEventListener('click', () => {
    smoothScrollTo(header);
});


// === header burger 

const headerBurger = document.querySelector('.header__burger');
const headerNav = document.querySelector('.header__nav');

headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('header__burger__active');
    headerNav.classList.toggle('header__nav_active');
})
