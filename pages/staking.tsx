import { Box, Container, MenuItem, Select, Typography } from "@mui/material";
import { NextPage } from "next";
import { useMemo, useState } from "react";
import AppHeader from "../components/Appheader/AppHeader";
import LayoutWrapper from "../components/LayoutWrapper";
import ComplexTitle from "../components/Reusable/ComplexTitle";
import PageHeader from "../components/Reusable/PageHeader";
import StakingGrid, {
  IStakingCardStatus,
  IStakingGridItem,
} from "../components/StakingPage/StakingGrid";
import { fetchAPI } from "../lib/api";

const moveByStatusToTop = (
  array: IStakingGridItem[],
  statusKeyWord: string
) => {
  const workingItems = [...array];

  const topAItems = workingItems.filter(
    (item) => item.status === statusKeyWord
  );
  const rest = workingItems.filter((item) => item.status !== statusKeyWord);

  return [...topAItems, ...rest];
};

const mockItemList: IStakingGridItem[] = [
  {
    image: "mockPictures/staking.png",
    mintId: "1",
    status: "claimable",
  },
  {
    image: "mockPictures/staking.png",
    mintId: "2",
    status: "staked",
  },
  {
    mintId: "3",
    image: "mockPictures/staking.png",
    status: "unstaked",
  },
  {
    status: "claimable",
    mintId: "4",
    image: "mockPictures/staking.png",
  },
];

export type StakingPropsType = {
  main: Record<any, any>;
};

const Staking: NextPage<StakingPropsType> = ({ main }) => {
  const [sortValue, setSortValue] = useState<IStakingCardStatus>("unstaked");
  //   const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  const {
    seo,
    backgroundImage,
    headerData: { mainTitle, mainDescription, mainLongDescription },
  } = main;

  const itemsSource = mockItemList;

  const sortedItems = useMemo(() => {
    let workingItems = [...itemsSource];
    switch (sortValue) {
      case "unstaked":
        workingItems = moveByStatusToTop(workingItems, "unstaked");
        break;
      case "staked":
        workingItems = moveByStatusToTop(workingItems, "staked");
        break;
      case "claimable":
        workingItems = moveByStatusToTop(workingItems, "claimable");
        break;
      default:
        workingItems = moveByStatusToTop(workingItems, "unstaked");
        break;
    }
    return workingItems;
  }, [itemsSource, sortValue]);

  // *************** RENDER *************** //
  return (
    <LayoutWrapper bgImg={backgroundImage}>
      <Container>
        <AppHeader seo={seo} />
        <PageHeader
          title={mainTitle}
          description={mainDescription}
          longDescription={mainLongDescription}
        />

        <ComplexTitle sx={{ mb: [2, 2, 4] }}>Staking</ComplexTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: [2, 2, 4],
          }}
        >
          <Box>
            <Typography
              component="span"
              color="primary"
              sx={{ fontSize: "1.5rem", fontFamily: "Iceland", mr: 1 }}
            >
              Cards
            </Typography>
            <Typography component="span">{`[${sortedItems.length}]`}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography component="span" sx={{ mr: 1 }}>
              Sort by:
            </Typography>
            <Select
              sx={{
                minHeight: 0,
                py: 1.5,
                color: "primary.main",
              }}
              disableUnderline
              variant="standard"
              autoWidth
              value={sortValue}
              onChange={(e) =>
                setSortValue(e.target.value as IStakingCardStatus)
              }
            >
              <MenuItem value="unstaked">Unstaked</MenuItem>
              <MenuItem value="claimable">Claimable</MenuItem>
              <MenuItem value="staked">Staked</MenuItem>
            </Select>
          </Box>
        </Box>

        <StakingGrid items={sortedItems} />
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [main] = await Promise.all([fetchAPI("/staking-page?populate=*")]);
  return {
    props: { main },
    revalidate: 60,
  };
}

export default Staking;
