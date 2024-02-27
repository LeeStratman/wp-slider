const colors = [
  { name: "theme-primary", color: "#E87825" },
  { name: "theme-grey", color: "#878A8C" },
  { name: "theme-orange", color: "#CC5628" },
  { name: "theme-red", color: "#A61E2F" },
  { name: "theme-green", color: "#668338" },
  { name: "theme-blue", color: "#207481" },
  { name: "theme-yellow", color: "#F4AF2A" },
  { name: "theme-black", color: "#3D3D3D" },
  { name: "theme-dark-black", color: "#303030" },
  { name: "theme-light-grey", color: "#BFBDBC" },
  { name: "theme-white", color: "#ffffff" },
];

const getColorName = (color) => {
  return colors.reduce((accumulator, currentColor) => {
    if (color === currentColor.color) {
      return accumulator + currentColor.name;
    } else {
      return accumulator + "";
    }
  }, "");
};

export { getColorName, colors };
