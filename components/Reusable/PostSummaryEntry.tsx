import {
  Box,
  CardActionArea,
  Link as MUILink,
  Typography,
} from "@mui/material";
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
  const { attributes } = data;
  console.log(attributes);
  // *************** RENDER *************** //
  return (
    <MUILink component={Link} passhref href={`/blog/posts/${attributes.slug}`}>
      <CardActionArea
        sx={{
          background: `url('${getStrapiMedia(attributes.image)}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "center center",
          display: "flex",
          flexDirection: "column",
          minHeight: "350px",
        }}
      >
        <Box
          sx={{
            marginTop: "auto",
          }}
        >
          <Typography variant="h5" sx={{ fontFamily: "Iceland" }}>
            {attributes.title}
          </Typography>
        </Box>
      </CardActionArea>
    </MUILink>
  );
};

export default PostSummaryEntry;
