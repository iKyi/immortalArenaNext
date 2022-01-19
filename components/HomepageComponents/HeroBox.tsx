import {
  Button,
  Container,
  Grid,
  Typography,
  Link as MUILink,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import MarkdownParser from "../MarkdownParser";
import MOBILE_SIZE from "../../constants/mobileSize";
import Link from "next/link";
import { getStrapiMedia } from "../../lib/media";

export type HeroBoxPropsType = {
  children?: any;
  data: Record<any, any>;
};

const HeroBox: React.VFC<HeroBoxPropsType> = ({ children, data }) => {
  const { introText, introVideoUrl, heroButton, videoLazyLoadImage } = data;
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

  const { data: imageData } = videoLazyLoadImage;

  // *************** RENDER *************** //
  return (
    <Container
      sx={{
        py: 3,
        pt: Mobile ? 3 : 11,
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
                        <Button
                          component={Link}
                          href={heroButton.url}
                          variant="angled"
                        >
                          {heroButton.text}
                        </Button>
                      ) : (
                        <Button
                          variant="angled"
                          component={MUILink}
                          href={heroButton.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <Box>{heroButton.text}</Box>
                        </Button>
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
                  height="280"
                  src={`${introVideoUrl}`}
                  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${introVideoUrl}><img src=${
                    imageData
                      ? getStrapiMedia(videoLazyLoadImage)
                      : "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
                  } alt='Video Immortal Arena'><span>▶</span></a>`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video Immortal Arena"
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
