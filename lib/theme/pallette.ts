import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";


const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode

            }
            : {
                // palette values for dark mode
                primary: {
                    main: '#2CF4CD',
                    light: '#AAFBEC',
                    contrastText: '#ffffff',
                },
                secondary: {
                    main: '#F62C5A',
                    light: '#c12258',
                },
                info: {
                    main: '#048bff',
                },
            }),
    },
});

export { getDesignTokens as ImmortalColorsGetter }