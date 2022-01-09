import {
  Box,
  CardActionArea,
  Chip,
  Collapse,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useMemo, useState } from "react";
import MOBILE_SIZE from "../../constants/mobileSize";
import { getStrapiMedia } from "../../lib/media";
import Link from "../Link";

export type PostSummaryEntryPropsType = {
  children?: any;
  data: any;
};

const PostSummaryEntry: React.VFC<PostSummaryEntryPropsType> = ({
  children,
  data,
}) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

  const [expanded, setExpanded] = useState<boolean>(false);

  const articleSource = useMemo(() => {
    if (data.attributes) {
      return data.attributes;
    }
    return data;
  }, [data]);

  const categoryText = articleSource?.category?.data?.attributes?.name ?? null;
  const categorySlug = articleSource?.category?.data?.attributes?.slug ?? null;

  const artImage = useMemo(() => {
    if (articleSource.image) {
      return getStrapiMedia(articleSource.image);
    }
    return null;
  }, [articleSource]);
  // *************** RENDER *************** //
  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <Box
        sx={{
          background: artImage ? `url('${artImage}')` : "#0A1F20",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "center center",
          display: "flex",
          flexDirection: "column",
          minHeight: !Mobile ? "260px" : "200px",
          color: "transparent",
        }}
      >
        <Box
          sx={{
            width: "100%",
            marginTop: "auto",
            padding: Mobile ? 1.5 : 2.3,
            textAlign: "left",
            transition: "all .2s",
            color: "common.white",
            backgroundColor: expanded ? "rgba(0,0,0,0.75)" : "transparent",
          }}
        >
          {categoryText && (
            <Box
              component={Link}
              href={`/category/${categorySlug}`}
              sx={{ textDecoration: "none" }}
            >
              <Chip
                variant="filled"
                label={categoryText}
                size="small"
                color="secondary"
                sx={{
                  textTransform: "uppercase",
                  marginBottom: 1,
                  cursor: "pointer",
                }}
              />
            </Box>
          )}
          <CardActionArea
            component={Link}
            href={{
              pathname: `/post/${articleSource.slug}`,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "1.45rem",
                  fontFamily: "Iceland",
                  color: expanded ? "primary.main" : "inherit",
                }}
              >
                {articleSource.title}
              </Typography>
            </Box>
            <Collapse in={expanded}>
              <Typography sx={{ color: "common.white" }} variant="body1">
                {articleSource.description}
              </Typography>
            </Collapse>
          </CardActionArea>
        </Box>
      </Box>
    </div>
  );
};

export default PostSummaryEntry;
