import {
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import MarkdownParser from "../MarkdownParser";
import MOBILE_SIZE from "../../constants/mobileSize";
import Link from "next/link";

export type HeroBoxPropsType = {
  children?: any;
  data: Record<any, any>;
};

const HeroBox: React.VFC<HeroBoxPropsType> = ({ children, data }) => {
  const { introText, introVideoUrl, heroButton } = data;
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

  // *************** RENDER *************** //
  return (
    <Container
      sx={{
        py: 3,
        maxWidth: "100%",
      }}
    >
      <Grid container spacing={Mobile ? 0 : 2}>
        {introText && (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                width: "100%",
                overflowX: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    width: "500px",
                    maxWidth: "100%",
                    lineHeight: "1",
                    margin: Mobile ? "0 auto" : "initial",
                    my: 3,
                    fontSize: Mobile ? "1.6rem" : "2.3rem",
                    textAlign: Mobile ? "center" : "left",
                  }}
                >
                  <MarkdownParser>{introText}</MarkdownParser>
                </Typography>
                <Box
                  sx={{
                    textAlign: Mobile ? "center" : "left",
                  }}
                >
                  {heroButton && (
                    <Box sx={{ mb: Mobile ? 6 : 0 }}>
                      {heroButton.url.startsWith("/") ? (
                        <Link href={heroButton.url}>
                          <Button variant="angled">{heroButton.text}</Button>
                        </Link>
                      ) : (
                        <a href={heroButton.url} target="_blank">
                          {heroButton.text}
                        </a>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        )}
        {introVideoUrl && (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "100%",
              }}
            >
              <Box
                sx={{
                  background: `url('/video_wrapper.png')`,
                  backgroundSize: "100% auto",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  padding: !Mobile ? "30px 60px" : 0,
                  width: "600px",
                  maxWidth: "100%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <iframe
                  width="100%"
                  height="315"
                  src={introVideoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={true}
                />
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default HeroBox;
