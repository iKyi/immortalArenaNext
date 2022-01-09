import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { NextPage } from "next";
import AppHeader from "../../components/Appheader/AppHeader";
import LayoutWrapper from "../../components/LayoutWrapper";
import ArticlesHome from "../../components/Reusable/ArticlesHome";
import MOBILE_SIZE from "../../constants/mobileSize";
import { fetchAPI } from "../../lib/api";

type CategoryProps = {
  category: any;
  categories: any;
};

const Category: NextPage<CategoryProps> = ({ category, categories }) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  const { attributes } = category;
  const { name, posts } = attributes;
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${name} articles`,
  };

  return (
    <LayoutWrapper>
      <Box>
        <AppHeader seo={seo} />
        <Container>
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Iceland",
              py: 3,
              textAlign: "center",
              fontSize: Mobile ? "1.8rem" : "2.4rem",
            }}
          >
            Category: {name}
          </Typography>
          <ArticlesHome posts={posts.data} />
        </Container>
      </Box>
    </LayoutWrapper>
  );
};

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories");

  return {
    paths: categories.map((category: any) => {
      const { attributes } = category;
      const { slug } = attributes;
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  // Run API calls in parallel
  let [category, categories] = await Promise.all([
    fetchAPI(`/categories?populate=*&filters[slug][$eq]=${params.slug}`),
    fetchAPI("/categories"),
  ]);

  const { attributes } = category[0];
  const { posts: incompletePosts } = attributes;
  const { data: incompletePostsData } = incompletePosts;

  const completePosts = await Promise.all(
    incompletePostsData.map((item: any) => {
      return fetchAPI(`/posts/${item.id}?populate=*`);
    })
  );
  category = category[0];
  category.attributes.posts.data = completePosts;
  return {
    props: { category, categories },
    revalidate: 60,
  };
}

export default Category;
