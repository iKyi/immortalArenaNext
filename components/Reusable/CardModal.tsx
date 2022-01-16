import { Modal, Box, Container, Button, Paper } from "@mui/material";
import { getStrapiMedia } from "../../lib/media";
import { ICardItem } from "../CardsPage/CardGridItem";

export type CardModalPropsType = {
  open: boolean;
  data: ICardItem["attributes"];
  onClose: () => void;
};

const CardModal: React.VFC<CardModalPropsType> = ({ open, data, onClose }) => {
  // *************** RENDER *************** //
  return (
    <Modal
      open={open}
      onClose={onClose}
      onBackdropClick={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper sx={{ p: 2.5, maxWidth: "100%" }}>
        <Box sx={{ textAlign: "center", maxWidth: "100%" }}>
          <img
            style={{ maxWidth: "100%" }}
            src={getStrapiMedia(data.image)}
            alt={`Card image for card ${data.name}`}
          />
        </Box>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CardModal;
