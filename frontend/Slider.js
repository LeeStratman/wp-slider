import sliderSelectors from "./Selectors";
import Slide from "./Slide";
import PauseButton from "./PauseButton";
import NavLink from "./NavLink";

/**
 * Represents a slider.
 */
class Slider {
  constructor(domNode) {
    this.domNode = domNode;

    this.slides = [];

    this.firstSlide = null;
    this.lastSlide = null;
    this.currentSlide = null;

    this.slideLinks = null;

    this.sliderWrapper = null;

    this.playLabel = "Start automatic slide show";
    this.pauseLabel = "Stop automatic slide show";

    this.rotate = true;
    this.hasFocus = false;
    this.hasHover = false;
    this.isStopped = false;

    // TODO: Get from data attribute.
    this.timeInterval = 5000;

    this.sliderWidth = null;
    this.imageDimensions = null;
  }

  /**
   * Initialize the slider.
   */
  init() {
    /**
     * Event listeners.
     */
    // window.addEventListener("resize", this.updateSliderHeight.bind(this));
    // this.domNode.addEventListener("mouseover", this.handleMouseOver.bind(this));
    // this.domNode.addEventListener("mouseout", this.handleMouseOut.bind(this));
    window.addEventListener("resize", this.setSlideWrapperWidth.bind(this));

    /**
     * Variables.
     */
    this.slidesWrapper = this.domNode.querySelector(sliderSelectors.slides);
    this.sliderWrapper = this.domNode.querySelector(sliderSelectors.wrapper);
    this.sliderNavigation = this.domNode.querySelector(
      sliderSelectors.navigation
    );
    this.slideLinks = this.domNode.querySelectorAll(sliderSelectors.link);

    /**
     * For infinite scrolling.
     */
    this.insertClone();

    this.slidesInit();
    // this.pauseButton = this.domNode.querySelector(sliderSelectors.pauseButton);
    // this.showPauseButton();
    // this.pauseButtonInit();
    this.navigationInit();
    this.startRotation();

    // Set width of slides wrapper.
    // TODO: This needs to be called as screen is resized.
    this.setSlideWrapperWidth();
  }

  /**
   * Start Rotation.
   */
  startRotation() {
    setTimeout(this.rotateSlides.bind(this), this.timeInterval);
  }

  /**
   * Pause Button Init.
   */
  pauseButtonInit() {
    const button = new PauseButton(this.pauseButton, this);
    button.init();
  }

  /**
   * Set Width of Slide Wrapper.
   */
  setSlideWrapperWidth() {
    this.sliderWidth = this.sliderWrapper.offsetWidth;
    this.totalSlideWidth = this.sliderWidth * this.slides.length;
    this.slidesWrapper.style.width = this.totalSlideWidth + "px";

    let index = this.currentSlide
      ? Number(this.currentSlide.domNode.dataset.index)
      : 0;

    this.setSlidePosition(index);
  }

  /**
   * Initialize Navigation.
   */
  navigationInit() {
    let navLinks = Array.from(this.slideLinks);
    navLinks.forEach((link, index) => {
      let navLink = new NavLink(link, this);
      navLink.init();
    });
  }

  /**
   * Show pause button.
   */
  showPauseButton() {
    this.pauseButton.classList.add("pause");
    this.pauseButton.setAttribute("aria-label", this.pauseLabel);
  }

  /**
   * Initialize all slides.
   */
  slidesInit() {
    const slides = this.domNode.querySelectorAll(sliderSelectors.slide);

    for (let i = 0; i < slides.length; i++) {
      let slide = new Slide(slides[i], this);
      slide.init();

      this.slides.push(slide);

      if (!this.firstSlide) {
        this.firstSlide = slide;
        this.currentSlide = slide;
        this.firstSlide.show();
        this.currentDomNode = slide.domNode;
      }

      this.lastSlide = slide;

      const imageLinks = slides[i].querySelectorAll(sliderSelectors.imageLink);

      if (imageLinks && imageLinks[0]) {
        imageLinks[0].addEventListener(
          "focus",
          this.handleImageLinkFocus.bind(this)
        );
        imageLinks[0].addEventListener(
          "blur",
          this.handleImageLinkBlur.bind(this)
        );
      }
    }
  }

  insertClone() {
    let firstSlide = this.slidesWrapper.firstChild;

    if (firstSlide) {
      let cloneSlide = firstSlide.cloneNode(true);
      cloneSlide.classList.add("swd-simple-slider__slide-clone");
      this.slidesWrapper.appendChild(cloneSlide);
    }
  }

  handleImageLinkFocus() {
    this.slidesWrapper.classList.add("focus");
  }

  handleImageLinkBlur() {
    this.slidesWrapper.classList.remove("focus");
  }

  handleMouseOver(event) {
    if (!this.pauseButton.contains(event.target)) {
      this.hasHover = true;
    }
    this.updateRotation();
  }

  handleMouseOut() {
    this.hasHover = false;
    this.updateRotation();
  }

  updateRotation() {
    if (!this.hasHover && !this.hasFocus && !this.isStopped) {
      this.rotate = true;
      this.slidesWrapper.setAttribute("aria-live", "off");
    } else {
      this.rotate = false;
      this.slidesWrapper.setAttribute("aria-live", "polite");
    }

    if (this.isStopped) {
      // this.pauseButton.setAttribute("aria-label", this.playLabel);
      // this.pauseButton.classList.remove("pause");
      // this.pauseButton.classList.add("play");
    } else {
      // this.pauseButton.setAttribute("aria-label", this.pauseLabel);
      // this.pauseButton.classList.remove("play");
      // this.pauseButton.classList.add("pause");
    }
  }

  toggleRotation() {
    if (this.isStopped) {
      if (!this.hasHover && !this.hasFocus) {
        this.isStopped = false;
      }
    } else {
      this.isStopped = true;
    }

    this.updateRotation();
  }

  rotateSlides() {
    if (this.rotate) {
      this.setSelectedToNextItem();
    }
    setTimeout(this.rotateSlides.bind(this), this.timeInterval);
    setTimeout(this.transitionSlides.bind(this), 500);
  }

  transitionSlides() {
    this.slidesWrapper.style.transition = `none`;

    // TODDDDDOO
    if (this.currentSlide === this.lastSlide) {
      this.setSelectedToNextItem();
    }
  }

  setSelectedToNextItem() {
    let index;

    if (this.currentSlide === this.lastSlide) {
      this.setSelected(this.firstSlide);
      this.setSlidePosition(0, true);
    } else {
      index = this.slides.indexOf(this.currentSlide);
      this.setSelected(this.slides[index + 1]);
      this.setSlidePosition(index + 1);
    }
  }

  /**
   * Transform: translate3d to current slide.
   *
   * TODO: This needs to be called when navigation updates.
   */
  setSlidePosition(index, reset = false) {
    this.slidesWrapper.style.transform = `translate3d( ${
      this.sliderWidth * index * -1
    }px, 0px, 0px)`;

    if (!reset) {
      this.slidesWrapper.style.transition = `transform 500ms ease 0s`;
    }
  }

  setSelected(slide, moveFocus = false) {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].hide();
    }

    this.currentSlide = slide;
    this.currentSlide.show();

    if (moveFocus) {
      this.currentSlide.domNode.focus();
    }
  }
}

export default Slider;
