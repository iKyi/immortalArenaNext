import { Container } from "@mui/material";
import { NextPage } from "next";
import AppHeader from "../components/Appheader/AppHeader";
import { ICardItem } from "../components/CardsPage/CardGridItem";
import CardsWrapper from "../components/CardsPage/CardsWrapper";
import LayoutWrapper from "../components/LayoutWrapper";
import PageHeader from "../components/Reusable/PageHeader";
import { fetchAPI } from "../lib/api";

export interface ICardType {
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  id: number;
}

export interface IRarity {
  id: number;
  attributes: {
    cards: any[];
    name: string;
    slug: string;
  };
}

export interface IFactionType {
  id: number;
  attributes: {
    name: string;
    slug: string;
    cards: ICardItem[];
    image: {
      data?: {
        id: number;
        attributes: {
          name: string;
          url: string;
          width: number;
          height: number;
        };
      };
    };
  };
}

type CardsProps = {
  main: Record<any, any>;
  cards: ICardItem[];
  factions: IFactionType[];
  rarities: IRarity[];
  types: ICardType[];
};

const Cards: NextPage<CardsProps> = ({
  main,
  cards,
  factions,
  rarities,
  types,
}) => {
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
        <CardsWrapper
          cards={cards}
          factions={factions}
          rarities={rarities}
          types={types}
        />
      </Container>
    </LayoutWrapper>
  );
};
export async function getStaticProps() {
  // Run API calls in parallel
  const [main, cards, factions, rarities, types] = await Promise.all([
    await fetchAPI("/cards-page?populate=*"),
    await fetchAPI("/cards?populate=*&pagination[pageSize]=100"),
    await fetchAPI("/factions?populate=*"),
    await fetchAPI("/card-rarities?populate=*"),
    await fetchAPI("/card-types?populate=*"),
  ]);
  return {
    props: { main, cards, factions, rarities, types },
    revalidate: 60,
  };
}

export default Cards;
