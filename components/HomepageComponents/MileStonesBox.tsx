import { Box, Container, Typography } from "@mui/material";

export interface IMilestoneEntry {
  active?: boolean;
  content: "string";
  id: number;
  title: string;
}

export type MileStonesBoxPropsType = {
  children?: any;
  data: IMilestoneEntry[];
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
        width: "256px",
        maxWidth: "100%",
        marginBottom: 3,
        "&:last-of-type": {
          marginBottom: 0,
        },
        marginLeft: right ? "auto" : "initial",
      }}
    >
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
        }}
      >
        <Typography
          sx={{
            fontWeight: "300",
            color: "primary.main",
            marginBottom: 1.3,
            fontSize: "1.15rem",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2">{content}</Typography>
      </Box>
    </Box>
  );
};

const MileStonesBox: React.VFC<MileStonesBoxPropsType> = ({
  children,
  data,
}) => {
  // *************** RENDER *************** //
  if (!data || data.length === 0) {
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
        py: 5,
      }}
    >
      <Container maxWidth="xs">
        {data.map((item, index) => {
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
