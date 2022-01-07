import { Box, useMediaQuery } from "@mui/material"
import Image from "next/image";
import { useContext } from "react";
import MOBILE_SIZE from "../../constants/mobileSize";
import { getStrapiMedia } from "../../lib/media";
import { GlobalContext } from "../../pages/_app";
import Link from "../Link";

export type LogoBoxPropsType = {
    children?: any
}

const LogoBox: React.VFC<LogoBoxPropsType> = ({ children }) => {
    const { logo } = useContext(GlobalContext);
    const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);

    // *************** RENDER *************** //
    return (
        <Box sx={{

            flex: 1,
            maxWidth: Mobile ? '80px' : '140px',
            position: 'relative',
            height: '50px'
        }}>
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: 'absolute',
                    bgcolor: '#141A20',
                    clipPath: 'polygon(100% 0%,calc(100% - 15px) 100%,0% 100%,0 0%);',
                    zIndex: 1,
                }}
            >

            </Box>
            <Link href="/">
                <Box
                    sx={{
                        zIndex: 2, left: '50%', right: '50%', width: Mobile ? '40px' : '76px', position: 'absolute', transform: 'translate(-50%, -30%)'
                    }}
                >
                    <Image src={getStrapiMedia(logo)} width={Mobile ? '40px' : '76px'} height={Mobile ? '67px' : '128px'} alt="Immortal Arena Logo Image" />
                </Box>
            </Link>
        </Box >
    )
}

export default LogoBox