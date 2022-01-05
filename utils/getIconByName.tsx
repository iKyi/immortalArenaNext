import { Twitter, Telegram } from "@mui/icons-material"
import { Icon } from "@mui/material"

const getItemByText = (text: string) => {

    switch (text) {
        case 'twitter':
            return <Twitter fontSize="medium" />

        case 'discord':
            return <Icon fontSize="inherit" sx={{ fontSize: '24px !important', display: 'inline-block' }}>discord</Icon>

        case 'telegram':
            return <Telegram fontSize="medium" />

        default:
            return <Icon fontSize="inherit">telegram</Icon>

    }
}

export default getItemByText;