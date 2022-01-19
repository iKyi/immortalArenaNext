import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import MOBILE_SIZE from "../../constants/mobileSize";
import MarkdownParser from "../MarkdownParser";
import FaqTitle from "./FaqTitle";

export interface IMilestoneEntry {
  active?: boolean;
  content: "string";
  id: number;
  title: string;
}

export type MileStonesBoxPropsType = {
  children?: any;
  milestones: IMilestoneEntry[];
  data: any;
};

const Milestone: React.VFC<IMilestoneEntry> = ({
  active,
  content,
  id,
  title,
}) => {
  const right = id % 2 === 0;
  return (
    <Box
      sx={{
        width: "320px",
        maxWidth: "100%",
        marginBottom: 1.5,
        "&:last-of-type": {
          marginBottom: 0,
        },
        marginLeft: right ? "auto" : "initial",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ p: 2.5, order: right ? 1 : 2 }}>
          <Box sx={{ width: "42px", height: "42px" }}>
            <Image
              src="/icons/circleIcon.png"
              width="42"
              height="42"
              alt="Circle Icon"
            />
          </Box>
        </Box>
        <Box
          sx={{
            background: `url('/milestoneBg.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center center",
            px: 4,
            py: 3.8,
            filter: !active ? "blur(1px) grayscale(70%)" : "none",
            opacity: !active ? 0.4 : 1,
            order: right ? 2 : 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: "300",
              color: "secondary.main",
              marginBottom: 0.85,
              fontSize: "1.55rem",
              fontFamily: "Iceland",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              fontSize: "0.93rem",
            }}
          >
            <MarkdownParser>{content}</MarkdownParser>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const MileStonesBox: React.VFC<MileStonesBoxPropsType> = ({
  milestones,
  data,
}) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  const { milestonesTitle, milestonesDescription } = data;
  // *************** RENDER *************** //
  if (!milestones || milestones.length === 0) {
    return null;
  }
  return (
    <Box
      sx={{
        marginTop: 2,
        background: `url('/bigLogoFaded_right.png'), url('/gradientLeftBg.png')`,
        backgroundRepeat: "no-repeat,no-repeat",
        backgroundSize: "auto 100%,auto 100%",
        backgroundPosition: "center right,center center",
        py: Mobile ? 5 : 8,
      }}
    >
      <FaqTitle title={milestonesTitle} description={milestonesDescription} />
      <Container maxWidth="md">
        {milestones.map((item, index) => {
          return (
            <Milestone
              key={item.id}
              content={item.content}
              title={item.title}
              active={item.active ?? false}
              id={index}
            />
          );
        })}
      </Container>
    </Box>
  );
};

export default MileStonesBox;
