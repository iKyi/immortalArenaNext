import { Box, Container } from "@mui/material";
import { NextPage } from "next";
import AboutBoxes from "../components/AboutPageComponents/AboutBoxes";
import AppHeader from "../components/Appheader/AppHeader";
import LayoutWrapper from "../components/LayoutWrapper";
import PageHeader from "../components/Reusable/PageHeader";
import { fetchAPI } from "../lib/api";

type AboutUsProps = {
  main: Record<any, any>;
  boxes: any[];
};

const AboutUs: NextPage<AboutUsProps> = ({ main, boxes }) => {
  const { seo, backgroundImage, headerData } = main;
  const { mainTitle, mainDescription, mainLongDescription } = headerData;
  return (
    <LayoutWrapper bgImg={backgroundImage}>
      <Container>
        <AppHeader seo={seo} />
        <PageHeader
          title={mainTitle}
          description={mainDescription}
          longDescription={mainLongDescription}
        />
      </Container>
      <AboutBoxes boxes={boxes} />
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
