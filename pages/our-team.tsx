import {
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MOBILE_SIZE from "../constants/mobileSize";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import AppHeader from "../components/Appheader/AppHeader";
import LayoutWrapper from "../components/LayoutWrapper";
import PageHeader from "../components/Reusable/PageHeader";
import TeamMemberCard from "../components/TeamPageComponents/TeamMemberCard";
import { fetchAPI } from "../lib/api";

export interface ITeamMember {
  attributes: {
    name: string;
    title: string;
    description: string;
    img: {
      data?: Record<any, any>;
    };
  };
  id: number;
}

type OurTeamProps = {
  main: Record<any, any>;
  members: ITeamMember[];
};

const OurTeam: NextPage<OurTeamProps> = ({ main, members }) => {
  const { seo, backgroundImage, mainHeaderData } = main;
  const { mainTitle, mainDescription, mainLongDescription } = mainHeaderData;
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

  return (
    <LayoutWrapper bgImg={backgroundImage}>
      <Box>
        <Container>
          <AppHeader seo={seo} />
          <PageHeader
            title={mainTitle}
            description={mainDescription}
            longDescription={mainLongDescription}
          />

          <Grid
            container
            spacing={Mobile ? 2 : 4}
            sx={{
              my: Mobile ? 3 : 6.5,
            }}
          >
            {members.length > 0
              ? members.map((item, index: number) => {
                  return (
                    <Grid item xs={12} sm={6} md={3} key={item.id}>
                      <TeamMemberCard data={item} index={index} key={item.id} />
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </Container>
      </Box>
    </LayoutWrapper>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [main, members] = await Promise.all([
    fetchAPI("/team-page?populate=*"),
    fetchAPI("/teammembers?populate=*"),
  ]);
  return {
    props: { main, members },
    revalidate: 60,
  };
}

export default OurTeam;
