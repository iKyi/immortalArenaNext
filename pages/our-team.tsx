import { Button, Container, Typography } from '@mui/material'
import Icon from '@mui/material/Icon';
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import AppHeader from '../components/Appheader/AppHeader';
import LayoutWrapper from '../components/LayoutWrapper';
import SeoComp from '../components/Reusable/Seo';
import { fetchAPI } from '../lib/api';

type OurTeamProps = {
    main: Record<any, any>,
    members: any[]
}

const OurTeam: NextPage<OurTeamProps> = ({ main, members }) => {
    const { seo, backgroundImage } = main;

    return (
        <LayoutWrapper bgImg={backgroundImage}>
            <Box>
                <AppHeader seo={seo} />
                <br />
                <Container >
                    <Button color="primary" variant="contained">lala</Button>
                    <Icon>mark_email_read</Icon>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste suscipit aperiam minima distinctio rem, debitis nemo corrupti, iure accusamus nesciunt nisi totam facere minus sint ipsum nam molestiae, eum porro qui! Suscipit tempore omnis accusantium quos reprehenderit quidem, totam voluptates odit neque rerum numquam natus non nihil exercitationem? Vel quis, dignissimos illum, amet itaque ad sunt adipisci fugit exercitationem corrupti iure alias animi mollitia. Quae at earum sunt eligendi, nostrum culpa esse! Obcaecati sapiente sunt magni, ut quos maxime inventore repellat labore beatae dolorum quisquam omnis similique impedit iusto voluptas in laboriosam culpa facere consectetur, praesentium aut! Similique amet cupiditate commodi dolore hic perspiciatis impedit, pariatur, voluptatibus, animi quod cumque eos recusandae soluta praesentium esse beatae placeat corporis nesciunt. Quisquam, et. Voluptatibus, delectus sapiente aspernatur enim fugiat inventore impedit animi odit aperiam praesentium debitis pariatur doloribus illum id? Obcaecati consequatur omnis eos autem commodi officia? Placeat error non tempora ab sequi rerum veniam a distinctio magni, aliquid enim fugiat quas neque eligendi dolorum similique dolor? Maiores temporibus voluptas eius, enim consequatur ipsam laborum, qui praesentium dolore iste quod. Natus, officiis? Vitae, perferendis pariatur cumque quo rerum totam accusamus doloremque quos impedit odit omnis inventore obcaecati sapiente neque earum vero! Cum error molestias mollitia perferendis quod omnis, minima porro alias, soluta necessitatibus odio obcaecati quos eveniet modi repellat. Fuga et cumque iure saepe reprehenderit facilis accusantium commodi similique assumenda laboriosam, quasi quo officia, autem tempora ullam magni iusto magnam omnis? Cupiditate distinctio quis ab est dolorem. Fugiat, quae sit alias amet ducimus vitae est molestiae nobis deleniti maiores vero necessitatibus voluptate omnis enim nam corporis. Debitis aut maxime voluptas veritatis, esse labore non illo consectetur impedit quidem obcaecati officiis animi doloribus maiores, voluptates nihil facilis voluptate at harum dicta ducimus eligendi numquam enim ullam! Consequuntur, dolores perferendis? Praesentium minima ea natus illum, nemo earum enim, voluptatum eligendi inventore quaerat fugit error nostrum eveniet cumque? Assumenda nostrum, repellat sint enim eligendi optio laboriosam deleniti in similique necessitatibus minus! Fugiat ratione a sint! Consequuntur consectetur quaerat fuga aliquam esse dolorem aperiam iste nisi earum dolor dolores ratione, facere obcaecati suscipit porro vitae minus quas necessitatibus ab ipsa aspernatur deleniti quo? Tempora blanditiis dolore eveniet. Amet omnis hic veritatis eligendi ea autem nostrum tempore vitae distinctio expedita harum molestias veniam, iste perspiciatis explicabo! Laborum cumque sapiente eum, expedita autem rerum assumenda in magnam eligendi voluptate natus tempora neque. Distinctio autem cumque itaque quasi expedita.
                    </Typography>
                </Container>
            </Box>
        </LayoutWrapper>
    )
}

export async function getStaticProps() {
    // Run API calls in parallel
    const [main, members] = await Promise.all([
        fetchAPI("/team-page?populate=*"),
        fetchAPI("/teammembers?populate=*"),
    ]);
    return {
        props: { main, members },
        revalidate: 60,
    };
}

export default OurTeam