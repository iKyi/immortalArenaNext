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
      <Box sx={{ textAlign: "center", marginTop: 3 }}>
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
              width: "500px",
              maxWidth: "100%",
              margin: "0 auto",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
              }}
            >
              {longDescription}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PageHeader;
