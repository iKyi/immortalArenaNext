import { Box, Container, Grid, Typography } from "@mui/material";
import { getStrapiURL } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

export type ListeOnBoxPropsType = {
  children?: any;
  data: Record<any, any>;
};

const ListeOnBox: React.VFC<ListeOnBoxPropsType> = ({ children, data }) => {
  const innerData = data?.listedOn?.data;
  // *************** RENDER *************** //
  if (!innerData) {
    return null;
  }
  return (
    <Container
      sx={{
        py: 2.5,
        pb: 4,
        background: `url('/gridBg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Iceland",
          color: "primary.main",
          textTransform: "uppercase",
          textAlign: "center",
          mb: 2.5,
          fontSize: "1rem",
        }}
      >
        Listed On
      </Typography>

      <Grid container justifyContent="center">
        {innerData.map((logoEntry: any) => {
          const { id, attributes } = logoEntry;
          return (
            <Grid item xs={6} sm={3} key={id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={getStrapiURL(attributes.url).replace("/api/", "/")}
                  alt={attributes.alternativeText}
                  width="100%"
                  height="auto"
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ListeOnBox;
