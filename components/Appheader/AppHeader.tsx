import {
  Box,
  Button,
  Link,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Link as MUILink,
  SvgIcon,
} from "@mui/material";
import { ArrowDropDownTwoTone, Dashboard } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useContext, useState, useMemo } from "react";
import MOBILE_SIZE from "../../constants/mobileSize";
import { GlobalContext } from "../../pages/_app";
import getItemByText from "../../utils/getIconByName";
import SeoComp from "../Reusable/Seo";
import MenuIcon from "@mui/icons-material/Menu";
import LogoBox from "./LogoBox";
import TopComingButtons from "./TopComingButtons";
import HeaderDesktopNavButton from "./HeaderDesktopNavButton";
import HeaderMobileNavButton from "./HeaderMobileNavButton";

interface INavItem {
  name: string;
  url?: string;
  children?: INavItem[];
}

const navItems: INavItem[] = [
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
    children: [
      {
        name: "Cards",
        url: "/cards",
      },
      {
        name: "How it works",
        url: "/how-it-works",
      },
      {
        name: "How to earn",
        url: "/how-to-earn",
      },
    ],
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

const HeaderNavMenu = React.forwardRef((props: any, ref) => {
  const router = useRouter();
  const { data } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { url, children } = data;
  const { pathname } = router;

  const active = useMemo(() => {
    if (
      pathname === url ||
      children.some((item: any) => item.url === pathname)
    ) {
      return true;
    }
    return false;
  }, [pathname, url, children]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUrlClick = (event: any, url: string) => {
    event.preventDefault();
    router.push(url);
  };

  return (
    <>
      <HeaderDesktopNavButton
        onClick={handleClick}
        active={active || open}
        sx={{
          flex: 1,
          marginRight: "-10px",
        }}
        endIcon={<ArrowDropDownTwoTone />}
      >
        {data.name}
      </HeaderDesktopNavButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: {
            backgroundColor: "#141A20 !important",
          },
        }}
      >
        {data.children.map((subL: any) => {
          return (
            <MenuItem
              sx={{
                fontSize: "1.1rem",
                fontFamily: "Iceland",
                minWidth: "170px",
                textAlign: "center",
                bgcolor:
                  router.pathname === subL.url ? "primary.main" : "#141A20",
                color:
                  router.pathname === subL.url ? "common.black" : "inherit",
                pointerEvents: router.pathname === subL.url ? "none" : "all",
                "&:hover": {
                  color: "#fff",
                },
              }}
              key={subL.url}
              onClick={(event: any) => handleUrlClick(event, subL.url)}
            >
              {subL.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
});
HeaderNavMenu.displayName = "HeaderNavMenu";

const DashboardButton: React.VFC = () => {
  const { appUrl } = useContext(GlobalContext);
  return (
    <HeaderDesktopNavButton
      size="large"
      sx={{
        clipPath: "polygon(100% 0%,100% 100%,0% 100%,15px 0%);",
      }}
      component={MUILink}
      href={appUrl}
      startIcon={<Dashboard color="primary" />}
    >
      Dashboard
    </HeaderDesktopNavButton>
  );
};

const AppHeader: React.VFC<AppHeaderPropsType> = ({ children, seo }) => {
  const { social, topButtons, appUrl } = useContext(GlobalContext);
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
                aria-label={`${item.icon} link button`}
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
            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              {navItems.map((item) => {
                if (!item.children) {
                  return (
                    <HeaderDesktopNavButton
                      key={item.url}
                      active={router.pathname === item.url}
                      onClick={() => router.push(item?.url ?? "/")}
                      aria-label={`Navigation button ${item.name}`}
                      sx={{
                        flex: 1,
                        marginRight: "-10px",
                      }}
                    >
                      {item.name}
                    </HeaderDesktopNavButton>
                  );
                } else {
                  return <HeaderNavMenu key={item.url} data={item} />;
                }
              })}
              <DashboardButton />
            </Box>
          ) : (
            <Button
              sx={{
                marginLeft: Mobile ? "auto" : "initial",
                clipPath: "none",
                padding: 1,
                borderRadius: 3,
              }}
              variant="contained"
              aria-label="Mobile menu Button"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </Button>
          )}
        </Box>
      </Box>

      <TopComingButtons buttons={topButtons} />

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <List
          sx={{
            minWidth: "200px",
            bgcolor: "darkBg.main",
            height: "100%",
          }}
        >
          {navItems.map((item) => {
            if (!item.children) {
              return (
                <HeaderMobileNavButton
                  key={item.url}
                  active={router.pathname === item.url}
                  onClick={() => router.push(item?.url ?? "/")}
                  aria-label={`Navigation button ${item.name}`}
                >
                  {item.name}
                </HeaderMobileNavButton>
              );
            } else {
              return item.children.map((subL: any) => {
                return (
                  <HeaderMobileNavButton
                    key={subL.url}
                    active={router.pathname === subL.url}
                    onClick={() => router.push(subL?.url ?? "/")}
                    aria-label={`Navigation button ${subL.name}`}
                  >
                    {subL.name}
                  </HeaderMobileNavButton>
                );
              });
            }
          })}
          <ListItem
            component={MUILink}
            href={appUrl}
            sx={{
              bgcolor: "darkSecondary.secondary",
              color: "inherit",
              flex: 1,
              fontSize: "1.25rem",
            }}
          >
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default AppHeader;
