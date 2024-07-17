"use strict";ymaps.ready((function(){var o=new ymaps.Map("contacts-map",{center:[55.760103,37.615272],zoom:13});o.behaviors.disable(["scrollZoom"]),o.controls.remove("geolocationControl"),o.controls.remove("searchControl"),o.controls.remove("trafficControl"),o.controls.remove("typeSelector"),o.controls.remove("zoomControl"),o.controls.remove("fullscreenControl"),o.controls.remove("rulerControl");var e=new ymaps.Placemark([55.769608,37.639187],{},{iconLayout:"default#image",iconImageHref:"images/placemark.png",iconImageSize:[12,12],iconImageOffset:[0,0]});o.geoObjects.add(e)})),window.DeviceOrientationEvent&&window.addEventListener("orientationchange",(function(){location.reload()}),!1);var o=gsap.timeline();window.screen.width>900&&o.from(".main__description",{duration:.5,opacity:0,y:100},"group1").from(".main__title",{duration:.5,opacity:0,y:150},"group1").from(".main__date",{duration:.5,opacity:0,y:150},"group1").from(".hero__work1",{duration:.4,opacity:0,scale:.8}).from(".hero__work2",{duration:.4,opacity:0,scale:.8},"group2").from(".hero__work3",{duration:.4,opacity:0,scale:.8},"group2").from(".hero__title",{duration:1,opacity:0});var e=document.querySelector(".search__btn"),t=document.querySelector(".search__close"),n=gsap.timeline({paused:!0});gsap.timeline({paused:!0});window.screen.width<=600?n.to(".header__logo",{duration:0,display:"none"},"firstPhase").to(".search",{duration:0,gridColumn:"1 / span 2"},"firstPhase").to(".search__btn",{duration:0,opacity:0,display:"none"},"firstPhase").from(".search__form",{duration:.5,y:30,display:"none"}):n.to(".search__btn",{duration:0,opacity:0,display:"none"}).from(".search__form",{duration:.5,y:30,display:"none"}),e.onclick=function(){return n.play()},t.onclick=function(){return n.reverse()};var a=document.querySelector(".nav__menu-btn"),r=document.querySelector(".nav__close"),i=document.querySelectorAll(".nav__item"),c=(document.querySelector(".phone-img"),gsap.timeline({paused:!0}));c.from(".phone-img",{rotate:20,scale:1.1,ease:"elastic.in(2,0.2)",repeat:-1,repeatDelay:2});var s=gsap.timeline({paused:!0});gsap.timeline({paused:!0});window.screen.width<=600&&s.to(".nav__menu-btn",{duration:0,opacity:0},"firstPhase").to("body",{duration:0,overflow:"hidden"},"firstPhase").to(".nav__container",{duration:.3,height:"calc(100vh - 71px)",opacity:1,pointerEvents:"inherit"}).from(".nav__list",{duration:.3,opacity:0}),a.onclick=function(){s.play(),c.play()},r.onclick=function(){s.reverse(),c.pause()},i.forEach((function(o){return o.onclick=function(){s.reverse(),c.pause()}}));var d=document.querySelector(".contacts__open"),u=document.querySelector(".contacts__close"),l=gsap.timeline({paused:!0});window.screen.width>1100?l.to(".contacts__hidden",{duration:.3,right:"51.8%",zIndex:0},"firstPhase").to(".contacts__open",{duration:.1,opacity:0},"firstPhase").to(".contacts__hidden",{duration:.3,ease:"power1.in",opacity:0},"secondPhase").from(".contacts__main",{duration:.3,ease:"power1.out",opacity:0},"secondPhase"):l.to(".contacts__hidden",{duration:.3,top:"66%",zIndex:0},"firstPhase").to(".contacts__open",{duration:.1,opacity:0},"firstPhase").to(".contacts__hidden",{duration:.3,ease:"power1.in",opacity:0},"secondPhase").from(".contacts__main",{duration:.3,ease:"power1.out",opacity:0},"secondPhase"),d.onclick=function(){l.play(),c.play()},u.onclick=function(){l.reverse(),c.pause()};