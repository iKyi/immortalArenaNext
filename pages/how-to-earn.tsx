import { Container } from "@mui/material";
import { NextPage } from "next";
import AppHeader from "../components/Appheader/AppHeader";
import LayoutWrapper from "../components/LayoutWrapper";
import { fetchAPI } from "../lib/api";

type HowToEarnProps = {
  main: Record<any, any>;
};

const HowToEarn: NextPage<HowToEarnProps> = ({ main }) => {
  const { seo, backgroundImage } = main;
  return (
    <LayoutWrapper bgImg={backgroundImage}>
      <Container>
        <AppHeader seo={seo} />
      </Container>
    </LayoutWrapper>
  );
};
export async function getStaticProps() {
  // Run API calls in parallel
  const [main] = await Promise.all([fetchAPI("/how-to-earn?populate=*")]);
  return {
    props: { main },
    revalidate: 60,
  };
}

export default HowToEarn;
