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

// search block

const openButton = document.querySelector('.search__btn');
const searchForm = document.querySelector('.search__form');
const closeSearchButton = document.querySelector('.search__close');
const logo = document.querySelector('.header__logo');
const searchBlock = document.querySelector('.search');

function searchFormControl() {
	openButton.classList.toggle('hide');
	searchForm.classList.toggle('search__form--show');

	if (window.screen.width <= 600 ) {
		logo.classList.toggle('hide');
		searchBlock.classList.toggle('search--mobile');
	}
}

openButton.addEventListener('click', searchFormControl);
closeSearchButton.addEventListener('click', searchFormControl);

// burger-menu

const body = document.querySelector('body');
const burgerButton = document.querySelector('.nav__menu-btn');
const navContainer = document.querySelector('.nav__container');
const closeBurgerButton = document.querySelector('.nav__close');
const navItems = document.querySelectorAll('.nav__item');

burgerButton.addEventListener('click', function () {
	navContainer.classList.add('nav__container--show');
	body.classList.add('noscroll');
})

function closeBurger () {
	navContainer.classList.remove('nav__container--show');
	body.classList.remove('noscroll');
}

closeBurgerButton.addEventListener('click', closeBurger);
navItems.forEach(item => {
	item.addEventListener('click', closeBurger);
});

// contacts

const contactsOpenButton = document.querySelector('.contacts__open');
const contactsCloseButton = document.querySelector('.contacts__close');

const contacts = gsap.timeline({paused: true});

if (window.screen.width > 1100) {
	contacts
		.to('.contacts__hidden', {duration: .3, right: "51.8%", zIndex: 0}, "firstPhase")
		.to('.contacts__open', {duration: .1, opacity: 0}, "firstPhase")
		.to('.contacts__hidden', {duration: .3, ease: "power1.in", opacity: 0}, "secondPhase")
		.from('.contacts__main', {duration: .3, ease: "power1.out", opacity: 0}, "secondPhase");
} else {
	contacts
		.to('.contacts__hidden', {duration: .3, top: "66%", zIndex: 0}, "firstPhase")
		.to('.contacts__open', {duration: .1, opacity: 0}, "firstPhase")
		.to('.contacts__hidden', {duration: .3, ease: "power1.in", opacity: 0}, "secondPhase")
		.from('.contacts__main', {duration: .3, ease: "power1.out", opacity: 0}, "secondPhase");
}

contactsOpenButton.onclick = () => contacts.play();

contactsCloseButton.onclick = () => contacts.reverse();












