/**
 * Represents a slide component.
 */

function Slide({ active, ariaHidden, url, mediaURL, index }) {
  return (
    <li
      className={`swd-simple-slider__slide ${active}`}
      role="tabpanel"
      aria-roledescription="slide"
      aria-hidden={ariaHidden}
      data-index={index}
    >
      {mediaURL && <img className="swd-simple-slider__image" src={mediaURL} />}
      {!mediaURL && <div>{`Please choose an image for slide ${index}`}</div>}
    </li>
  );
}

export default Slide;
