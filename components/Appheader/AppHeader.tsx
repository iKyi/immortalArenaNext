import { Box, Button, Link, useMediaQuery, Drawer } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import MOBILE_SIZE from "../../constants/mobileSize";
import { GlobalContext } from "../../pages/_app";
import getItemByText from "../../utils/getIconByName";
import SeoComp from "../Reusable/Seo";
import MenuIcon from "@mui/icons-material/Menu";
import { truncate } from "fs";
import LogoBox from "./LogoBox";

const navItems = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about-us",
  },
  {
    name: "Team",
    url: "/our-team",
  },
  {
    name: "Game",
    url: "/game",
    children: true,
  },
  {
    name: "News",
    url: "/news",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];

export type AppHeaderPropsType = {
  children?: any;
  seo: Record<any, any>;
};

const HeaderNavButton = React.forwardRef((props: any, ref) => {
  const { active, children, onClick } = props;
  return (
    <Button
      onClick={onClick}
      sx={{
        bgcolor: active ? "primary.main" : "#141A20",
        color: active ? "white" : "inherit",
        flex: 1,
        fontSize: "1.25rem",
      }}
    >
      {children}
    </Button>
  );
});
HeaderNavButton.displayName = "HeaderNavButton";

const AppHeader: React.VFC<AppHeaderPropsType> = ({ children, seo }) => {
  const { social } = useContext(GlobalContext);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const router = useRouter();
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

  // *************** RENDER *************** //
  return (
    <>
      <Box
        component="header"
        // sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 3 }}
      >
        <SeoComp seo={seo} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
          {social.map((item: any) => {
            return (
              <Link
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  padding: 1,
                  "& :hover": {
                    color: "secondary.main",
                  },
                }}
              >
                {getItemByText(item.icon)}
              </Link>
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: Mobile ? 1 : 0,
          }}
        >
          <LogoBox />
          {!Mobile ? (
            navItems.map((item) => {
              return (
                <HeaderNavButton
                  key={item.url}
                  active={router.pathname === item.url}
                  onClick={() => router.push(item.url)}
                >
                  {item.name}
                </HeaderNavButton>
              );
            })
          ) : (
            <Button
              sx={{
                marginLeft: Mobile ? "auto" : "initial",
              }}
              variant="contained"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </Button>
          )}
        </Box>
      </Box>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <p>inner</p>
      </Drawer>
    </>
  );
};

export default AppHeader;
