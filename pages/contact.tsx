import { Container, Grid, useMediaQuery } from "@mui/material";
import { NextPage } from "next";
import AppHeader from "../components/Appheader/AppHeader";
import AddressBox from "../components/ContactPage/AddressBox";
import ContactFormBox from "../components/ContactPage/ContactFormBox";
import LayoutWrapper from "../components/LayoutWrapper";
import PageHeader from "../components/Reusable/PageHeader";
import MOBILE_SIZE from "../constants/mobileSize";
import { fetchAPI } from "../lib/api";

type ContactUsProps = {
  main: Record<any, any>;
};

const ContactUs: NextPage<ContactUsProps> = ({ main }) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  const {
    seo,
    pageHeader,
    formTitle,
    backgroundImage,
    srlName,
    addressValue,
    companyValue,
    addressText,
    socialsTitle,
  } = main;

  const { mainTitle, mainDescription, mainLongDescription } = pageHeader || {};
  return (
    <LayoutWrapper bgImg={backgroundImage}>
      <Container>
        <AppHeader seo={seo} />
        <PageHeader
          title={mainTitle}
          description={mainDescription}
          longDescription={mainLongDescription}
        />
        <Grid
          container
          sx={{
            my: Mobile ? 3.5 : 5.5,
          }}
          columnSpacing={Mobile ? 0 : 5}
        >
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              order: Mobile ? 3 : 1,
              mt: Mobile ? 3 : 0,
            }}
          >
            <AddressBox
              title={addressText}
              addressValue={addressValue}
              companyValue={companyValue}
              srlName={srlName}
              socialsTitle={socialsTitle}
            />
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              order: Mobile ? 1 : 3,
            }}
          >
            <ContactFormBox title={formTitle} />
          </Grid>
        </Grid>
      </Container>
    </LayoutWrapper>
  );
};
export async function getStaticProps() {
  // Run API calls in parallel
  const [main] = await Promise.all([fetchAPI("/contact-page?populate=*")]);
  return {
    props: { main },
    revalidate: 60,
  };
}

export default ContactUs;
