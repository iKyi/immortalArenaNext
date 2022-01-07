import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import MOBILE_SIZE from "../../constants/mobileSize";
import { getStrapiMedia } from "../../lib/media";
import ComplexTitle from "../Reusable/ComplexTitle";
import ANewWayBox from "./ANewWayBox";

export type WhyBoxPropsType = {
  children?: any;
  data: Record<any, any>;
};

const WhyBox: React.VFC<WhyBoxPropsType> = ({ children, data }) => {
  const { whyBoxContent, whyImage, aNewWayBox, aNewWayImg } = data;
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

  // *************** RENDER *************** //
  if (!whyBoxContent) null;
  return (
    <Box
      sx={{
        py: Mobile ? 6 : 12,
        background: `url('/bigLogoFaded.png') , url('/bg_skull_right.png')`,
        backgroundSize: "auto 70% , auto 110%",
        backgroundPosition: "left center, 110% center",
        backgroundRepeat: "no-repeat,no-repeat",
      }}
    >
      <Container>
        <Grid container columnSpacing={Mobile ? 0 : 20}>
          <Grid item xs={12} md={6}>
            <ComplexTitle>Why Immortal Arena?</ComplexTitle>
            <Box sx={{ my: 4 }}>
              <Typography variant="body2">{whyBoxContent}</Typography>
            </Box>
            {whyImage && (
              <Image
                width={573}
                height={219}
                src={getStrapiMedia(whyImage)}
                alt="Why Immortalarena image"
              />
            )}
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: Mobile ? 10 : 0 }}>
            <ANewWayBox
              title={aNewWayBox.title}
              content={aNewWayBox.content}
              imgUrl={aNewWayImg}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyBox;
