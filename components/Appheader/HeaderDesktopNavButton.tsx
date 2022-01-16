import React from "react";
import { Button } from "@mui/material";

const HeaderNavButton = React.forwardRef((props: any, ref) => {
  const { active, children, onClick } = props;
  return (
    <Button
      onClick={onClick}
      {...props}
      sx={{
        fontSize: "1.1rem",
        bgcolor: (theme) =>
          active
            ? theme.palette.primary.main + " !important"
            : "rgba(44, 244, 205, 0.08)",
        color: active ? "common.black" : "inherit",
        textShadow: "none",
        "&:hover": {
          bgcolor: "secondary.main",
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
});
HeaderNavButton.displayName = "HeaderNavButton";

export default HeaderNavButton;
