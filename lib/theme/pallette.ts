import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#2CF4CD",
            light: "#AAFBEC",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#F62C5A",
            light: "#c12258",
          },
          info: {
            main: "#048bff",
          },
          darkSecondary: {
            main: "#990325",
            secondary: "#141A20",
          },
          darkBg: {
            main: "#0A1117",
          },
          rarities: {
            epic: "#6C2CF4",
            eternal: "#2CB8F4",
            common: "#CFCFCF",
            immortal: "#F62C5A",
            mythic: "#F8D866",
          },
        }),
  },
});

export { getDesignTokens as ImmortalColorsGetter };
