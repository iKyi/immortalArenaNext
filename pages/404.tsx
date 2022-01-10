import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AppHeader from "../components/Appheader/AppHeader";
import LayoutWrapper from "../components/LayoutWrapper";
import Link from "../components/Link";

export type FourOhFourPropsType = {
  children?: any;
};

const FourOhFour: React.VFC<FourOhFourPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  const fourOhFourSeo = {
    metaTitle: "Page not found",
    metaDescription: "Sorry, Page Not Found",
  };

  return (
    <LayoutWrapper>
      <Container>
        <AppHeader seo={fourOhFourSeo} />
        <Grid container justifyContent="center" sx={{ marginTop: "25vh" }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Iceland",
                color: "secondary.main",
                textAlign: "center",
                lineHeight: 1.1,
                fontSize: "2.5rem",
              }}
            >
              {"We're sorry, the requested page was not found."}
            </Typography>
            <Box
              sx={{
                marginTop: 5,
                textAlign: "center",
              }}
            >
              <Button variant="angled" component={Link} href="/">
                <span> Go Home</span>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </LayoutWrapper>
  );
};

export default FourOhFour;
