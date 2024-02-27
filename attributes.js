/**
 * Slider attributes.
 */
const attributes = {
  numSlides: {
    type: "number",
    default: 1,
  },
  autoplay: {
    type: "boolean",
    default: false,
  },
  transitionStyle: {
    type: "string",
    default: "simple",
  },
  slideDuration: {
    type: "number",
    default: 5,
  },
  slides: {
    type: "array",
    default: [
      {
        mediaID: null,
        mediaURL: null,
        mediaWidth: null,
        mediaHeight: null,
        link: null,
      },
      {
        mediaID: null,
        mediaURL: null,
        mediaWidth: null,
        mediaHeight: null,
        link: null,
      },
      {
        mediaID: null,
        mediaURL: null,
        mediaWidth: null,
        mediaHeight: null,
        link: null,
      },
      {
        mediaID: null,
        mediaURL: null,
        mediaWidth: null,
        mediaHeight: null,
        link: null,
      },
      {
        mediaID: null,
        mediaURL: null,
        mediaWidth: null,
        mediaHeight: null,
        link: null,
      },
      {
        mediaID: null,
        mediaURL: null,
        mediaWidth: null,
        mediaHeight: null,
        link: null,
      },
      {
        mediaID: null,
        mediaURL: null,
        mediaWidth: null,
        mediaHeight: null,
        link: null,
      },
      {
        mediaID: null,
        mediaURL: null,
        mediaWidth: null,
        mediaHeight: null,
        link: null,
      },
      {
        mediaID: null,
        mediaURL: null,
        mediaWidth: null,
        mediaHeight: null,
        link: null,
      },
      {
        mediaID: null,
        mediaURL: null,
        mediaWidth: null,
        mediaHeight: null,
        link: null,
      },
    ],
  },
  navType: {
    type: "string",
    default: "dot",
  },
  navColor: {
    type: "string",
  },
  navColorHover: {
    type: "string",
  },
  navSize: {
    type: "number",
    default: 20,
  },
  navBorderSize: {
    type: "number",
    default: 1,
  },
  navBorderColor: {
    type: "string",
    default: "transparent",
  },
  navBorderColorHover: {
    type: "string",
  },
};

export default attributes;
