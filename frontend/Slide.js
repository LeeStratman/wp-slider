/**
 * Represents a single slide.
 */
class Slide {
  constructor(domNode, slider) {
    this.domNode = domNode;
    this.slider = slider;
  }

  init() {
    this.domNode.addEventListener("focusin", this.handleFocusIn.bind(this));
    this.domNode.addEventListener("focusout", this.handleFocusOut.bind(this));
  }

  handleFocusIn() {
    this.domNode.classList.add("focus");
    this.slider.hasFocus = true;
    this.slider.updateRotation();
  }

  handleFocusOut() {
    this.domNode.classList.remove("focus");
    this.slider.hasFocus = false;
    this.slider.updateRotation();
  }

  show() {
    this.domNode.classList.add("active");
    this.domNode.removeAttribute("aria-hidden");
  }

  hide() {
    this.domNode.classList.remove("active");
    this.domNode.setAttribute("aria-hidden", "true");
  }
}

export default Slide;
