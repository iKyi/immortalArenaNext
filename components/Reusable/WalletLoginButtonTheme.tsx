import { FiberManualRecord } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { CSSProperties } from "react";

export type WalletLoginButtonThemePropsType = { propStyles?: CSSProperties };

const StyledLoginButton = styled(WalletMultiButton, {
  name: "StyledLoginButton",
  slot: "Root",
})<WalletLoginButtonThemePropsType>(({ theme, propStyles }) => ({
  border: `1px solid ${theme.palette.error.main}`,
  backgroundColor: `rgba(0,0,0,0.16)`,
  // padding: "6px 20px",
  // fontFamily: FONTS.CHAKRA,
  fontWeight: 700,
  height: "34px",
  lineHeight: 1,
  borderRadius: 0,
  ".wallet-adapter-button-start-icon": {
    width: 16,
    height: 16,
  },
  ...propStyles,
}));

const WalletLoginButtonTheme: React.VFC<WalletLoginButtonThemePropsType> = ({
  propStyles,
}) => {
  const wallet = useWallet();
  // *************** RENDER *************** //
  return (
    <StyledLoginButton
      propStyles={propStyles}
      startIcon={
        <Box
          sx={{
            fontSize: "12px",
          }}
        >
          <FiberManualRecord
            fontSize="inherit"
            color={wallet.connected ? "primary" : "error"}
          />
        </Box>
      }
    />
  );
};

export default WalletLoginButtonTheme;
