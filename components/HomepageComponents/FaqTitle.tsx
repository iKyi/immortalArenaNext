import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MarkdownParser from "../MarkdownParser";

export type FaqTitlePropsType = {
  title: string;
  description?: string;
};

const FaqTitle: React.VFC<FaqTitlePropsType> = ({ title, description }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        py: 3.5,
        textAlign: "center",
        mb: 2,
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
        <MarkdownParser>{title}</MarkdownParser>
      </Typography>
      {description && (
        <Box
          sx={{
            fontSize: "1.25rem",
            fontFamily: "Iceland",
            mt: 2,
          }}
        >
          <MarkdownParser>{description}</MarkdownParser>
        </Box>
      )}
    </Box>
  );
};

export default FaqTitle;
