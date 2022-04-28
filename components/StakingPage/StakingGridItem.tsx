import { Box, Button } from "@mui/material";
import { useMemo } from "react";
import { IStakingGridItem } from "./StakingGrid";

export type StakingGridItemPropsType = {
  data: IStakingGridItem;
};

const StakingGridItem: React.FC<StakingGridItemPropsType> = ({ data }) => {
  const { image, mintId, status } = data;
  const clickAction = () => {
    console.log("action clicked");
  };

  const buttonText = useMemo(() => {
    switch (status) {
      case "claimable":
        return "CLAIM";
      case "staked":
        return " UNSTAKE";
      case "unstaked":
        return "STAKE";
      default:
        return "STAKE";
    }
  }, [status]);

  const buttonColor = useMemo(() => {
    switch (status) {
      case "claimable":
        return "warning";
      case "staked":
        return "secondary";
      case "unstaked":
        return "primary";
      default:
        return "primary";
    }
  }, [status]);

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          // background: `url('${getStrapiMedia(image)}')`,
          background: `url('${image}')`,
          backgroundSize: "auto 100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          minHeight: [259, 259, 380],
          width: "100%",
          mb: 2,
        }}
      />

      <Button
        sx={{ width: 200 }}
        onClick={clickAction}
        variant="angled"
        color={buttonColor}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default StakingGridItem;
