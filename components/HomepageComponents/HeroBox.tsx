import { Container, Grid, Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system";
import MarkdownParser from "../MarkdownParser";
import VideoBg from '../../lib/theme/assets/video_wrapper.png';
import MOBILE_SIZE from "../../constants/mobileSize";

export type HeroBoxPropsType = {
    children?: any,
    data: Record<any, any>
}

const HeroBox: React.VFC<HeroBoxPropsType> = ({ children, data }) => {
    const { introText, introVideoUrl } = data;
    const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

    // *************** RENDER *************** //
    return (
        <Container
            sx={{
                py: Mobile ? 4 : 9
            }}
        >
            <Grid container spacing={2}>
                {introText && (
                    <Grid item xs={12} md={6} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="h3"
                                sx={{
                                    width: '500px',
                                    maxWidth: '100%',
                                    lineHeight: '1'
                                }}
                            >
                                <MarkdownParser>
                                    {introText}
                                </MarkdownParser>
                            </Typography>
                        </Box>
                    </Grid>)}
                {introVideoUrl && (
                    <Grid item xs={12} md={6} sx={{
                        display: 'flex',

                    }}>
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Box sx={{
                                background: `url('/video_wrapper.png')`,
                                backgroundSize: '100% auto',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                padding: '30px 60px',
                                width: '600px',
                                maxWidth: '100%',
                            }}>
                                <iframe width="100%" height="315" src={introVideoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} />
                            </Box>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Container >
    )
}

export default HeroBox