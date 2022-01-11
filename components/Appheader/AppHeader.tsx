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
} from "@mui/material";
import { ArrowDropDownTwoTone } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useContext, useState, useMemo } from "react";
import MOBILE_SIZE from "../../constants/mobileSize";
import { GlobalContext } from "../../pages/_app";
import getItemByText from "../../utils/getIconByName";
import SeoComp from "../Reusable/Seo";
import MenuIcon from "@mui/icons-material/Menu";
import LogoBox from "./LogoBox";
import TopComingButtons from "./TopComingButtons";

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

const HeaderMobileNavButton = React.forwardRef((props: any, ref) => {
  const { active, children, onClick } = props;
  return (
    <ListItem
      onClick={onClick}
      sx={{
        bgcolor: active ? "primary.main" : "#141A20",
        color: active ? "white" : "inherit",
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

const HeaderNavMenu = React.forwardRef((props: any, ref) => {
  const router = useRouter();
  const { data } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const active = useMemo(() => {
    if (
      router.pathname === data.url ||
      data.children.some((item: any) => item.url === router.pathname)
    ) {
      return true;
    }
    return false;
  }, []);

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
      <Button
        onClick={handleClick}
        sx={{
          bgcolor: active ? "primary.main" : "#141A20",
          color: active ? "white" : "inherit",
          flex: 1,
          fontSize: "1.25rem",
        }}
        endIcon={<ArrowDropDownTwoTone />}
      >
        {data.name}
      </Button>
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
                minWidth: "170px",
                textAlign: "center",
                bgcolor:
                  router.pathname === subL.url ? "primary.main" : "#141A20",
                color: router.pathname === subL.url ? "white" : "inherit",
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

const AppHeader: React.VFC<AppHeaderPropsType> = ({ children, seo }) => {
  const { social, topButtons } = useContext(GlobalContext);
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
            navItems.map((item) => {
              if (!item.children) {
                return (
                  <HeaderNavButton
                    key={item.url}
                    active={router.pathname === item.url}
                    onClick={() => router.push(item?.url ?? "/")}
                    aria-label={`Navigation button ${item.name}`}
                  >
                    {item.name}
                  </HeaderNavButton>
                );
              } else {
                return <HeaderNavMenu key={item.url} data={item} />;
              }
            })
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
        </List>
      </Drawer>
    </>
  );
};

export default AppHeader;
