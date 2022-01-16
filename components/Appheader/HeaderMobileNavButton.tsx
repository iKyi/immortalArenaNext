import React from "react";
import { ListItem, ListItemText } from "@mui/material";

const HeaderMobileNavButton = React.forwardRef((props: any, ref) => {
  const { active, children, onClick } = props;
  return (
    <ListItem
      onClick={onClick}
      sx={{
        bgcolor: active ? "primary.main" : "darkSecondary.secondary",
        color: active ? "common.black" : "inherit",
        flex: 1,
        fontSize: "1.25rem",
        ...props.sx,
      }}
    >
      <ListItemText> {children}</ListItemText>
    </ListItem>
  );
});
HeaderMobileNavButton.displayName = "HeaderMobileNavigationButton";

export default HeaderMobileNavButton;
