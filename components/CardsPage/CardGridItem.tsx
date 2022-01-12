import { Card, CardMedia } from "@mui/material";
import { getStrapiMedia } from "../../lib/media";

export type ICardItem = {
  id: number;
  attributes: {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    card_type: {
      data?: {
        attributes: {
          name: string;
          slug: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };

        id: number;
      };
    };
    card_rarity: {
      data?: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    faction: {
      id: number;
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
          width: number;
          height: number;
        };
      };
    };
  };
};

const CardGridItem: React.VFC<ICardItem> = ({ id, attributes }) => {
  const { name, description, image, card_type, faction } = attributes;
  // *************** RENDER *************** //
  if (image && image.data) {
    return (
      <Card>
        <CardMedia component="img" src={getStrapiMedia(image)} />
      </Card>
    );
  }
  return null;
};

export default CardGridItem;
