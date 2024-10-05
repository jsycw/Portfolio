ScrollReveal({ 
    reset: false,
    distance: '80px',
    duration: 3800,
    delay: 200
});

ScrollReveal().reveal('.home-content, .about-content, .experience-content, .projects-content, .credits', { origin: 'bottom' });
ScrollReveal().reveal('.about-list, .projects-box', { origin: 'bottom' });


let angle = 0;
let angleVel = 0.01; 
let minAngle = 0.15; 
let maxAngle = 1.58; 

function setup() {
    let canvas = createCanvas(300, 250); 
    canvas.parent('fractal-tree'); 
}

function draw() {
    clear();
    angle += angleVel; 
    angle = angle % TWO_PI;
    stroke(255,255,255);
    strokeWeight(1);
    translate(width * 0.5, height);
    scale(0.8);
    branch(100);
}

function branch(len) {
    line(0, 0, 0, -len);
    translate(0, -len);
    if (len > 4) {
        push();
        let rotationAngle = map(sin(angle), -1, 1, minAngle, maxAngle);
        rotate(rotationAngle); 
        branch(len * 0.67);
        pop();
        push();
        rotate(-rotationAngle); 
        branch(len * 0.67);
        pop();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const fullText = "Hi, Jessy here."; 
    let index = 0;
    const typingSpeed = 290; 
    const typingElement = document.getElementById("typing-text");

    function type() {
        if (index < 4) {
            typingElement.innerHTML += fullText.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else if (index >= 4 && index < 9) {
            typingElement.innerHTML += `<span>${fullText.charAt(index)}</span>`;
            index++;
            setTimeout(type, typingSpeed);
        } else if (index >= 9 && index < fullText.length) {
            typingElement.innerHTML += fullText.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            document.querySelector(".cursor").classList.add("done-typing");
        }
    }
    type(); 
});

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tabs-header div');
    const contents = document.querySelectorAll('.tab-content > div');
    const indicator = document.querySelector('.tab-indicator');
  
    tabs[0].classList.add('active', 'clicked');
    contents[0].classList.add('active');
    indicator.style.transform = `translateY(${tabs[0].offsetTop}px)`;
  
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach(tab => {
          tab.classList.remove('active');
          tab.classList.remove('clicked');
        });
  
        tab.classList.add('active', 'clicked');
  
        contents.forEach(content => content.classList.remove('active'));
        contents[index].classList.add('active');
  
        indicator.style.transform = `translateY(${tab.offsetTop}px)`;
      });
    });
  });

  let slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel");
    let lines = document.getElementsByClassName("line");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < lines.length; i++) {
      lines[i].className = lines[i].className.replace("active", "");
    }
    slides[slideIndex-1].style.display = "block";
    lines[slideIndex-1].className += " active";
  }
  