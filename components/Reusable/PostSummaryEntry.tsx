import {
  Box,
  CardActionArea,
  Chip,
  Collapse,
  Link as MUILink,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import MOBILE_SIZE from "../../constants/mobileSize";
import { getStrapiURL } from "../../lib/api";
import { IPost } from "../../lib/interfaces/post";
import { getStrapiMedia } from "../../lib/media";
import Link from "../Link";

export type PostSummaryEntryPropsType = {
  children?: any;
  data: IPost;
};

const PostSummaryEntry: React.VFC<PostSummaryEntryPropsType> = ({
  children,
  data,
}) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

  const [expanded, setExpanded] = useState<boolean>(false);

  const { attributes } = data;

  const categoryText = attributes?.category?.data?.attributes?.name ?? null;
  // *************** RENDER *************** //
  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <CardActionArea
        component={Link}
        href={`/blog/posts/${attributes.slug}`}
        sx={{
          background: `url('${getStrapiMedia(attributes.image)}')`,
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
            <Chip
              variant="filled"
              label={categoryText}
              size="small"
              color="secondary"
              sx={{ textTransform: "uppercase", marginBottom: 1 }}
            />
          )}
          <Typography
            sx={{
              fontSize: "1.45rem",
              fontFamily: "Iceland",
              color: expanded ? "primary.main" : "inherit",
            }}
          >
            {attributes.title}
          </Typography>
          <Collapse in={expanded}>
            <Typography variant="body1">{attributes.description}</Typography>
          </Collapse>
        </Box>
      </CardActionArea>
    </div>
  );
};

export default PostSummaryEntry;
