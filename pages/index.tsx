import { Container } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import { fetchAPI } from '../lib/api';
import Button from "@mui/material/Button"
import AppHeader from '../components/Appheader/AppHeader';
import LayoutWrapper from '../components/LayoutWrapper';
import HeroBox from '../components/HomepageComponents/HeroBox';

type HomeProps = {
  main: Record<any, any>
}

const Home: NextPage<HomeProps> = ({ main }) => {
  const { seo, backgroundImage } = main;

  return (
    <LayoutWrapper bgImg={backgroundImage}>
      <AppHeader seo={seo} />

      <HeroBox data={main} />
    </LayoutWrapper>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [main] = await Promise.all([
    fetchAPI("/home-page?populate=*"),
  ]);
  return {
    props: { main },
    revalidate: 60,
  };
}


export default Home
