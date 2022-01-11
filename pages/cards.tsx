import { Container } from "@mui/material";
import { NextPage } from "next";
import AppHeader from "../components/Appheader/AppHeader";
import LayoutWrapper from "../components/LayoutWrapper";
import PageHeader from "../components/Reusable/PageHeader";
import { fetchAPI } from "../lib/api";

type CardsProps = {
  main: Record<any, any>;
};

const Cards: NextPage<CardsProps> = ({ main }) => {
  const { seo, backgroundImage } = main;
  const { pageHeader } = main;
  const { mainTitle, mainDescription, mainLongDescription } = pageHeader;

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
    </LayoutWrapper>
  );
};
export async function getStaticProps() {
  // Run API calls in parallel
  const [main] = await Promise.all([fetchAPI("/cards-page?populate=*")]);
  return {
    props: { main },
    revalidate: 60,
  };
}

export default Cards;
