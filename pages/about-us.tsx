import { Box } from "@mui/material";
import { NextPage } from "next";
import AppHeader from "../components/Appheader/AppHeader";
import LayoutWrapper from "../components/LayoutWrapper";
import { fetchAPI } from "../lib/api";

type AboutUsProps = {
  main: Record<any, any>;
  boxes: any[];
};

const AboutUs: NextPage<AboutUsProps> = ({ main, boxes }) => {
  const { seo, backgroundImage } = main;

  console.log(boxes);

  return (
    <LayoutWrapper bgImg={backgroundImage}>
      <Box>
        <AppHeader seo={seo} />
      </Box>
    </LayoutWrapper>
  );
};
export async function getStaticProps() {
  // Run API calls in parallel
  const [main, boxes] = await Promise.all([
    fetchAPI("/about-page?populate=*"),
    fetchAPI("/about-boxes?populate=*"),
  ]);
  return {
    props: { main, boxes },
    revalidate: 60,
  };
}

export default AboutUs;
