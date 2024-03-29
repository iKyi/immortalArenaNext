import { Typography, Box } from "@mui/material";
import Image from "next/image";
import imageLoader from "../../lib/imageLoader";
import { getStrapiMedia } from "../../lib/media";
import MarkdownParser from "../MarkdownParser";
import ComplexTitle from "../Reusable/ComplexTitle";

export type ANewWayBoxPropsType = {
  children?: any;
  title: string;
  content: string;
  imgUrl: Record<any, any>;
};

const ANewWayBox: React.VFC<ANewWayBoxPropsType> = ({
  title,
  content,
  imgUrl,
}) => {
  const imageUrl = getStrapiMedia(imgUrl);

  // *************** RENDER *************** //
  return (
    <Box>
      <ComplexTitle>
        <MarkdownParser>{title}</MarkdownParser>
      </ComplexTitle>
      <Box sx={{ my: 4 }}>
        <Typography variant="body2">{content}</Typography>
      </Box>
      {imageUrl && (
        <Image
          loader={imageLoader}
          width={354}
          height={132}
          src={imageUrl}
          alt="A new way to earn AEXP"
        />
      )}
    </Box>
  );
};

export default ANewWayBox;
