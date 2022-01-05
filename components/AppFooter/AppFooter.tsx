import { Box, Typography } from "@mui/material"
import { useContext } from "react";
import { GlobalContext } from "../../pages/_app";

export type AppFooterPropsType = {
    children?: any
}

const AppFooter: React.VFC<AppFooterPropsType> = ({ children }) => {
    const { footerText } = useContext(GlobalContext);
    // *************** RENDER *************** //
    return (
        <Box component='footer'
            sx={{
                marginTop: 'auto',
                textAlign: 'center'
            }}
        >
            <Box sx={{
                my: 2.5
            }}>
                <Typography>
                    {footerText}
                </Typography>
            </Box>
        </Box>
    )
}

export default AppFooter