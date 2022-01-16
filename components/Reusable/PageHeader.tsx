import { Container, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import MOBILE_SIZE from "../../constants/mobileSize";
import MarkdownParser from "../MarkdownParser";

export type PageHeaderPropsType = {
  title: string;
  description?: string;
  longDescription?: string;
};

const PageHeader: React.VFC<PageHeaderPropsType> = ({
  title,
  description,
  longDescription,
}) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  // *************** RENDER *************** //
  return (
    <Container>
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography
          variant="h1"
          sx={{ fontFamily: "Iceland", fontSize: !Mobile ? "56px" : "2rem" }}
        >
          <MarkdownParser>{title}</MarkdownParser>
        </Typography>
        {description && (
          <Typography
            sx={{
              textTransform: "uppercase",
              fontFamily: "Iceland",
              fontSize: "1.4rem",
            }}
          >
            {description}
          </Typography>
        )}
        {longDescription && (
          <Box
            sx={{
              width: "600px",
              maxWidth: "100%",
              margin: "0 auto",
              mt: 2,
            }}
          >
            <Typography variant="body1">{longDescription}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PageHeader;
