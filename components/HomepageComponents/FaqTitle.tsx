import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export type FaqTitlePropsType = {
  children?: any;
};

const FaqTitle: React.VFC<FaqTitlePropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        py: 3.5,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Iceland",
          backgroundColor: "transparent",
          background: `url(/complex_button.png)`,
          backgroundSize: "auto 100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          fontSize: "1.6rem",
          padding: "10px 0 20px 0",
        }}
      >
        FAQs
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontSize: "1.25rem",
          mt: 2,
        }}
      >
        Our Frequently Asked Questions (FAQs) section
      </Typography>
    </Box>
  );
};

export default FaqTitle;
