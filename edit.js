/**
 * Edit function for Slider block.
 */

/**
 * Block dependencies.
 */
import Slides from "./Slides";
import Navigation from "./Navigation";
import { getColorName, colors } from "./utils/colors";
import LiveRegion from "./LiveRegion";

/**
 * WordPress libraries.
 */
const { __ } = wp.i18n;
const {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  URLInput,
} = wp.blockEditor;
const {
  PanelBody,
  Button,
  RangeControl,
  ToggleControl,
  SelectControl,
  ResponsiveWrapper,
  ColorPalette,
  ColorIndicator,
  BaseControl,
} = wp.components;

/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 * @param {object} props
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 */
export default function edit(props) {
  const { attributes, className, setAttributes } = props;

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

  const [rotate, setRotate] = React.useState(() => {
    return true;
  });

  const [activeSlide, setActiveSlide] = React.useState(() => {
    return { current: 1, previous: null };
  });

  /**
   * Used to reference elements within
   * this particular slider.
   */
  const slider = React.useRef();

  /**
   * Wraps arounds the slide track.
   */
  const slideList = React.useRef();

  /**
   * All of the slides. Wraps around all the slides.
   */
  const slideTrack = React.useRef();

  /**
   * Set the width of the slide track to include
   * all current slides.
   */
  React.useLayoutEffect(() => {
    removeClones();
    insertClone();
    slideTrack.current.style.width = `${
      slideList.current.offsetWidth * (numSlides + 1)
    }px`;
  }, [numSlides, slides]);

  /**
   * Active slide has changed, so update the DOM.
   */
  React.useLayoutEffect(() => {
    setSlide(activeSlide.current - 1);
  }, [activeSlide]);

  /**
   * Sets the interval to update current slide.
   */
  React.useEffect(() => {
    const timer = rotateTimer();

    return () => {
      clearTimeout(timer);
    };
  }, [rotate, slideDuration, activeSlide, numSlides]);

  function rotateTimer() {
    return setTimeout(rotateSlides, slideDuration * 1000);
  }

  React.useEffect(() => {
    // SetTimeout
    const timer = transitionTimer();
    const slideTrackCurrent = slideTrack.current;

    return () => {
      clearTimeout(timer);
    };
  }, [activeSlide]);

  function transitionTimer() {
    return setTimeout(transitionSlides, 2000);
  }

  function transitionSlides() {
    slideTrack.current.style.transition = `none`;

    // Not taking current values into account. Only values when it was called.
    if (activeSlide.previous === numSlides && activeSlide.current == 1) {
      reset();
    }
  }

  /**
   * Rotates to next slide.
   */
  function rotateSlides() {
    if (rotate) {
      if (activeSlide.current === numSlides) {
        setActiveSlide({ current: 1, previous: numSlides });
      } else {
        setActiveSlide({
          current: activeSlide.current + 1,
          previous: activeSlide.current,
        });
      }
    }
  }

  function goToSlide(current, previous = null) {
    setActiveSlide({ current, previous });
  }

  function setSlide(slideIndex) {
    /**
     * Get all slides.
     */
    let slides = slideTrack.current.children;

    if (slides) {
      slides = Array.from(slides);
      let nextSlide = slides[0];

      slides.forEach((slide, index) => {
        if (index === slideIndex) {
          nextSlide = slide;
        }
        slide.classList.remove("active");
        slide.setAttribute("aria-hidden", "true");
      });
      if (nextSlide) {
        nextSlide.classList.add("active");
        nextSlide.removeAttribute("aria-hidden");
      }

      // Set timeout for transition.  Check for clone, if clone change quickly to 1.
      setPosition(slideIndex);
    }
  }

  function setPosition(slideIndex) {
    let position = 0;

    if (activeSlide.previous === numSlides) {
      position = -activeSlide.previous * slideList.current.offsetWidth;
    } else {
      position = -slideIndex * slideList.current.offsetWidth;
    }

    slideTrack.current.style.transform = `translate3d(${position}px, 0px, 0px)`;
    slideTrack.current.style.transition = `transform 2000ms ease 0s`;
  }

  function reset() {
    // GO TO SLIDE 1.
    slideTrack.current.style.transform = `translate3d(0px, 0px, 0px)`;
  }

  const updateSlideCount = (value) => {
    setAttributes({ numSlides: value });
  };

  function calculateSlidesWidth(numSlides) {
    return slideList.current.offsetWidth * numSlides;
  }

  function pauseSlides() {
    setRotate((previousRotate) => !previousRotate);
  }

  function removeClones() {
    let clones = slideTrack.current.querySelectorAll(
      ".swd-simple-slider__slide-clone"
    );

    if (clones) {
      clones.forEach((clone) => {
        clone.remove();
      });
    }
  }

  function insertClone() {
    // Get slide track.
    // Get first slide.
    let firstSlide = slideTrack.current.firstChild;

    if (firstSlide) {
      let cloneSlide = firstSlide.cloneNode(true);
      cloneSlide.classList.add("swd-simple-slider__slide-clone");
      slideTrack.current.appendChild(cloneSlide);
    }
  }

  /**
   * Copies the slides array.
   */
  const copySlides = () => {
    return slides.map((slide) => {
      return Object.assign({}, slide);
    });
  };

  const insertSlide = (slide, index = false) => {
    let slides = copySlides();
    // TODO: Check if index exists.
    // TODO: Check if required keys exist.

    slides[index] = { ...slides[index], ...slide };

    setAttributes({ slides: slides });
  };

  const insertMedia = (media, index) => {
    // TODO: Check if media has correct values.

    let url = media.sizes["astra-child-slider"]
      ? media.sizes["astra-child-slider"].url
      : media.sizes.full.url;

    let width = media.sizes["astra-child-slider"]
      ? media.sizes["astra-child-slider"].width
      : media.sizes.full.width;

    let height = media.sizes["astra-child-slider"]
      ? media.sizes["astra-child-slider"].height
      : media.sizes.full.height;

    let slide = {
      mediaID: media.id,
      mediaURL: url,
      mediaHeight: height,
      mediaWidth: width,
    };

    // TODO: Check if index makes sense.
    insertSlide(slide, index);
  };

  const removeMedia = (index) => {
    let slide = {
      mediaID: null,
      mediaURL: null,
      mediaHeight: null,
      mediaWidth: null,
    };

    insertSlide(slide, index);
  };

  const insertLink = (link, index) => {
    let slide = {
      link: link,
    };

    insertSlide(slide, index);
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("General", "astra-child")}>
          <RangeControl
            label={__("Number of Slides", "astra-child")}
            initialPosition={numSlides}
            value={numSlides}
            isShiftStepEnabled={true}
            withInputField={true}
            min={1}
            max={10}
            step={1}
            marks={[
              { value: 0, label: "1" },
              { value: 9, label: "10" },
            ]}
            onChange={(value) => {
              updateSlideCount(value);
            }}
          />
          <hr />
          {/* <ToggleControl
            label={__("Autoplay", "astra-child")}
            help={__(
              "If set, slides will automatically scroll.",
              "astra-child"
            )}
            checked={autoplay}
            onChange={() => setAttributes({ autoplay: !autoplay })}
          />
          <hr /> */}
          {/* <RangeControl
            label={__("Slide Duration", "astra-child")}
            value={slideDuration}
            min={1}
            max={20}
            step={1}
            marks={[
              { value: 0, label: "1" },
              { value: 19, label: "20" },
            ]}
            isShiftStepEnabled={true}
            withInputField={true}
            initialPosition={slideDuration}
            onChange={(duration) => setAttributes({ slideDuration: duration })}
            help={__(
              "How long each slide will appear (in seconds)",
              "astra-child"
            )}
          />
          <hr /> */}
          {/* <SelectControl
            label={__("Transition Style", "astra-child")}
            value={transitionStyle}
            options={[{ label: "Simple", value: "simple" }]}
            onChange={(style) => setAttributes({ transitionStyle: style })}
            help={__("How a slide appears and disappears.", "asta-child")}
          /> */}
        </PanelBody>
        <PanelBody initialOpen={false} title={__("Slides", "astra-child")}>
          {slides.map((slide, index) => {
            if (index < numSlides) {
              return (
                <React.Fragment key={index.toString()}>
                  <h2>{__("Slide " + (index + 1), "astra-child")}</h2>
                  <MediaUploadCheck>
                    {!!slide.mediaID && (
                      <MediaUpload
                        title={__("Set Slider Image - " + index)}
                        onSelect={(image) => insertMedia(image, index)}
                        type="image"
                        render={({ open }) => (
                          <Button
                            className="editor-button__slide-image"
                            onClick={open}
                          >
                            <img
                              style={{ width: "80px" }}
                              src={slide.mediaURL}
                              alt={__("Slider Image")}
                            />
                          </Button>
                        )}
                      />
                    )}
                    {!!slide.mediaID && (
                      <div>
                        <h3>{`${slide.mediaWidth} x ${slide.mediaHeight}`}</h3>
                        <Button
                          className="editor-button__slide-remove"
                          onClick={() => removeMedia(index)}
                          isLink
                          isDestructive
                        >
                          {__("Remove Image", "astra-child")}
                        </Button>
                      </div>
                    )}
                    {!slide.mediaID && (
                      <MediaUpload
                        onSelect={(image) => insertMedia(image, index)}
                        allowedTypes={["image"]}
                        value={slide.mediaID}
                        render={({ open }) => (
                          <div
                            style={{ marginTop: "5px", marginBottom: "5px" }}
                          >
                            <Button
                              className="editor-button__slide-set"
                              onClick={open}
                              isSecondary
                            >
                              {__(
                                "Set Slider Image - " + (index + 1),
                                "astra-child"
                              )}
                            </Button>
                          </div>
                        )}
                      />
                    )}
                  </MediaUploadCheck>
                  <URLInput
                    label={__("Slide Link", "astra-child")}
                    value={slide.link}
                    onChange={(url, post) => {
                      insertLink(url, index);
                    }}
                    isFullWidth={true}
                    autoFocus={false}
                  />
                  <hr />
                </React.Fragment>
              );
            }
          })}
        </PanelBody>
        {/* <PanelBody initialOpen={false} title={__("Navigation", "astra-child")}>
          <SelectControl
            label={__("Navigation Style", "astra-child")}
            value={navType}
            options={[{ label: "Dots", value: "dot" }]}
            onChange={(type) => setAttributes({ navType: type })}
            help={__("How slide navigation should appear.", "asta-child")}
          />
          <hr />
          <RangeControl
            label={__("Navigation Size", "astra-child")}
            value={navSize}
            min={5}
            max={100}
            step={1}
            marks={[
              { value: 0, label: "5" },
              { value: 99, label: "100" },
            ]}
            isShiftStepEnabled={true}
            withInputField={true}
            initialPosition={navSize}
            onChange={(size) => setAttributes({ navSize: size })}
            help={__(
              "The size (in pixels) of the naviation item.",
              "astra-child"
            )}
          />
          <BaseControl
            id="navColor-colorPalette"
            label={__("Navigation Color", "astra-child")}
          >
            <ColorIndicator colorValue={navColor} />
            <ColorPalette
              id="navColor-colorPalette"
              colors={colors}
              value={navColor}
              onChange={(color) => setAttributes({ navColor: color })}
            />
          </BaseControl>
          <BaseControl
            id="navColorHover-colorPalette"
            label={__("Navigation Hover Color", "astra-child")}
          >
            <ColorIndicator colorValue={navColorHover} />
            <ColorPalette
              colors={colors}
              value={navColorHover}
              onChange={(color) => setAttributes({ navColorHover: color })}
            />
          </BaseControl>
          <RangeControl
            label={__("Border Size", "astra-child")}
            value={navBorderSize}
            min={0}
            max={5}
            step={1}
            marks={[
              { value: 0, label: "0" },
              { value: 5, label: "5" },
            ]}
            isShiftStepEnabled={true}
            withInputField={true}
            initialPosition={navBorderSize}
            onChange={(size) => setAttributes({ navBorderSize: size })}
            help={__(
              "The size (in pixels) of the naviation border.",
              "astra-child"
            )}
          />
          <BaseControl
            id="navBorderColor-colorPalette"
            label={__("Border Color", "astra-child")}
          >
            <ColorIndicator colorValue={navBorderColor} />
            <ColorPalette
              colors={colors}
              value={navBorderColor}
              onChange={(color) => setAttributes({ navBorderColor: color })}
            />
          </BaseControl>
          <BaseControl
            id="navBorderColorHover-colorPalette"
            label={__("Border Hover Color", "astra-child")}
          >
            <ColorIndicator colorValue={navBorderColorHover} />
            <ColorPalette
              colors={colors}
              value={navBorderColorHover}
              onChange={(color) =>
                setAttributes({ navBorderColorHover: color })
              }
            />
          </BaseControl>
        </PanelBody> */}
      </InspectorControls>
      <section
        ref={slider}
        className="wp-block__swd-simple-slider"
        aria-roledescription="carousel"
        aria-label="Highlighted content"
      >
        <div
          className="swd-simple-slider__wrapper"
          ref={slideList}
          style={{ overflow: "hidden" }}
        >
          <ul
            ref={slideTrack}
            className="swd-simple-slider__slides"
            aria-live="off"
          >
            <Slides numSlides={numSlides} slides={slides} />
          </ul>
        </div>
        <Navigation
          slides={slides}
          numSlides={numSlides}
          borderWidth={navBorderSize}
          borderColor={navBorderColor}
          borderColorHover={getColorName(navBorderColorHover)}
          backgroundColor={navColor}
          backgroundColorHover={getColorName(navColorHover)}
          setSelected={goToSlide}
        />
        <LiveRegion />
      </section>
    </>
  );
}
