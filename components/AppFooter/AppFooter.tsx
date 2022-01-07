import { Box, Typography, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import MOBILE_SIZE from "../../constants/mobileSize";
import { GlobalContext } from "../../pages/_app";

export type AppFooterPropsType = {
  children?: any;
};

const AppFooter: React.VFC<AppFooterPropsType> = ({ children }) => {
  const { footerText } = useContext(GlobalContext);
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  // *************** RENDER *************** //
  return (
    <Box
      component="footer"
      sx={{
        marginTop: "auto",
        paddingTop: 5,
        textAlign: "center",
        background: `url('/gridBg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: !Mobile ? "cover" : "fit-content",
        backgroundPosition: "bottom center",
      }}
    >
      <Box
        sx={{
          my: 2.5,
        }}
      >
        <Typography>{footerText}</Typography>
      </Box>
    </Box>
  );
};

export default AppFooter;
