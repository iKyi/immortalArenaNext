import { createTheme, CssBaseline, PaletteMode } from "@mui/material";
import { Theme, ThemeProvider } from "@mui/system";
import { createContext, ReactNode, useMemo, useState } from "react";
import { ImmortalColorsGetter } from "./pallette";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    angled: true;
    complex: true;
    coming: true;
  }
}

let ImmortalMuITheme = createTheme({
  typography: {
    fontFamily: '"Bai Jamjuree", sans-serif',
    h1: {
      fontFamily: "Iceland",
    },
    h2: {
      fontFamily: "Iceland",
    },
    h3: {
      fontFamily: "Iceland",
    },
    h4: {
      fontFamily: "Iceland",
    },
    h5: {
      fontFamily: "Iceland",
    },
    h6: {
      fontFamily: "Iceland",
    },
  },
  shape: {
    borderRadius: 0,
  },
});

const getOverRides = (theme: Theme) => {
  return {
    components: {
      MuiChip: {
        variants: [
          {
            props: { color: "secondary", variant: "filled" },
            style: {
              background: "#990325 !important",
            },
          },
        ],
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "angled" },
            style: {
              background: `url(/whitepaper_button.png)`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              fontSize: "1.35rem",
              textTransform: "none",
              paddingLeft: 36,
              paddingRight: 36,
              color: theme.palette.primary.main,
              clipPath:
                "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);",
              "&:hover": {
                backgroundColor: "transparent",
                background: `url(/whitepaper_button.png)`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                color: theme.palette.secondary.main,
              },
            },
          },
          {
            props: { variant: "complex" },
            style: {
              background: `url(/complex_button.png)`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              fontSize: "1.35rem",
              textTransform: "none",
              paddingLeft: 36,
              paddingRight: 36,
              color: theme.palette.primary.main,
              clipPath:
                "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);",
              "&:hover": {
                backgroundColor: "transparent",
                background: `url(/complex_button.png)`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                color: theme.palette.secondary.main,
              },
            },
          },
          {
            props: { variant: "coming" },
            style: {
              background: `url(/buttons/coming.png)`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              fontFamily: "Iceland",
              fontSize: "1.35rem",
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 8,
              paddingTop: 4,
              color: "#fff",
              svg: {
                transition: "all .3s",
              },
              clipPath:
                "polygon(10% 0, 90% 0, 100% 80%, 90% 100%, 10% 100%, 0 80%);",

              "&:hover": {
                svg: {
                  filter:
                    "invert(27%) sepia(34%) saturate(5129%) hue-rotate(328deg) brightness(98%) contrast(97%);",
                },
                color: theme.palette.secondary.main,
              },
            },
          },
        ],
        styleOverrides: {
          root: {
            fontFamily: "Iceland",
            textShadow: "1px 1px 0px rgba(0,0,0,0.35)",
            position: "relative",
            clipPath:
              "polygon(100% 0%,calc(100% - 15px) 100%,0% 100%,calc(0% + 15px) 0%);",
            padding: "6px 26px",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: '"Bai Jamjuree", sans-serif',
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0A1117",
          },
          html: {
            height: "100%",
          },
          "& #__next": {
            minHeight: "100%",
            flex: "1",
            display: "flex",
            flexDirection: "column",
          },
          "& #root": {
            flex: 1,
          },
          p: {
            margin: 0,
          },
          ".TP": {
            color: theme.palette.primary.main,
          },
          ".TS": {
            color: theme.palette.secondary.main,
          },
        },
      },
    },
  };
};

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ImmortalThemeProvider: React.VFC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => {
    const palette = ImmortalColorsGetter(mode);
    const themeObj = { ...ImmortalMuITheme, ...palette };
    return createTheme(themeObj, getOverRides(themeObj));
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { ImmortalThemeProvider };
