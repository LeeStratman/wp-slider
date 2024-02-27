/**
 * Pause Button Component for Slider.
 */

const PauseButton = ({ pause }) => {
  return (
    <button
      onClick={pause}
      className="rotation pause"
      aria-label="Stop automatic slide show"
    >
      <svg
        width="42"
        height="34"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="background"
          x="2"
          y="2"
          rx="5"
          ry="5"
          width="38"
          height="24"
        ></rect>
        <rect
          className="border"
          x="4"
          y="4"
          rx="5"
          ry="5"
          width="34"
          height="20"
        ></rect>
        <polygon className="pause" points="17 8 17 20"></polygon>
        <polygon className="pause" points="24 8 24 20"></polygon>
        <polygon className="play" points="15 8 15 20 27 14"></polygon>
      </svg>
    </button>
  );
};

export default PauseButton;
