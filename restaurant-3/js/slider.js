var slideIndex = 1;
showSlides(slideIndex);
var flag = false;
var timeOut;

function requestInfo() {
  var json;
  var xhr = new XMLHttpRequest();
  //xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    //alert("Hello");
    if (xhr.readyState === 4 && xhr.status === 200) {
      json = JSON.parse(xhr.responseText);
      console.log(json);
      var array = json["images"];
      var pageTitle = json["pageMetaTitle"];
      var pageColor = json["pageBackgroundColor"];
      //console.log(array);
      document["img1"].src = array[0];
      document["img2"].src = array[1];
      document["img3"].src = array[2];
      document.title = pageTitle;
      document.body.style.backgroundColor = pageColor;
      //alert("hello");
    }
  };
  xhr.send("");
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  flag = true;
  showSlides((slideIndex = n));
  flag = false;
  clearTimeout(timeOut);
  showSlides(slideIndex);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  if (!flag) {
    timeOut = setTimeout(showSlides.bind(this, ++slideIndex), 4000);
    flag = false;
  }
}

window.onload = requestInfo;
