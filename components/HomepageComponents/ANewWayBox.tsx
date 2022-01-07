import { Typography, Box } from "@mui/material";
import Image from "next/image";
import { getStrapiMedia } from "../../lib/media";
import ComplexTitle from "../Reusable/ComplexTitle";

export type ANewWayBoxPropsType = {
  children?: any;
  title: string;
  content: string;
  imgUrl: string;
};

const ANewWayBox: React.VFC<ANewWayBoxPropsType> = ({
  title,
  content,
  imgUrl,
}) => {
  // *************** RENDER *************** //
  return (
    <Box>
      <ComplexTitle>Why Immortal Arena?</ComplexTitle>
      <Box sx={{ my: 4 }}>
        <Typography variant="body2">{content}</Typography>
      </Box>
      {imgUrl && (
        <Image width={354} height={132} src={getStrapiMedia(imgUrl)} />
      )}
    </Box>
  );
};

export default ANewWayBox;
