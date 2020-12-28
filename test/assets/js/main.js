(function ($) {
  var navbar = $(".navbar");
  var lastScrollTop = 0;

  $(window).scroll(function () {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
      navbar
        .removeClass("navbar-light bg-transparent")
        .addClass("navbar-dark bg-custom");
    }
    // Scroll up but still lower than 200 (change that to whatever suits your need)
    else if (st < lastScrollTop && st > 200) {
      navbar
        .removeClass("navbar-light bg-transparent")
        .addClass("navbar-dark bg-custom");
    }
    // Reached top
    else {
      navbar
        .removeClass("navbar-dark bg-custom")
        .addClass("navbar-light bg-transparent");
    }
    lastScrollTop = st;
  });

  $(".navbar-toggler").on("click", () => {
    $(".animated-icon2").toggleClass("open");
  });

  //---------- lazy loading image
  document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages;

    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy-image");
      var imageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.src = image.dataset.src;
            image.classList.remove("lazy-image");
            imageObserver.unobserve(image);
          }
        });
      });

      lazyloadImages.forEach(function (image) {
        imageObserver.observe(image);
      });
    } else {
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy-image");

      function lazyload() {
        if (lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function (img) {
            if (img.offsetTop < window.innerHeight + scrollTop) {
              img.src = img.dataset.src;
              img.classList.remove("lazy-image");
            }
          });
          if (lazyloadImages.length == 0) {
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }

      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
  });

  // ----------- end lazy loading image

  // ----------counter
  $.fn.counter = function (f = 'f') {
    const $this = $(this),
      numberFrom = parseInt($this.attr('data-from')),
      numberTo = parseInt($this.attr('data-to')),
      delta = numberTo - numberFrom,
      deltaPositive = delta > 0 ? 1 : 0,
      time = parseInt($this.attr('data-time')),
      changeTime = 10;

    let currentNumber = numberFrom,
      value = delta * changeTime / time;
    var interval1;
    const changeNumber = () => {
      currentNumber += value;
      if ((deltaPositive && currentNumber >= numberTo) || (!deltaPositive && currentNumber <= numberTo)) {
        this.text(numberTo);
        clearInterval(interval1);
      }
      else {
        if (f == 'f') {
          this.text(currentNumber.toFixed(1));
        }
        if (f == 'i') {
          this.text(parseInt(currentNumber));
        }
      }
    }

    interval1 = setInterval(changeNumber, changeTime);
  }
  // ----------counter
  $('.count2').counter();
  $('.count3').counter();
  $('.count4').counter();

  $('#blog-carousel').owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsiveClass: true,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 4,
        nav: false
      },
    }
  });
  $('#about-us-carousel').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    margin: 50,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2
      }
    }
  });
})(jQuery);
