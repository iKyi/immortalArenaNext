import { Box, Chip, Container, Typography, useMediaQuery } from "@mui/material";
import { NextPage } from "next";
import AppHeader from "../../components/Appheader/AppHeader";
import LayoutWrapper from "../../components/LayoutWrapper";
import Link from "../../components/Link";
import MarkdownParser from "../../components/MarkdownParser";
import MOBILE_SIZE from "../../constants/mobileSize";
import { fetchAPI, getStrapiURL } from "../../lib/api";
import { DateTime } from "luxon";

type ArticleProps = {
  article: Record<any, any>;
};

const ImageWrapper: React.VFC<{ article: any }> = ({ article }) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  const { image } = article;
  if (image) {
    return (
      <Box
        sx={{
          my: 2.5,
          position: "relative",
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            backgroundImage: `url('${
              image && image.data && image.data.attributes
                ? getStrapiURL(image.data.attributes.url).replace("/api/", "/")
                : ""
            }')`,
            backgroundSize: !Mobile ? "auto 100%" : "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            paddingBottom: "30%",
          }}
        ></Box>
      </Box>
    );
  }
  return null;
};

const Article: NextPage<ArticleProps> = ({ article }) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };
  const { title, content, category } = article;

  return (
    <LayoutWrapper>
      <AppHeader seo={seo} />
      <Container>
        <Box
          sx={{
            mt: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Iceland",
              textAlign: "center",
              fontSize: Mobile ? "1.4rem" : "2.45rem",
            }}
          >
            {title}
          </Typography>
        </Box>
        <ImageWrapper article={article} />
        <Box>
          <MarkdownParser>{content}</MarkdownParser>
        </Box>
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          {category && category.data ? (
            <Box
              component={Link}
              href={`/category/${category.data.attributes.slug}`}
              sx={{ textDecoration: "none" }}
            >
              <Chip
                variant="filled"
                label={category.data.attributes.name}
                size="small"
                color="secondary"
                sx={{
                  textTransform: "uppercase",
                  marginBottom: 1,
                  cursor: "pointer",
                }}
              />
            </Box>
          ) : null}
          <Box>
            <Typography>
              {DateTime.fromISO(article.updatedAt).toFormat("dd MMM  yyyy")}
            </Typography>
          </Box>
        </Container>
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticPaths() {
  const posts = await fetchAPI("/posts");

  return {
    paths: posts.map((article: any) => {
      const { attributes } = article;
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
  let [article, categories] = await Promise.all([
    fetchAPI(`/posts?populate=*&filters[slug][$eq]=${params.slug}`),
    fetchAPI("/categories"),
  ]);

  return {
    props: { article: article[0].attributes, categories },
    revalidate: 60,
  };
}

export default Article;
