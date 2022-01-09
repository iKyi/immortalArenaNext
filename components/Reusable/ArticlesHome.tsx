import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import MOBILE_SIZE from "../../constants/mobileSize";
import PostSummaryEntry from "./PostSummaryEntry";

export type ArticlesHomePropsType = {
  children?: any;
  posts: any[];
};

const ArticlesHome: React.VFC<ArticlesHomePropsType> = ({
  children,
  posts,
}) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  // *************** RENDER *************** //
  if (!posts || posts.length === 0) null;

  return (
    <Box
      sx={{
        py: 4.5,
      }}
    >
      <Container>
        <Grid container spacing={Mobile ? 0 : 6}>
          {posts.map((post) => (
            <Grid
              item
              xs={12}
              md={6}
              key={post.id ?? post.title}
              sx={{ pb: Mobile ? 4 : 0 }}
            >
              <PostSummaryEntry data={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ArticlesHome;
