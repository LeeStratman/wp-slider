/**
 * Represents the pause button.
 */
class PauseButton {
  constructor(domNode, slider) {
    this.domNode = domNode;
    this.slider = slider;
  }

  init() {
    this.domNode.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick() {
    this.slider.toggleRotation();
  }
}

export default PauseButton;
