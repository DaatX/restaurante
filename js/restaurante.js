'use strict';

// preload

// La carga finalizará después de cargar el documento.

const preloader = document.querySelector("[data-preaload]");

// agregado el loader
window.addEventListener("load", function() {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

//   agregar detector de eventos en múltiples elementos

const addEventOnElements = function(elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

// NAVBAR


const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

// activado el menu 
const toggleNavbar = function() {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

// header y Vover arriba boton

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function() {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

    lastScrollPos = window.scrollY;
}

// activa el header scroll cuando baja
window.addEventListener("scroll", function() {
    if (window.scrollY >= 50) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    } else {
        // desativar el scroll al esta arriba
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
});

// home slider

const homeSlider = document.querySelector("[data-home-slider]");
const homeSliderItems = document.querySelectorAll("[data-home-slider-item]");
const homeSliderPrevBtn = document.querySelector("[data-prev-btn]");
const homeSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = homeSliderItems[0];

// actualizar el slider de la posicion
const updateSliderPos = function() {
    lastActiveSliderItem.classList.remove("active");
    homeSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = homeSliderItems[currentSlidePos];
}

// para darle siguiente al slider
const slideNext = function() {
    if (currentSlidePos >= homeSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

homeSliderNextBtn.addEventListener("click", slideNext);

// para el anterior imagen en slider
const slidePrev = function() {
    if (currentSlidePos <= 0) {
        currentSlidePos = homeSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }

    updateSliderPos();
}

homeSliderPrevBtn.addEventListener("click", slidePrev);

//   slider automatico

let autoSlideInterval;

const autoSlide = function() {
    autoSlideInterval = setInterval(function() {
        slideNext();
    }, 7000);
}

addEventOnElements([homeSliderNextBtn, homeSliderPrevBtn], "mouseover", function() {
    clearInterval(autoSlideInterval);
});

addEventOnElements([homeSliderNextBtn, homeSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);

// Parallax

/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function(event) {

    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;
    // invertir el número, por ejemplo. 20 -> -20, -5 -> 5
    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }

});