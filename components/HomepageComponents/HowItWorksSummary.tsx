import MOBILE_SIZE from "../../constants/mobileSize";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import ComplexTitle from "../Reusable/ComplexTitle";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import { getStrapiMedia } from "../../lib/media";

export type HowItWorksSummaryPropsType = {
  children?: any;
  data: Record<any, any>;
};

const HowItWorksSummary: React.VFC<HowItWorksSummaryPropsType> = ({
  children,
  data,
}) => {
  const { howitWorks, howitWorksButton, charactersBoxImg } = data;
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

  // *************** RENDER *************** //
  if (!howitWorks) {
    return null;
  }
  return (
    <Container
      sx={{
        py: 2.5,
      }}
    >
      <Box>
        <Grid container spacing={Mobile ? 0 : 5}>
          <Grid item xs={12} md={6}>
            <ComplexTitle>How it works</ComplexTitle>
            {howitWorks.map((item: any) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    my: 4,
                    paddingLeft: 4,
                    background: `url('/icons/arrowRight.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "20px",
                    backgroundPosition: "2px 2px",
                  }}
                >
                  <Typography variant="body2">{item.content}</Typography>
                </Box>
              );
            })}
            {howitWorksButton && (
              <Box>
                {howitWorksButton.url.startsWith("/") ? (
                  <Link href={howitWorksButton.url}>
                    <Button variant="angled">{howitWorksButton.text}</Button>
                  </Link>
                ) : (
                  <a href={howitWorksButton.url} target="_blank">
                    {howitWorksButton.text}
                  </a>
                )}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: !Mobile ? "center" : "left",
                mt: Mobile ? 8 : 0,
              }}
            >
              <ComplexTitle
                sx={{
                  display: "inline-block",
                }}
              >
                Characters
              </ComplexTitle>
            </Box>

            <Box sx={{ pt: 3, textAlign: Mobile ? "center" : "right" }}>
              <Image
                width={427}
                height={667}
                src={getStrapiMedia(charactersBoxImg)}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HowItWorksSummary;
