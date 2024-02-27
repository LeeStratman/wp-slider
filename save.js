/**
 * Save function for Slider block.
 */
import Slides from "./Slides";
import Navigation from "./Navigation";
import { getColorName, colors } from "./utils/colors";

/**
 * The save function defines the way in which the different attributes should be
 * combined in the final markup, which is then serialized into post_content.
 *
 * @param {object} props
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 */
export default function save(props) {
  const { attributes } = props;

  const {
    numSlides,
    autoplay,
    transitionStyle,
    slideDuration,
    slides,
    navType,
    navColor,
    navColorHover,
    navSize,
    navBorderSize,
    navBorderColor,
    navBorderColorHover,
  } = attributes;

  return (
    <section
      className="wp-block__swd-simple-slider"
      aria-roledescription="carousel"
      aria-label="Highlighted content"
    >
      <div
        className="swd-simple-slider__wrapper"
        style={{ overflow: "hidden" }}
      >
        <ul className="swd-simple-slider__slides" aria-live="off">
          {slides.map((slide, index) => {
            if (index < numSlides) {
              let active = 0 === index ? "active" : "";
              let ariaHidden = 0 === index ? "" : "true";
              return (
                <li
                  key={index}
                  className={`swd-simple-slider__slide ${active}`}
                  role="tabpanel"
                  aria-roledescription="slide"
                  aria-hidden={ariaHidden}
                  data-index={index}
                >
                  <a href={slide.link}>
                    {slide.mediaURL && (
                      <img
                        className="swd-simple-slider__image"
                        src={slide.mediaURL}
                      />
                    )}
                    {!slide.mediaURL && (
                      <div>{`Please choose an image for slide ${
                        index + 1
                      }`}</div>
                    )}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div
        className="swd-simple-slider__navigation"
        role="tablist"
        aria-label="Entertainment"
      >
        {slides.map((slide, index) => {
          if (index < numSlides) {
            let active = 0 === index ? "active" : "";
            let ariaSelected = 0 === index ? "true" : "false";
            let dataIndex = index + 1;
            let ariaControl = `slide-${dataIndex}-tab`;
            let hoverClass =
              navColorHover !== "" ? `has-${navColorHover}-hover-color` : "";
            let borderColorHoverClass =
              navBorderColorHover !== ""
                ? `has-${navBorderColorHover}-border-hover-color`
                : "";
            return (
              <button
                key={index.toString()}
                style={{
                  borderWidth: `${navBorderSize}px`,
                  borderColor: `${navBorderColor}`,
                  borderStyle: "solid",
                  backgroundColor: `${navColor}`,
                }}
                className={`swd-simple-slider__nav-button ${active} ${hoverClass} ${borderColorHoverClass}`}
                aria-selected={ariaSelected}
                aria-controls={ariaControl}
                data-index={dataIndex}
              ></button>
            );
          }
        })}
      </div>
    </section>
  );
}
