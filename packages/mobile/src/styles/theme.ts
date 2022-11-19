import { extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    primary: {
      "50": "#48edff",
      "100": "#21e9ff",
      "200": "#00dff8",
      "300": "#00bbd0",
      "400": "#0097a7",
      "500": "#047f8c",
      "600": "#076772",
      "700": "#095159",
      "800": "#093c41",
      "900": "#08272b",
    },
  },
  secondary: {
    "50": "#fff2e1",
    "100": "#ffe1ba",
    "200": "#ffd092",
    "300": "#ffbe6a",
    "400": "#ffab40",
    "500": "#f9a231",
    "600": "#f19721",
    "700": "#e48b17",
    "800": "#c87d1b",
    "900": "#ad6f1f",
  },
  danger: {
    "50": "#f8b0b9",
    "100": "#f18f9b",
    "200": "#e8717f",
    "300": "#dc5565",
    "400": "#d63447",
    "500": "#c13041",
    "600": "#a83240",
    "700": "#90333d",
    "800": "#79323a",
    "900": "#642f35",
  },
});

export default theme;