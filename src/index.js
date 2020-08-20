/**
 * Navbar
 */
const hamburger = document.querySelector(".navbar__mobile__hamburger");
const popupNavbar = document.querySelector(".popup__nav")
const arrow = document.querySelector(".arrow");
const mascotDots = document.querySelectorAll(".mascot--dot");

const navLinksMobile = document.querySelectorAll(".nav__item");
const navLinksDesktop = document.querySelectorAll(".desktop__navbar__item");
const successModal = document.querySelector(".success-modal");
const loader = document.querySelector(".loader");
const plane = document.querySelector(".query-form__send .plane__image");

const scriptURL = "https://script.google.com/macros/s/AKfycbxZ69CX7pcSPEZnCA9VQl5Paju8CQNnAGSSFmZ9m36KOooof-g/exec";
const carouselTint = document.querySelector(".carousel__tint");

const albumModal = document.querySelector(".album__modal");
const albumModalImage = document.querySelector(".album__modal__image");

window.initMap = () => {
    var amravati = {
        lat: 20.926655,
        lng: 77.765475
    }
    let amravatiMap = new google.maps.Map(document.getElementById("address-1-map"), {
        zoom: 15,
        center: amravati
        // styles: mapStyle,
    });
    let amravatiMarker = new google.maps.Marker({
        position: amravati,
        map: amravatiMap,
        // title: 'Hello World!'
      });

    let aurangabad = {
        lat: 19.870711,
        lng: 75.351695
    }
    let aurangabadMap = new google.maps.Map(document.getElementById("address-2-map"), {
        zoom: 15,
        center: aurangabad
        // styles: mapStyle,
    });
    let aurangabadMarker = new google.maps.Marker({
        position: aurangabad,
        map: aurangabadMap,
        // title: 'Hello World!'
      });
    
    let amravatiMapDiv = document.getElementById("address-1-map");
    amravatiMapDiv.addEventListener("click", () => {
        open("https://www.google.com/maps/dir//Geotech+Institute,Amravati,+Vivekanand+Colony,+Amravati,+Maharashtra+444606/@20.9256377,77.7650176,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bd6a5c5cefe8967:0x60387e8356412bee!2m2!1d77.7644032!2d20.9274757")
    })

      
    let aurangabadMapDiv = document.getElementById("address-2-map");
    aurangabadMapDiv.addEventListener("click", () => {
        open("https://www.google.com/maps/place/GEOTECH+GIS+TRAINING+INSTITUTE+%26+CONSULTANCY+SERVICES/@19.8565378,75.3275504,14z/data=!4m8!1m2!2m1!1sgeotech+aurangabad!3m4!1s0x3bdba28573cf75d9:0x7843af0d952ff903!8m2!3d19.8704288!4d75.3517273")
    })
}

window.addEventListener('load', () => {
    new SmoothScroll('a[href*="#"]', {offset: 84})
});

const togglePopupNavbar = () => {
    popupNavbar.classList.toggle("show-popup__nav");
    for(let i=1;i<mascotDots.length;i++){
        mascotDots[i].style.animationDelay =String(Number(i*100)) + "ms";
        mascotDots[i].classList.add("roll-mascot__nav");
    }
}

const closePopupNavbar = () => {
    for(let i=1;i<mascotDots.length;i++){
        mascotDots[i].classList.remove("roll-mascot__nav");
    }
    popupNavbar.classList.toggle("show-popup__nav");
}

hamburger.addEventListener('click', togglePopupNavbar);
arrow.addEventListener('click', closePopupNavbar);

/* Links Handler */

const linkHandler = (navLink) => {
    navLink.addEventListener("click", () => {
        const scrollTo = document.querySelector(navLink.dataset.href);
        let scroll = new SmoothScroll();
        if(scrollTo){
            scroll.animateScroll(scrollTo);
            if(navLink.classList.contains("nav__item")){
                togglePopupNavbar();
            }
            if(navLink.classList.contains("desktop__navbar__item")){
                const extended__items = document.querySelectorAll(".extended__items");
                    extended__items.forEach(extended__item => {
                        extended__item.style.display = "none";
                    })
            }
        }
    })
}

navLinksMobile.forEach(navLink => linkHandler(navLink));
navLinksDesktop.forEach(navLink => linkHandler(navLink));

const applyButtonBasic = document.querySelector(".course__apply--basic")
const applyButtonAdvanced = document.querySelector(".course__apply--advanced")
const applyButtonDiploma = document.querySelector(".course__apply--diploma")
const sendQueryButton = document.getElementById("popup__nav__queryBtn")

const applyHandler = () => {
    document.getElementById("footer").scrollIntoView();
}

applyButtonBasic.addEventListener("click", applyHandler);
applyButtonAdvanced.addEventListener("click", applyHandler);
applyButtonDiploma.addEventListener("click", applyHandler);
sendQueryButton.addEventListener('click', () => {
    togglePopupNavbar();
    applyHandler()
})


/**
 * Query Form
 */
const patterns = {
    email: /^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,
    mobile: /^[0-9]{10}$/,
    name: /^[a-zA-Z ]+$/,
    query: /^[a-zA-Z0-9]+$/
};

const submitFormHandler = (e) => {
    e.preventDefault();
    const name = document.querySelector("#name");
    const emailOrPhone = document.querySelector("#contact");
    const query = document.querySelector("#query");
    const formErrorMessage = document.querySelector(".query-form__error__message");
    let formValid = true;
    let isPhone = true;
    let isEmail = true;

    if(!RegExp(patterns.name).test(name.value)){
        formValid = false;
    }
    if(!RegExp(patterns.email).test(emailOrPhone.value)){
        isEmail = false;
    }
    if(!RegExp(patterns.mobile).test(emailOrPhone.value)){
        isPhone = false;
    }
    if((isEmail == false && isPhone == false)){
        formValid = false;
    }
    if(!RegExp(patterns.query).test(query.value)){
        formValid = false;
    }

    if(formValid){
        const data = {
            name: name.value,
            mobile: isPhone ? emailOrPhone.value : "-",
            email: isEmail ? emailOrPhone.value : "-",
            query: query.value,
            date: new Date().toISOString()
        }
        formErrorMessage.classList.remove("show");
        // Send data to sheet
        e.preventDefault();
        loader.style.display = "block";
        plane.style.opacity = 0;
        document.querySelector("#date").value = new Date().toUTCString()
        const formo = document.forms['query-form']
        fetch(
            scriptURL, 
            { method: 'POST', body: new FormData(formo)}
        )
        .then(response => {
            name.value = '';
            emailOrPhone.value = '';
            query.value = '';
            successModal.style.display = "block";
            successModal.classList.add("slide-up-opacity-animation-modal");
            setTimeout(() => {
                successModal.style.display = "none";
            }, 1000)
            loader.style.display = "none";
            plane.style.opacity = 1;
        })
        .catch(error => {
                formErrorMessage.textContent = "Please try again later";
                formErrorMessage.classList.add("show");
                loader.style.display = "none";
                plane.style.opacity = 1;
        })
    } else {
        successModal.style.display = "none";
        formErrorMessage.textContent = "Please enter valid information";
        formErrorMessage.classList.add("show");
        successModal.classList.remove("slide-up-opacity-animation-modal");
        loader.style.display = "none";
    }
    
}

const queryForm = document.querySelector(".query-form");
queryForm.addEventListener('submit', submitFormHandler.bind(this));

const desktop__navbar__items = document.querySelectorAll(".desktop__navbar__item");
desktop__navbar__items.forEach(desktop__navbar__item => 
    desktop__navbar__item.addEventListener("mouseover", () => {
        const extendedItems = desktop__navbar__item.querySelector(".extended__items");
        if(extendedItems){
            extendedItems.style.display = "flex";
        }
}));

const main = document.querySelector("main");
main.addEventListener("mouseover", () => {
    const extended__items = document.querySelectorAll(".extended__items");
    extended__items.forEach(extended__item => {
        extended__item.style.display = "none";
    })
})

/* Gallery */

let carouselInterval ;
const carouselHandler = (albumName, albumSize) => {
    if(window.i != albumSize-1){
        const str = `/assets/images/albums/${albumName}/${window.i++}.webp`;
        albumModalImage.setAttribute("src", str);
    } else {
        const str = `/assets/images/albums/${albumName}/thumbnail.webp`;
        clearInterval(carouselInterval);
        albumModalImage.setAttribute("src",str);
        albumModal.style.display = "none";
        carouselTint.style.display = "none";
    }
}

const albumHandler = (album) => {
    clearInterval(carouselInterval)
    carouselTint.style.display = "block";
    const albumName = album.dataset.album;
    const albumSize = album.dataset.size;
    window.i=1;
    carouselInterval = setInterval(
        carouselHandler.bind(null, albumName, albumSize), 
        2000);
    const str = `/assets/images/albums/${albumName}/thumbnail.webp`;
    albumModalImage.setAttribute("src", str);
    albumModal.style.display = "flex";
}
const albums = document.querySelectorAll(".album");

albums.forEach(album => {
    album.addEventListener("click", albumHandler.bind(this, album));
});

// close carousel
carouselTint.addEventListener('click', () => {
    if(albumModal.style.display === "flex"){
        albumModal.style.display = "none";
        carouselTint.style.display = "none";
    }
    clearInterval(carouselInterval)
})