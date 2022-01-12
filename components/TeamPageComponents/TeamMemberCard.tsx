import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import MOBILE_SIZE from "../../constants/mobileSize";
import { getStrapiMedia } from "../../lib/media";
import { ITeamMember } from "../../pages/our-team";
import MarkdownParser from "../MarkdownParser";

export type TeamMemberCardPropsType = {
  data: ITeamMember;
  index: number;
};

const TeamMemberCard: React.VFC<TeamMemberCardPropsType> = ({
  data,
  index,
}) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

  const { attributes } = data;
  const { name, title, description } = attributes;

  const url = getStrapiMedia(data.attributes.img);
  const odd = index % 2 === 0;
  // *************** RENDER *************** //
  if (data.attributes.img.data) {
    return (
      <Card
        sx={{
          backgroundColor: "transparent",
          backgroundImage: "none",
          mt: !Mobile && odd ? 7.5 : 0,
        }}
      >
        <CardMedia
          component="img"
          height={data.attributes.img.data.attributes.height}
          src={url ?? ""}
          width={data.attributes.img.data.attributes.width}
          sx={{
            maxWidth: "100%",
            objectFit: "initial",
            height: "auto",
            backgroundColor: "transparent",
          }}
        />
        <CardContent>
          <Typography
            sx={{
              color: "primary.main",
              fontFamily: "Iceland",
              fontSize: Mobile ? "1.3rem" : "1.8rem",
              textTransform: "uppercase",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              color: "secondary.main",
              fontFamily: "Iceland",
              fontSize: Mobile ? "0.95rem" : "1rem",
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              mt: 3,
              fontSize: "0.9rem",
            }}
          >
            <MarkdownParser>{description}</MarkdownParser>
          </Box>
        </CardContent>
      </Card>
    );
  }
  return null;
};

export default TeamMemberCard;
