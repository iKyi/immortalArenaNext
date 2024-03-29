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
import ArticlesHome from "../components/Reusable/ArticlesHome";
import { Container } from "@mui/material";

type HomeProps = {
  main: Record<any, any>;
  posts: any[];
  races: any;
};

const Home: NextPage<HomeProps> = ({ main, posts, races }) => {
  const { seo, backgroundImage, milestones } = main;

  return (
    <LayoutWrapper bgImg={backgroundImage}>
      <Container>
        <AppHeader seo={seo} />
      </Container>
      <HeroBox data={main} />
      <ListeOnBox data={main} />
      <HowItWorksSummary data={main} races={races} />
      <MileStonesBox data={main} milestones={milestones as IMilestoneEntry[]} />
      <WhyBox data={main} />
      <FaqBox data={main} />
      <ArticlesHome posts={posts} />
    </LayoutWrapper>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [main, posts, races] = await Promise.all([
    fetchAPI("/home-page?populate=*"),
    fetchAPI("/posts?populate=*&sort[0]=updatedAt"),
    fetchAPI("/races?populate=*&sort[0]=updatedAt"),
  ]);
  let filteredPosts =
    posts.length > 4 ? posts.slice(Math.max(posts.length - 4, 1)) : posts;
  return {
    props: { main, posts: filteredPosts, races },
    revalidate: 60,
  };
}

export default Home;
