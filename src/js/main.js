// import { gsap } from 'gsap';
// const { gsap } = require('gsap');

// map
// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

function init() {
    // Создание карты.
    let myMap = new ymaps.Map("contacts-map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        center: [55.760103, 37.615272],
        // Уровень масштабирования
        zoom: 13,
    });
    // запрещаем скролл
    myMap.behaviors.disable(['scrollZoom']);
    // Убираем элементы управления на карте
	myMap.controls.remove('geolocationControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
	myMap.controls.remove('zoomControl');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('rulerControl');

    // находим локацию по координатам
    // var myGeoObject = new ymaps.GeoObject({
    //     geometry: {
    //         type: "Point", // тип геометрии - точка
    //         coordinates: [55.769608, 37.639187] // координаты точки
    //     }
    // });
    // стилиуем маркер
    var myPlacemark = new ymaps.Placemark([55.769608, 37.639187], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'images/placemark.png',
        iconImageSize: [12, 12],
        iconImageOffset: [0, 0]
    });
    // Размещение гео-объекта на карте.
    myMap.geoObjects.add(myPlacemark);
}

// reload page, when device orientation changes

if (window.DeviceOrientationEvent) {
    window.addEventListener('orientationchange', function() {
		location.reload();
	}, false);
}

// page loading animation

const pageLoading = gsap.timeline();

if (window.screen.width > 900) {
	pageLoading
		.from('.main__description', {duration: 0.5, opacity: 0, y: 100}, "group1")
		.from('.main__title', {duration: 0.5, opacity: 0, y: 150}, "group1")
		.from('.main__date', {duration: 0.5, opacity: 0, y: 150}, "group1")
		.from('.hero__work1', {duration: 0.4, opacity: 0, scale: 0.8})
		.from('.hero__work2', {duration: 0.4, opacity: 0, scale: 0.8}, "group2")
		.from('.hero__work3', {duration: 0.4, opacity: 0, scale: 0.8}, "group2")
		.from('.hero__title', {duration: 1, opacity: 0});
}

// search block

const openButton = document.querySelector('.search__btn');
const closeSearchButton = document.querySelector('.search__close');

const searchAnimation = gsap.timeline({paused: true});
const searchAnimationMobile = gsap.timeline({paused: true});

if (window.screen.width <= 600) {
	searchAnimation
		.to('.header__logo', {duration: 0, display: "none"}, "firstPhase")
		.to('.search', {duration: 0, gridColumn: "1 / span 2"}, "firstPhase")
		.to('.search__btn', {duration: 0, opacity: 0, display: "none"}, "firstPhase")
		.from('.search__form', {duration: .5, y: 30, display: "none"});
} else {
	searchAnimation
		.to('.search__btn', {duration: 0, opacity: 0, display: "none"})
		.from('.search__form', {duration: .5, y: 30, display: "none"});
}

openButton.onclick = () => searchAnimation.play();
closeSearchButton.onclick = () => searchAnimation.reverse();

// burger-menu

const burgerButton = document.querySelector('.nav__menu-btn');
const closeBurgerButton = document.querySelector('.nav__close');
const navItems = document.querySelectorAll('.nav__item');
const phoneIcon = document.querySelector('.phone-img');

const phoneIconAnimation = gsap.timeline({paused: true});
phoneIconAnimation.from('.phone-img', {rotate: 20, scale: 1.1, ease: "elastic.in(2,0.2)", repeat: -1, repeatDelay: 2});

const burgerAnimation = gsap.timeline({paused: true});
const burgerCloseIfScroll = gsap.timeline({paused: true});

if (window.screen.width <= 600) {
	burgerAnimation
		.to('.nav__menu-btn', {duration: 0, opacity: 0}, "firstPhase")
		.to('body', {duration: 0, overflow: "hidden"}, "firstPhase")
		.to('.nav__container', {duration: .3, height: "calc(100vh - 71px)", opacity: 1, pointerEvents: "inherit"})
		.from('.nav__list', {duration: .3, opacity: 0});
}

burgerButton.onclick = () => {
	burgerAnimation.play();
	phoneIconAnimation.play();
}
closeBurgerButton.onclick = () => {
	burgerAnimation.reverse();
	phoneIconAnimation.pause();
}
navItems.forEach(item => item.onclick =() => {
	burgerAnimation.reverse();
	phoneIconAnimation.pause();
});

// contacts

const contactsOpenButton = document.querySelector('.contacts__open');
const contactsCloseButton = document.querySelector('.contacts__close');

const contactsAnimation = gsap.timeline({paused: true});

if (window.screen.width > 1100) {
	contactsAnimation
		.to('.contacts__hidden', {duration: .3, right: "51.8%", zIndex: 0}, "firstPhase")
		.to('.contacts__open', {duration: .1, opacity: 0}, "firstPhase")
		.to('.contacts__hidden', {duration: .3, ease: "power1.in", opacity: 0}, "secondPhase")
		.from('.contacts__main', {duration: .3, ease: "power1.out", opacity: 0}, "secondPhase");
} else {
	contactsAnimation
		.to('.contacts__hidden', {duration: .3, top: "66%", zIndex: 0}, "firstPhase")
		.to('.contacts__open', {duration: .1, opacity: 0}, "firstPhase")
		.to('.contacts__hidden', {duration: .3, ease: "power1.in", opacity: 0}, "secondPhase")
		.from('.contacts__main', {duration: .3, ease: "power1.out", opacity: 0}, "secondPhase");
}

contactsOpenButton.onclick = () => {
	contactsAnimation.play();
	phoneIconAnimation.play();
}
contactsCloseButton.onclick = () => {
	contactsAnimation.reverse();
	phoneIconAnimation.pause();
}











