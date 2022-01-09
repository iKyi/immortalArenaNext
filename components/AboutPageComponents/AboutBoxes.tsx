import { FormatListNumberedSharp } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { useMemo } from "react";
import { getStrapiMedia } from "../../lib/media";
import Link from "../Link";
import MarkdownParser from "../MarkdownParser";

const AboutBox: React.VFC<{ index: number; data: Record<any, any> }> = ({
  index,
  data,
}) => {
  const {
    actionButtonText,
    actionButtonUrl,
    backgroundImage,
    content,
    createdAt,
    image,
    publishedAt,
    subTitle,
    title,
    updatedAt,
  } = data;

  const imageData = useMemo(() => {
    return backgroundImage && backgroundImage.data
      ? getStrapiMedia(backgroundImage.data)
      : false;
  }, [backgroundImage]);

  const imageElementData = useMemo(() => {
    return image && image.data ? getStrapiMedia(image.data) : false;
  }, [image]);
  const right = index % 2 === 0;

  const actionButton = useMemo(() => {
    return actionButtonText && actionButtonUrl;
  }, [actionButtonText, actionButtonUrl]);
  return (
    <Box
      sx={{
        background: imageData ? `url('${imageData}')` : "none",
        backgroundSize: "cover",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
        py: 7,
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              order: right ? 1 : 3,
              padding: 2,
            }}
          >
            {imageElementData && (
              <Box
                sx={{
                  background: `url('${imageElementData}')`,
                  backgroundSize: "auto 100%",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "300px",
                  height: "100%",
                }}
              ></Box>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              order: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ padding: 2 }}>
              <Typography
                sx={{
                  fontFamily: "Iceland",
                  textTransform: "uppercase",
                  color: "main.light",
                }}
              >
                {subTitle}
              </Typography>
              <Typography
                variant="h2"
                sx={{ fontSize: "2rem", lineHeight: "1.1" }}
              >
                <MarkdownParser>{title}</MarkdownParser>
              </Typography>
              <Typography sx={{ marginTop: 2 }}>
                <MarkdownParser>{content}</MarkdownParser>
              </Typography>
              {actionButton ? (
                <Box sx={{ marginTop: 2 }}>
                  {actionButtonUrl.startsWith("/") ? (
                    <Link
                      href={actionButtonUrl}
                      sx={{ textDecoration: "none" }}
                    >
                      <Button variant="angled">{actionButtonText}</Button>
                    </Link>
                  ) : (
                    <a
                      style={{ textDecoration: "none" }}
                      href={actionButtonUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {actionButtonText}
                    </a>
                  )}
                </Box>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export type AboutBoxesPropsType = {
  children?: any;
  boxes: any[];
};
const AboutBoxes: React.VFC<AboutBoxesPropsType> = ({ children, boxes }) => {
  // *************** RENDER *************** //
  if (!boxes || boxes.length === 0) {
    return null;
  }
  return (
    <Box component="section">
      {boxes.map((box, index) => {
        return (
          <AboutBox
            key={box.attributes.title}
            data={box.attributes}
            index={index}
          />
        );
      })}
    </Box>
  );
};

export default AboutBoxes;
