const preloaderContainer = document.getElementById("preloader"),
  backtop = document.getElementById("backtop"),
  swiper1 = document.querySelector(".swiper-container"),
  swiper2 = document.querySelector(".slider-container"),
  burger = document.querySelector(".burger"),
  close = document.querySelector(".menu__close"),
  menu = document.querySelector(".menu"),
  playButtonsFirst = document.querySelectorAll(".main-slider__play");

// preloader
function preloader(el) {
    el.style.opacity = 1;
    let interPreloader = setInterval(function () {
        el.style.opacity = el.style.opacity - 0.05;
        if (el.style.opacity <= 0.05) {
            clearInterval(interPreloader);
            preloaderContainer.style.display = "none";
        }
    }, 16);
}

window.onload = function () {
    setTimeout(function () {
        preloader(preloaderContainer);
    }, 1000);
};

// back to top
let scrollShow = () => {
  if (window.scrollY > 0) {
    backtop.classList.add("backtop-show");
  } else {
    backtop.classList.remove("backtop-show");
  }
};

window.addEventListener("scroll", scrollShow);

let scrollToTop = () => {
  let c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 10);
  }
};

backtop.onclick = function(e) {
  e.preventDefault();
  scrollToTop();
};

// menu
burger.addEventListener("click", () => {
  menu.classList.add("menu--open");
});

close.addEventListener("click", () => {
  menu.classList.remove("menu--open");
});

menu.addEventListener("click", () => {
  menu.classList.remove("menu--open");
});

// slider
let swiperSlider1 = new Swiper(swiper1, {
  centeredSlides: true,
  slidesPerView: 1,
  loop: true,
  spaceBetween: 10,
  fadeEffect: {
    crossFade: true,
  },
  effect: "fade",
  navigation: {
    nextEl: ".btn-right",
    prevEl: ".btn-left",
  },
});

// slider video pause
swiperSlider1.on("transitionEnd", function () {
  let videos = document.querySelectorAll(".first__slider video");
  videos.forEach((el) => {
    el.pause();
    el.currentTime = 0;
  });
  playButtonsFirst.forEach((el) => {
    el.style.display = "block";
  });
});

// slider video play/stop button
playButtonsFirst.forEach((el) => {
  el.addEventListener("click", (e) => {
    let video = e.currentTarget.closest(".main-slider__media").querySelector("video");
    if(video.paused) {
      video.play();
      e.currentTarget.classList.toggle("play");
      setTimeout(() => {
        video.volume = 0.5;
      }, 1000);
    } else {
      video.pause();
      e.currentTarget.classList.toggle("play");
    }
  });
});

// slider
let swiperSlider2 = new Swiper(swiper2, {
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 105,
});

// forms

// inputMask
let selector = document.querySelectorAll("input[type=tel]"),
  im = new Inputmask("+XX (XXX) XXX-XX-XX");
im.mask(selector);

// validate forms
let validateForms = function (selector, rules) {
  new window.JustValidate(selector, {
    rules: rules,
    submitHandler: function (form, values, ajax) {
      var formData = new FormData(form);

      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Отправлено!");
          } else {
          }
        }
      };

      // add any event handlers here
      xhr.open("POST", "mail.php", true);
      xhr.send(formData);

      form.reset();
    },
  });
};

validateForms(".newsletter__form", { email: { required: true, email: true }, tel: { required: true } });
validateForms(".subs-form", { email: { required: true, email: true } });


svg4everybody();
