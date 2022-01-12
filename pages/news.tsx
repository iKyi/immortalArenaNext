import { Container } from "@mui/material";
import { NextPage } from "next";
import AppHeader from "../components/Appheader/AppHeader";
import LayoutWrapper from "../components/LayoutWrapper";
import ArticlesHome from "../components/Reusable/ArticlesHome";
import PageHeader from "../components/Reusable/PageHeader";
import { fetchAPI } from "../lib/api";

type NewsUsProps = {
  main: Record<any, any>;
  posts: any[];
};

const NewsUs: NextPage<NewsUsProps> = ({ main, posts }) => {
  const {
    seo,
    mainTitle,
    mainDescription,
    mainLongDescription,
    backgroundImage,
  } = main;

  return (
    <LayoutWrapper bgImg={backgroundImage}>
      <Container>
        <AppHeader seo={seo} />
        <PageHeader
          title={mainTitle}
          description={mainDescription}
          longDescription={mainLongDescription}
        />
        <ArticlesHome posts={posts} />
      </Container>
    </LayoutWrapper>
  );
};
export async function getStaticProps() {
  // Run API calls in parallel
  const [main, posts] = await Promise.all([
    await fetchAPI("/news-page?populate=*"),
    await fetchAPI("/posts?populate=*"),
  ]);
  return {
    props: { main, posts },
    revalidate: 60,
  };
}

export default NewsUs;
