import { Link, useMediaQuery, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode, useContext } from "react";
import MOBILE_SIZE from "../../constants/mobileSize";
import MarkdownParser from "../MarkdownParser";
import { Stack } from "@mui/material";
import { LocationOn, LocationCity } from "@mui/icons-material";
import React from "react";
import { GlobalContext } from "../../pages/_app";
import getItemByText from "../../utils/getIconByName";

const DetailComp: React.VFC<{ icon: ReactNode; content: string }> = ({
  icon,
  content,
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        mb: 3,
        "&:last-of-type": {
          mb: 0,
        },
      }}
    >
      {icon}
      <Box>
        <MarkdownParser>{content}</MarkdownParser>
      </Box>
    </Stack>
  );
};

export type AddressBoxPropsType = {
  title: string;
  srlName: string;
  addressValue: string;
  companyValue: string;
  socialsTitle: string;
};

const AddressBox: React.VFC<AddressBoxPropsType> = ({
  title,
  srlName,
  addressValue,
  companyValue,
  socialsTitle,
}) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  const { social } = useContext(GlobalContext);
  // *************** RENDER *************** //
  return (
    <Box>
      {title && (
        <Box
          sx={{
            fontFamily: "Iceland",
            fontSize: Mobile ? "1.55rem" : "1.75rem",
            mb: 2.5,
          }}
        >
          <MarkdownParser>{title}</MarkdownParser>
        </Box>
      )}

      {srlName && <Box sx={{ color: "primary.light", mb: 3 }}>{srlName}</Box>}

      {addressValue && (
        <DetailComp
          content={addressValue}
          icon={<LocationOn color="primary" fontSize="large" sx={{ mr: 1 }} />}
        />
      )}
      {companyValue && (
        <DetailComp
          content={companyValue}
          icon={
            <LocationCity color="primary" fontSize="large" sx={{ mr: 1 }} />
          }
        />
      )}
      {socialsTitle && (
        <Box
          sx={{
            fontFamily: "Iceland",
            fontSize: Mobile ? "1.55rem" : "1.75rem",
            mb: 1.5,
          }}
        >
          <MarkdownParser>{socialsTitle}</MarkdownParser>
        </Box>
      )}
      <Stack direction="row">
        {social.map((item: any) => {
          return (
            <Link
              key={item.id}
              href={item.url}
              component={IconButton}
              target="_blank"
              color="secondary"
              rel="noreferrer"
              aria-label={`${item.icon} link button`}
              sx={{
                color: "#fff",
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
      </Stack>
    </Box>
  );
};

export default AddressBox;
