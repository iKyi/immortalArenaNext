import type { NextPage } from "next";
import { fetchAPI } from "../lib/api";
import AppHeader from "../components/Appheader/AppHeader";
import LayoutWrapper from "../components/LayoutWrapper";
import HeroBox from "../components/HomepageComponents/HeroBox";
import FaqBox from "../components/HomepageComponents/FaqBox";
import ListeOnBox from "../components/HomepageComponents/ListeOnBox";
import HowItWorksSummary from "../components/HomepageComponents/HowItWorksSummary";
import WhyBox from "../components/HomepageComponents/WhyBox";
import MileStonesBox, {
  IMilestoneEntry,
} from "../components/HomepageComponents/MileStonesBox";

type HomeProps = {
  main: Record<any, any>;
  posts: any[];
};

const Home: NextPage<HomeProps> = ({ main, posts }) => {
  const { seo, backgroundImage, milestones } = main;

  console.log(posts.slice(Math.max(posts.length - 4, 1)));

  return (
    <LayoutWrapper bgImg={backgroundImage}>
      <AppHeader seo={seo} />
      <HeroBox data={main} />
      <ListeOnBox data={main} />
      <HowItWorksSummary data={main} />
      <MileStonesBox data={milestones as IMilestoneEntry[]} />
      <WhyBox data={main} />
      <FaqBox data={main} />
    </LayoutWrapper>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [main, posts] = await Promise.all([
    fetchAPI("/home-page?populate=*"),
    fetchAPI("/posts?sort[0]=updatedAt"),
  ]);
  return {
    props: { main, posts },
    revalidate: 60,
  };
}

export default Home;
