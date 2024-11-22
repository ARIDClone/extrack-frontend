import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `Poppins, ${base.fonts.heading}`,
    body: `Poppins, ${base.fonts.body}`,
  },
  colors: {
    primary: {
      50: "#76bc2a",
      100: "#76bc2a",
      200: "#76bc2a",
      300: "#76bc2a",
      400: "#76bc2a",
      500: "#76bc2a",
      600: "#76bc2a",
      700: "#76bc2a",
      800: "#76bc2a",
      900: "#76bc2a",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#FFFFFF",
        color: "#232323",
      },
    },
  },
  components: {
    Checkbox: {
      // can be Radio
      baseStyle: {
        label: {
          pointerEvents: "none",
        },
      },
    },
  },
  fontWeights: {
    extraThin: 100,
    thin: 200,
    extraLight: 300,
    light: 400,
    normal: 500,
    medium: 600,
    bold: 700,
    extraBold: 800,
  },
});

export default theme;
