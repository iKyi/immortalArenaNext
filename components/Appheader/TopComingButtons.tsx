import { Box, Button, Grid, Typography } from "@mui/material";
import DiscordIcon from "../Icons/DiscordIcon";
import DownloadIcon from "../Icons/DownloadIcon";
import Link from "../Link";

export type TopComingButtonsPropsType = {
  buttons: {
    id: number;
    text: string;
    icon: string;
    url: string;
  }[];
};

export type ElemWrapperType = {
  children: any;
  link: string;
};

const ElemWrapper: React.VFC<ElemWrapperType> = ({ link, children }) => {
  // *************** RENDER *************** //

  return link.startsWith("/") ? (
    <Link
      href={link}
      sx={{
        textDecoration: "none",
      }}
    >
      <Button
        variant="coming"
        sx={{
          textDecoration: "none",
        }}
      >
        {children}
      </Button>
    </Link>
  ) : (
    <a
      href={link}
      rel="noreferrer"
      target="_blank"
      style={{ textDecoration: "none" }}
    >
      <Button
        variant="coming"
        sx={{
          textDecoration: "none",
        }}
      >
        {children}
      </Button>
    </a>
  );
};

const TopComingButtons: React.VFC<TopComingButtonsPropsType> = ({
  buttons,
}) => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "download":
        return <DownloadIcon />;
      case "discord":
        return <DiscordIcon />;
      default:
        return <DiscordIcon />;
    }
  };

  // *************** RENDER *************** //
  return (
    <Grid
      maxWidth="md"
      container
      sx={{
        margin: "0 auto",
        mt: 5,
        mb: 2,
      }}
      justifyContent="space-evenly"
    >
      {buttons.map((item) => {
        return (
          <Grid
            item
            xs={6}
            md={4}
            sx={{
              textAlign: "center",
            }}
            key={item.url}
          >
            <ElemWrapper link={item.url}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    lineHeight: 1,
                    justifyContent: "center",
                    mb: 0.7,
                  }}
                >
                  {getIcon(item.icon)}
                </Box>
                <Typography sx={{ fontFamily: "Iceland", lineHeight: 1.1 }}>
                  {item.text}
                </Typography>
              </Box>
            </ElemWrapper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TopComingButtons;
