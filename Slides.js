/**
 * Represents all slides.
 */

import Slide from "./Slide";

function Slides({ slides, numSlides }) {
  return slides.map((slide, index) => {
    if (index < numSlides) {
      let active = 0 === index ? "active" : "";
      let ariaHidden = 0 === index ? "" : "true";
      return (
        <Slide
          index={index}
          key={index.toString()}
          active={active}
          ariaHidden={ariaHidden}
          mediaURL={slide.mediaURL}
          url={slide.link}
        />
      );
    }
  });
}

export default Slides;
