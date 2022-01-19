import { Box, Button, ButtonGroup, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import MOBILE_SIZE from "../../constants/mobileSize";
import { getStrapiMedia } from "../../lib/media";

export type RaceToggleBoxPropsType = {
  races: any[];
};

const RaceToggleBox: React.VFC<RaceToggleBoxPropsType> = ({ races }) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  const [activeItem, setActiveItem] = useState<any>(null);

  useEffect(() => {
    races.length > 0 && setActiveItem(races[0].attributes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageAttrs = useMemo(() => {
    return activeItem?.bigImage?.data
      ? {
          height: activeItem?.bigImage?.data.attributes.height,
          width: activeItem?.bigImage?.data.attributes.width,
        }
      : null;
  }, [activeItem]);

  // *************** RENDER *************** //
  if (races && races.length > 0) {
    return (
      <Box>
        {imageAttrs && activeItem && (
          <Box sx={{ textAlign: "center", mt: 1.5 }}>
            <Image
              src={getStrapiMedia(activeItem.bigImage)}
              height={imageAttrs.height}
              width={imageAttrs.width}
              layout={Mobile ? "responsive" : "intrinsic"}
              alt={`Image for the race ${activeItem.name}`}
            />
          </Box>
        )}
        <Box sx={{ textAlign: "center" }}>
          <ButtonGroup sx={{ mt: 3 }}>
            {races.map((item) => {
              const { attributes } = item;
              return (
                <Button
                  key={item.id}
                  variant="contained"
                  onClick={() => setActiveItem(attributes)}
                  sx={{
                    bgcolor:
                      activeItem && attributes.name === activeItem.name
                        ? "primary.main"
                        : "rgba(44, 244, 205, 0.08)",
                    color:
                      activeItem && attributes.name === activeItem.name
                        ? "common.black"
                        : "common.white",
                  }}
                >
                  {attributes.name}
                </Button>
              );
            })}
          </ButtonGroup>
        </Box>
      </Box>
    );
  }
  return null;
};

export default RaceToggleBox;
