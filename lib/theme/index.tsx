import { createTheme, CssBaseline, PaletteMode } from "@mui/material";
import { Theme, ThemeProvider } from "@mui/system";
import { createContext, ReactNode, useMemo, useState } from "react";
import { ImmortalColorsGetter } from "./pallette";

let ImmortalMuITheme = createTheme({
    typography: {
        fontFamily: '"Bai Jamjuree", sans-serif',
        h1: {
            fontFamily: 'Iceland',
        },
        h2: {
            fontFamily: 'Iceland',
        },
        h3: {
            fontFamily: 'Iceland',
        },
        h4: {
            fontFamily: 'Iceland',
        },
        h5: {
            fontFamily: 'Iceland',
        },
        h6: {
            fontFamily: 'Iceland',
        },
    },
    shape: {
        borderRadius: 0
    },

});

const getOverRides = (theme: Theme) => {
    return {
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontFamily: 'Iceland',
                        textShadow: '1px 1px 0px rgba(0,0,0,0.35)',
                        position: 'relative',
                        clipPath: 'polygon(100% 0%,calc(100% - 15px) 100%,0% 100%,calc(0% + 15px) 0%);',
                        padding: '6px 26px',
                    }
                }
            },
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        fontFamily: '"Bai Jamjuree", sans-serif',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#0A1117'
                    },
                    html: {
                        height: '100%'
                    },
                    '& #__next': {
                        minHeight: '100%',
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    '& #root': {
                        flex: 1
                    },
                    '.TP': {
                        color: theme.palette.primary.main
                    },
                    '.TS': {
                        color: theme.palette.secondary.main
                    }
                }
            }
        },
    }
}

const ColorModeContext = createContext({ toggleColorMode: () => { } });

const ImmortalThemeProvider: React.VFC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<PaletteMode>('dark');
    const colorMode = useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        [],
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
    )
}

export { ImmortalThemeProvider }