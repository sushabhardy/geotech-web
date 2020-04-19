function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function animate(container, isChildrenAnimate=false, isOnTop=false) {
    var parents = document.querySelectorAll(container);

    parents.forEach(parent => {
        var childrens = [];
        for (var i=0;i<parent.childNodes.length;i++) {
            if(parent.childNodes[i].dataset && parent.childNodes[i].dataset.animatable == "animatable") {
                parent.childNodes[i].style.opacity = '0';
                childrens.push(parent.childNodes[i]);
            }
        }
    
    
    function routine() {
        var scroll_pos = document.documentElement.scrollTop + document.documentElement.clientHeight;
        var animatedCount = 0;
        for(var i=0;i<childrens.length;i++) {
            if((childrens[i].offsetTop + childrens[i].style.height)  < scroll_pos - 0.25*innerHeight || window.scrollY > document.body.scrollHeight - 1.1*innerHeight || isOnTop) {
                // console.log(childrens, "assss")
                childrens[i].style.opacity = '0';
                childrens[i].style.transform =`translateY(${16 + i*4}px)`;
                childrens[i].style.animationDelay =String(Number(i*100)) + "ms";
                childrens[i].classList.add("slide-up-opacity-animation");
                if(childrens[i].classList.contains("mascot__line--green") 
                    || childrens[i].classList.contains("mascot__line--white") 
                    || childrens[i].classList.contains("mascot__line--blue") 
                    || childrens[i].classList.contains("mascot__line--orange") 
                    
                ){
                    childrens[i].classList.remove("slide-up-opacity-animation");
                    childrens[i].classList.add("extend-mascot-animation");
                }
            }
            if(childrens[i].classList.contains("slide-up-opacity-animation")){
                animatedCount++;
            }
        }
        if(animatedCount === childrens.length){
            window.removeEventListener("scroll", listener);
        }
    }
    var listener = debounce(routine, 10, true);

    if(isOnTop)
        routine();
    else
        window.addEventListener("scroll", listener);

});
}

animate(".navbar--mobile", true, true);
animate(".navbar--desktop", true, true);

animate(".jumbotron__content", true, true);

animate(".about-us", true, false);
animate(".our-mission", true, false);
animate(".our-vision", true, false);

animate(".affiliation", true, false);

// animate(".directors", true, false);
animate(".directors", true, false);

animate(".director-details", true, false);
animate(".our-courses", true, false);

animate(".course-card", true, false);

animate(".gallery", true, false);
animate(".albums", true, false);

animate(".what-we-do__content", true, false);
animate(".service-tags", true, false);

animate(".our-work", true, false);
animate(".works", true, false);

animate(".work", true, false);
animate(".testimonials", true, false);
animate(".student-testimonial", true, false);

animate(".placements", true, false);
animate(".placements__stats", true, false);
animate(".placement-stat", true, false);
animate(".placement-companies", true, false);
animate(".domains", true, false);
animate(".domains__content", true, false);
animate(".domain-tags", true, false);

animate(".footer", true, false);
animate(".addresses", true, false);
animate(".query-form", true, false);
animate(".domain-tags", true, false);
animate(".maps", true, false);

var footerColCounter = 0;
document.querySelectorAll(".address > div").forEach(ele => {
    var footerColClass = `footer-col-${footerColCounter}`;
    ele.classList.add(footerColClass);
    animate("." + footerColClass,true, false);

    footerColCounter++;
})