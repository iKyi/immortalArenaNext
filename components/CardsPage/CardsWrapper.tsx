import { ResetTv, RestartAlt } from "@mui/icons-material";
import {
  Box,
  Grid,
  Select,
  MenuItem,
  Typography,
  CardActionArea,
  useMediaQuery,
} from "@mui/material";
import { useState, useMemo } from "react";
import MOBILE_SIZE from "../../constants/mobileSize";
import { getStrapiMedia } from "../../lib/media";
import { ICardType, IFactionType, IRarity } from "../../pages/cards";
import ComplexTitle from "../Reusable/ComplexTitle";
import CardGridItem, { ICardItem } from "./CardGridItem";

export type CardsWrapperPropsType = {
  cards: ICardItem[];
  factions: IFactionType[];
  rarities: IRarity[];
  types: ICardType[];
};

const FilterWrapper: React.VFC<{
  children: any;
  title?: string;
  red?: boolean;
  sx?: any;
}> = ({ children, title, red, sx }) => {
  return (
    <Grid item xs={6} md={3} lg={2.3} sx={{ display: "flex" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: red ? `url('./redBorder.png')` : `url('./filterBg.png')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          p: 2,
          display: "flex",
          flexDirection: "column",
          ...sx,
        }}
      >
        {title && (
          <Typography
            sx={{
              fontFamily: "Iceland",
              color: "primary.main",
              fontSize: "1.2rem",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Grid>
  );
};

const CardsWrapper: React.VFC<CardsWrapperPropsType> = ({
  cards,
  factions,
  rarities,
  types,
}) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

  const [factionFilter, setFactionFilter] = useState<string>("all");
  const [rarityFilter, setrarityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const activeFaction = useMemo(() => {
    if (!factionFilter) {
      return null;
    }
    return factions.find((item) => item.attributes.name === factionFilter);
  }, [factionFilter, factions]);

  const filtersCount = useMemo(() => {
    let amount = 0;
    if (typeFilter !== "all") {
      amount += 1;
    }
    if (rarityFilter !== "all") {
      amount += 1;
    }
    if (factionFilter !== "all") {
      amount += 1;
    }
    return amount;
  }, [factionFilter, rarityFilter, typeFilter]);

  const filteredCards = useMemo(() => {
    let workingData = [...cards];
    //filters out cards without image
    workingData = workingData.filter((item) => item.attributes.image?.data);
    // aplies faction filter
    if (activeFaction) {
      workingData = workingData.filter(
        (item) =>
          item.attributes.faction.data.attributes.name ===
          activeFaction.attributes.name
      );
    }
    //aplies rarity filter
    if (rarityFilter && rarityFilter.length > 0 && rarityFilter !== "all") {
      workingData = workingData.filter(
        (item) =>
          item.attributes.card_rarity.data?.attributes.name === rarityFilter
      );
    }
    //aplies type filter
    if (typeFilter && typeFilter.length > 0 && typeFilter !== "all") {
      workingData = workingData.filter(
        (item) => item.attributes.card_type.data?.attributes.name === typeFilter
      );
    }
    return workingData;
  }, [rarityFilter, typeFilter, activeFaction, cards]);

  const resetFilters = () => {
    setFactionFilter("all");
    setrarityFilter("all");
    setTypeFilter("all");
  };

  // *************** RENDER *************** //
  return (
    <Box sx={{ mt: 2 }}>
      <ComplexTitle>Filters ({filtersCount})</ComplexTitle>

      <Grid container sx={{ mt: 5 }} spacing={2}>
        <FilterWrapper title="Rarity">
          <Box
            sx={{
              my: 1.5,
              minHeight: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            {rarityFilter.length > 0 && (
              <Typography
                sx={{
                  color: `rarities.${rarityFilter.toLocaleLowerCase()}`,
                  textTransform: "capitalize",
                  fontWeight: 600,
                }}
              >
                {rarityFilter}
              </Typography>
            )}
          </Box>
          <Select
            fullWidth
            id="demo-simple-select-autowidth"
            value={rarityFilter}
            onChange={(event) => setrarityFilter(event.target.value)}
            autoWidth
            sx={{
              mt: "auto",
            }}
          >
            <MenuItem value="all">
              <em>All</em>
            </MenuItem>
            {rarities &&
              rarities.map((option) => {
                return (
                  <MenuItem key={option.id} value={option.attributes.name}>
                    {option.attributes.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FilterWrapper>
        <FilterWrapper title="Factions">
          {!activeFaction ? (
            <Box
              sx={{
                my: 1.5,
                minHeight: "140px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 600,
                }}
              >
                All
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                my: 1.5,
                minHeight: "140px",
                backgroundImage:
                  activeFaction && activeFaction.attributes.image
                    ? `url('${getStrapiMedia(activeFaction.attributes.image)}')`
                    : "black",
                backgroundPosition: "center center",
                backgroundSize: "auto 100%",
                backgroundRepeat: "no-repeat",
              }}
            />
          )}
          <Select
            fullWidth
            id="faction-filter"
            value={factionFilter}
            onChange={(event) => setFactionFilter(event.target.value)}
            autoWidth
            sx={{
              mt: "auto",
            }}
          >
            <MenuItem value="all">
              <em>All</em>
            </MenuItem>
            {factions &&
              factions.map((option) => {
                return (
                  <MenuItem key={option.id} value={option.attributes.name}>
                    {option.attributes.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FilterWrapper>
        <FilterWrapper title="Type">
          <Box
            sx={{
              my: 1.5,
              minHeight: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            {rarityFilter.length > 0 && (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {typeFilter}
              </Typography>
            )}
          </Box>
          <Select
            fullWidth
            id="type-Filter"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            autoWidth
            sx={{
              mt: "auto",
            }}
          >
            <MenuItem value="all">
              <em>All</em>
            </MenuItem>
            {types &&
              types.map((option) => {
                return (
                  <MenuItem key={option.id} value={option.attributes.name}>
                    {option.attributes.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FilterWrapper>
        <FilterWrapper red sx={{ p: 0 }}>
          <CardActionArea
            onClick={resetFilters}
            sx={{
              height: "100%",
              width: "100%",
              color: "secondary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <RestartAlt fontSize="large" />
              <Typography sx={{ fontFamily: "Iceland", fontSize: "1.35rem" }}>
                Reset all
              </Typography>
            </Box>
          </CardActionArea>
        </FilterWrapper>
      </Grid>

      <Grid container spacing={Mobile ? 1 : 2.5} sx={{ my: 3.5 }}>
        {filteredCards.length > 0 ? (
          filteredCards.map((item) => {
            return (
              <Grid
                item
                xs={6}
                md={4}
                lg={3}
                key={item.id}
                sx={{ display: "flex" }}
              >
                <CardGridItem {...item} />
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Box sx={{ my: 2.5 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Iceland",
                  color: "secondary.main",
                  textAlign: "center",
                }}
              >
                No cards found matching your filter
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CardsWrapper;
