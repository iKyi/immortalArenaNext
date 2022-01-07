import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  CardActionArea,
  Collapse,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import FaqTitle from "./FaqTitle";

export type FaqBoxPropsType = {
  children?: any;
  data: Record<any, any>;
};

const QuestionItem: React.VFC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Box
      sx={{
        background: expanded
          ? `url('/faq_bg_active.png')`
          : `url('/faq_bg.png')`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      }}
    >
      <CardActionArea
        onClick={() => setExpanded(!expanded)}
        sx={{
          padding: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontFamily: "Iceland",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              color: !expanded ? "primary.main" : "inherit",
            }}
          >
            {expanded ? (
              <ExpandLess fontSize="large" />
            ) : (
              <ExpandMore fontSize="large" />
            )}
          </Box>
        </Box>
        <Collapse in={expanded}>{content}</Collapse>
      </CardActionArea>
    </Box>
  );
};

const FaqBox: React.VFC<FaqBoxPropsType> = ({ children, data }) => {
  const { faq } = data;

  // const { leftSide, rightSide } = useMemo(() => {
  //     const lSide: any[] = [];
  //     const rSide: any[] = [];

  //     if (faq.length > 1) {
  //         let right = false;
  //         faq.forEach((item: any) => {
  //             if (right) {
  //                 rSide.push(item);
  //                 right = false;
  //             } else {
  //                 lSide.push(item);
  //             }
  //         })
  //     }

  //     return { leftSide: lSide, rightSide: rSide }
  // }, [faq])

  // *************** RENDER *************** //
  return (
    <Container sx={{ pb: 3.5 }}>
      <FaqTitle />
      <Grid container justifyContent="center" spacing={2} rowSpacing={2}>
        {faq.map((item: any) => {
          return (
            <Grid item xs={12} md={6} key={item.id}>
              <QuestionItem title={item.title} content={item.content} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default FaqBox;
