import { Container } from "@mui/material";
import { NextPage } from "next";
import AppHeader from "../components/Appheader/AppHeader";
import LayoutWrapper from "../components/LayoutWrapper";
import { fetchAPI } from "../lib/api";

type GameUsProps = {
  main: Record<any, any>;
};

const GameUs: NextPage<GameUsProps> = ({ main }) => {
  const { seo } = main;
  return (
    <LayoutWrapper>
      <Container>
        <AppHeader seo={seo} />
      </Container>
    </LayoutWrapper>
  );
};
export async function getStaticProps() {
  // Run API calls in parallel
  const [main] = await Promise.all([fetchAPI("/game-page?populate=*")]);
  return {
    props: { main },
    revalidate: 60,
  };
}

export default GameUs;
