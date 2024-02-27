/**
 * Represents Slider Navigation
 */

function Navigation({
  slides,
  numSlides,
  borderWidth,
  borderColor,
  backgroundColor,
  backgroundColorHover,
  borderColorHover,
  setSelected,
}) {
  return (
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
            backgroundColorHover !== ""
              ? `has-${backgroundColorHover}-hover-color`
              : "";
          let borderColorHoverClass =
            borderColorHover !== ""
              ? `has-${borderColorHover}-border-hover-color`
              : "";
          return (
            <button
              key={index.toString()}
              style={{
                borderWidth: `${borderWidth}px`,
                borderColor: `${borderColor}`,
                borderStyle: "solid",
                backgroundColor: `${backgroundColor}`,
              }}
              className={`swd-simple-slider__nav-button ${active} ${hoverClass} ${borderColorHoverClass}`}
              aria-selected={ariaSelected}
              aria-controls={ariaControl}
              data-index={dataIndex}
              onClick={(event) => setSelected(Number(dataIndex))}
            ></button>
          );
        }
      })}
    </div>
  );
}

export default Navigation;
