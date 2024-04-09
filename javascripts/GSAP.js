

var slides = gsap.utils.toArray('.slide');
var InputArea = gsap.utils.toArray('.input');
var Now_slides = 0, slides_num = gsap.utils.toArray('.slide').lenth;
var PreviewArea = document.getElementById('preview');
var headerArea =document.getElementsByClassName('header')

const modeSwitch = document.getElementById("mode-switch");
modeSwitch.addEventListener("change", () => {

    if (modeSwitch.checked) {
        slides = gsap.utils.toArray('.slide');
        Now_slides = 0;
        slides_num = gsap.utils.toArray('.slide').length;

        gsap.set(slides, { opacity: 0, duration: 0.5 });
        gsap.set(slides, { height: 0, width: 0, duration: 0, autoAlpha: 0 });
        gsap.set(InputArea, { opacity: 0, duration: 0.5 });
        gsap.set(InputArea, { height: 0, width: 0, duration: 0, autoAlpha: 0 });
        gsap.set(slides[0], { height: 'auto', width: 'auto', duration: 0.5 });
        gsap.to(slides[0], { opacity: 1, x: '0%', autoAlpha: 1 });
        gsap.set(headerArea, { display: 'none' });
        PreviewArea.scroll({ top: 0 });
        PreviewArea.style.overflow = 'auto';
        document.documentElement.requestFullscreen(); // 將整個文件放大到全屏
    } else {
        gsap.set(slides, { height: 'auto', width: '100%'});
        gsap.set(slides, { opacity: 1, x: '0%', autoAlpha: 1 });
        gsap.set(InputArea, { height: 'auto', width: '100%'});
        gsap.set(InputArea, { opacity: 1, x: '0%', autoAlpha: 1 });
        gsap.set(headerArea, {display: '' });

        PreviewArea.style.overflow = 'auto';
        setTimeout(() => {
            document.exitFullscreen();
          }, 100);
    }
});

document.addEventListener('fullscreenchange', function(event) {
    if (!document.fullscreenElement) {
      var checkbox = document.getElementById('mode-switch');     
      checkbox.checked = false;
      gsap.set(slides, { height: 'auto', width: '100%', duration: 0.5 });
      gsap.set(slides, { opacity: 1, x: '0%', autoAlpha: 1 });
      gsap.set(InputArea, { height: 'auto', width: '100%', duration: 0.5 });
      gsap.set(InputArea, { opacity: 1, x: '0%', autoAlpha: 1 });
      gsap.set(headerArea, {display: '' });
      PreviewArea.style.overflow = 'auto';
    }
  });


  

lastButton.addEventListener("click", function () {
    if (Now_slides >= 1) {
        Now_slides = Now_slides - 1;
        showSlide(Now_slides);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        if (Now_slides >= 1) {
            Now_slides = Now_slides - 1;
            showSlide(Now_slides);
        }
    }
});

animateButton.addEventListener("click", function () {
    if (Now_slides < slides_num - 1) {
        Now_slides = Now_slides + 1;
        showSlide(Now_slides);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        if (Now_slides < slides_num - 1) {
            Now_slides = Now_slides + 1;
            showSlide(Now_slides);
        }
    }
});

function showSlide(index) {

    gsap.set(slides, { opacity: 0, autoAlpha: 0 });
    gsap.set(slides, { height: 0, width: 0 });
    gsap.set(slides[index], {
        height: 'auto', width: 'auto', autoAlpha: 1
    });

    var animationType = slides[index].classList[1];
    switch (animationType) {
        case '1':
            gsap.set(slides[index], { opacity: 0, x: '-100%' });
            gsap.to(slides[index], { duration: 0.5, x: '0%', opacity: 1 });
            break;
        case '2':
            gsap.set(slides[index], { opacity: 0, y: '-100%', x: '0%' });
            gsap.to(slides[index], { duration: 0.5, y: '0%', x: '0%', opacity: 1 });
            break;
        case '3':
            gsap.set(slides[index], { opacity: 0, y: '100%', x: '0%' });
            gsap.to(slides[index], { duration: 0.5, y: '0%', x: '0%', opacity: 1 });
            break;
        default:
            gsap.set(slides[index], { opacity: 0, x: '-100%' });
            gsap.to(slides[index], { duration: 0.5, x: '0%', opacity: 1 });

    }

}


