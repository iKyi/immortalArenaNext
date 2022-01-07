import type { NextPage } from "next";
import { fetchAPI } from "../lib/api";
import AppHeader from "../components/Appheader/AppHeader";
import LayoutWrapper from "../components/LayoutWrapper";
import HeroBox from "../components/HomepageComponents/HeroBox";
import FaqBox from "../components/HomepageComponents/FaqBox";
import ListeOnBox from "../components/HomepageComponents/ListeOnBox";
import HowItWorksSummary from "../components/HomepageComponents/HowItWorksSummary";
import WhyBox from "../components/HomepageComponents/WhyBox";

type HomeProps = {
  main: Record<any, any>;
};

const Home: NextPage<HomeProps> = ({ main }) => {
  const { seo, backgroundImage } = main;

  return (
    <LayoutWrapper bgImg={backgroundImage}>
      <AppHeader seo={seo} />
      <HeroBox data={main} />
      <ListeOnBox data={main} />
      <HowItWorksSummary data={main} />
      <WhyBox data={main} />
      <FaqBox data={main} />
    </LayoutWrapper>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [main] = await Promise.all([fetchAPI("/home-page?populate=*")]);
  return {
    props: { main },
    revalidate: 60,
  };
}

export default Home;
