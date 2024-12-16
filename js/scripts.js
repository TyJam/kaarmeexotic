
var slideIndex = 1;

var myTimer;
var myTimerTwo;
var slideshowContainer;

window.addEventListener("load",function() {
    showSlides(slideIndex);
    myTimer = setInterval(function(){plusSlides(1)}, 4000);
    //myTimerTwo = setInterval(function(){carousel()}, 4000);
  
    //COMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    slideshowContainer = document.getElementsByClassName('slideshow-inner')[0];
  
    //UNCOMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    // slideshowContainer = document.getElementsByClassName('slideshow-container')[0];
  
   // slideshowContainer.addEventListener('mouseenter', pause)
    //slideshowContainer.addEventListener('mouseleave', resume)
})

// NEXT AND PREVIOUS CONTROL
function plusSlides(n){
  clearInterval(myTimer);
  if (n < 0){
    showSlides(slideIndex -= 1);
  } else {
   showSlides(slideIndex += 1); 
  }
  
  //COMMENT OUT THE LINES BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
  
  if (n === -1){
    myTimer = setInterval(function(){plusSlides(n + 2)}, 4000);
  } else {
    myTimer = setInterval(function(){plusSlides(n + 1)}, 4000);
  }
}

//Controls the current slide and resets interval if needed
function currentSlide(n){
  clearInterval(myTimer);
  myTimer = setInterval(function(){plusSlides(n + 1)}, 4000);
  showSlides(slideIndex = n);
}

function showSlides(n){
  var i;
  const slides = document.querySelectorAll('.slides');
  //var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  /*for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }*/
  slides[slideIndex-1].style.display = "flex";
  //dots[slideIndex-1].className += " active";
}

pause = () => {
  clearInterval(myTimer);
}

resume = () =>{
  clearInterval(myTimer);
  myTimer = setInterval(function(){plusSlides(slideIndex)}, 4000);
}


let gallery = document.querySelectorAll('.image-gallery');
let wrapper = document.querySelector('.gallery-holder');

function animateAsync(element, keyframes, options){
  return new Promise(res => {
    const anim = element.animate(keyframes, options);
  
    //anim.onfinise = res; ,<- not supported on Safari 
    setTimeout(res, options.duration || 0);
  })
}

function createImageSlider(gallery, { currentSlideIndex =0, duration= 750, easing = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)', slideShowInterval =4000}={} ){
  const fill = 'forwards';
  let animating = false;
  let timer = null;

  gallery.forEach((slide, idx) =>{
    const activeCls = idx === currentSlideIndex ? 'active': '';
    slide.className = `slide ${activeCls}`;

})
    function autoSlide(){
      timer = setTimeout( () => slideTo( currentSlideIndex === gallery.length - 1 ? 0: currentSlideIndex + 1), slideShowInterval);
    }
   
    function slideTo(index){
      if(index === currentSlideIndex || animating){
        return;
      }
         animating  = true;
   clearTimeout(timer);
     const currentSlide = wrapper.children[currentSlideIndex];

    
     const nextSlide = wrapper.children[index];
     const pos = index > currentSlideIndex ? '-100%' : '100%';

     
   
     Promise.all([
      animateAsync(nextSlide, [
        {transform: `translate(${parseInt(pos, 10) * -1}%, 0)`},
        {transform: 'translate(0, 0)'}
      ], {duration, fill, easing}),
      animateAsync(currentSlide, [
        {transform: 'translate(0, 0)'},
        {transform: `translate(${pos}, 0)`}
      ], {duration, fill, easing})
    ]).then(() => {
      currentSlideIndex = index;
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
      animating = false;
      
      autoSlide();
    });
  
  }
   autoSlide();

 
  
}  

createImageSlider( gallery);

function init(){
  var lightboxElements = `
  <div id='lightbox'>
    <div id=overlay class='hidden'></div>
    <img class='hidden' id='big-image'/>
  
  </div>
  `;
  document.querySelector("body").innerHTML += lightboxElements;
  prepareThumbs();
 }

 function toggle(){
  window.console.log("show or hide a big image");
 }

 function prepareThumbs(){
   const liElements = document.querySelectorAll("ul#images li");
   let i = 0;
   let image, li;
   //loop throught all <li> elements </li>
   while(i < liElements.length){
     li = liElements[i];
     //set class='lighbox'
     li.setAttribute("class", "lightbox");
     image = li.querySelector("img");
     //register a click event handler for the <img> element 
     image.addEventListener("click", toggle, false);
     i += 1;

   }
 }

 function toggle(){
  let clickedImage = event.target;
  let bigImage = document.querySelector("#big-image");
  let overlay = document.querySelector("#overlay");
  bigImage.src = clickedImage.src;
  if(overly.getAttribute("class") === "hidden"){
    overlay.setAttribute("class", "showing");
    bigImage.setAttribute("class", "showing");
  }else{
    overlay.setAttribute("class", "showing");
    bigImage.setAttribute("class", "hidden");
  }
 }

  document.addEventListener("DOMContentLoaded", init, false);