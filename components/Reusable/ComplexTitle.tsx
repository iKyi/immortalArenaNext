import { SxProps, Theme, Typography } from "@mui/material";

export type ComplexTitlePropsType = {
  children?: any;
  sx?: SxProps<Theme>;
};

const ComplexTitle: React.VFC<ComplexTitlePropsType> = ({ children, sx }) => {
  // *************** RENDER *************** //
  return (
    <Typography
      variant="h2"
      sx={{
        background: `url('/complexTitle/title_bg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 100%",
        backgroundPosition: "left center",
        fontSize: "1.55rem",
        paddingLeft: "50px;",
        paddingBottom: "15px",
        mb: 2,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default ComplexTitle;
