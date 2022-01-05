import { Box } from "@mui/material"
import { NextPage } from "next"
import AppHeader from "../components/Appheader/AppHeader"
import LayoutWrapper from "../components/LayoutWrapper"
import { fetchAPI } from "../lib/api"

type AboutUsProps = {
    main: Record<any, any>
}

const AboutUs: NextPage<AboutUsProps> = ({ main }) => {
    const { seo, backgroundImage } = main;
    return (
        <LayoutWrapper bgImg={backgroundImage}>
            <Box>
                <AppHeader seo={seo} />
            </Box>
        </LayoutWrapper>
    )
}
export async function getStaticProps() {
    // Run API calls in parallel
    const [main] = await Promise.all([
        fetchAPI("/about-page?populate=*"),
    ]);
    return {
        props: { main },
        revalidate: 60,
    };
}

export default AboutUs;