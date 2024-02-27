export default function useRotate(
  duration,
  activeSlide,
  numSlides,
  setActiveSlide
) {
  const [rotate, setRotate] = React.useState(() => {
    return true;
  });

  return [rotate, setRotate];
}
