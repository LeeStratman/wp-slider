/**
 * Live Region.
 */

function LiveRegion() {
  return (
    <div
      className="liveregion visuallyhidden"
      aria-live="polite"
      aria-atomic="true"
    ></div>
  );
}

export default LiveRegion;
