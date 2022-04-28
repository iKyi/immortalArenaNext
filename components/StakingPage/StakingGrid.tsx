import { Grid } from "@mui/material";
import StakingGridItem from "./StakingGridItem";

export type IStakingCardStatus = "staked" | "unstaked" | "claimable";

export type IStakingGridItem = {
  mintId: string;
  image: string;
  status: IStakingCardStatus;
};

export type StakingGridPropsType = {
  items?: IStakingGridItem[];
};

const StakingGrid: React.FC<StakingGridPropsType> = ({ items }) => {
  // *************** RENDER *************** //
  if (items && items.length > 0) {
    return (
      <Grid container spacing={[1.5, 1.5, 2.5]}>
        {items.map((item) => {
          return (
            <Grid key={item.mintId} item xs={12} sm={6} md={4} lg={3}>
              <StakingGridItem data={item} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
  return <></>;
};

export default StakingGrid;
