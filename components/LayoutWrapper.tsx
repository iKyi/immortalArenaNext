import { Box, useMediaQuery } from "@mui/material";
import MOBILE_SIZE from "../constants/mobileSize";
import { getStrapiMedia } from "../lib/media";
import AppFooter from "./AppFooter/AppFooter";

export type LayoutWrapperPropsType = {
  children?: any;
  bgImg?: string;
};

const LayoutWrapper: React.VFC<LayoutWrapperPropsType> = ({
  children,
  bgImg,
}) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        background: bgImg ? `url('${getStrapiMedia(bgImg)}')` : "none",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: Mobile ? "fit-content" : "auto auto",
        // paddingTop: Mobile ? "100px" : "120px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
      <AppFooter />
    </Box>
  );
};

export default LayoutWrapper;
