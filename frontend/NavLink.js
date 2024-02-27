import sliderSelectors from "./Selectors";

/**
 * Represents a slider link.
 */
class NavLink {
  constructor(domNode, slider) {
    this.domNode = domNode;
    this.slider = slider;
  }

  init() {
    this.domNode.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick(event) {
    const { target } = event;
    if (target.matches(sliderSelectors.link)) {
      event.preventDefault();
      let targetIndex = target.dataset.index;
      if (!targetIndex) {
        targetIndex = 1;
      }

      this.changeSlide(targetIndex, false);
    }
  }

  changeSlide(index, setFocus) {
    setFocus = setFocus || true;

    const { slideLinks, slides } = this.slider;

    for (let i = 0; i < slideLinks.length; i++) {
      slideLinks[i].setAttribute("tabIndex", "-1");
      slideLinks[i].setAttribute("aria-selected", "false");
      slideLinks[i].classList.remove("active");
    }

    slideLinks[index - 1].removeAttribute("tabIndex");
    slideLinks[index - 1].setAttribute("aria-selected", "true");
    slideLinks[index - 1].classList.add("active");
    this.slider.setSelected(slides[index - 1]);
    this.slider.setSlidePosition(index - 1);
  }
}

export default NavLink;
