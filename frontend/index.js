import Slider from "./Slider";

slidersInit();

function slidersInit() {
  var sliders = document.querySelectorAll(".wp-block__swd-simple-slider");

  for (var i = 0; i < sliders.length; i++) {
    var slider = new Slider(sliders[i]);
    slider.init();
  }
}

export default slidersInit;
