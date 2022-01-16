import {
  EmailOutlined,
  PersonOutlined,
  MessageOutlined,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import MOBILE_SIZE from "../../constants/mobileSize";
import MarkdownParser from "../MarkdownParser";

export type ContactFormBoxPropsType = {
  children?: any;
  title: string;
};

const messageLabel = (
  <Stack direction="row">
    <Box>Your message</Box>
  </Stack>
);

const nameLabel = (
  <Stack direction="row">
    <Box>Name</Box>
  </Stack>
);

const emailLabel = (
  <Stack direction="row">
    <Box>Email</Box>
  </Stack>
);

const ContactFormBox: React.VFC<ContactFormBoxPropsType> = ({
  children,
  title,
}) => {
  const Mobile = useMediaQuery(`(max-width:${MOBILE_SIZE})`);
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        mt: 5,
        mb: 2,
        px: 1,
      }}
    >
      <form>
        <Box
          sx={{
            fontFamily: "Iceland",
            fontSize: Mobile ? "1.55rem" : "1.75rem",
            mb: 2.5,
          }}
        >
          <MarkdownParser>{title}</MarkdownParser>
        </Box>
        <Stack spacing={2.5}>
          <FormControl sx={{}} variant="outlined" color="primary">
            <InputLabel htmlFor="name-input">{nameLabel}</InputLabel>
            <OutlinedInput
              id="name-input"
              aria-describedby="my-helper-text"
              type="text"
              required
              label={nameLabel}
              startAdornment={<PersonOutlined sx={{ mr: 1 }} />}
            />
          </FormControl>
          <FormControl variant="outlined" color="primary">
            <InputLabel htmlFor="email-input">{emailLabel}</InputLabel>
            <OutlinedInput
              id="email-input"
              aria-describedby="email-helper-text"
              type="email"
              required
              label={emailLabel}
              startAdornment={<EmailOutlined sx={{ mr: 1 }} />}
            />
          </FormControl>
          <FormControl variant="outlined" color="primary">
            <InputLabel htmlFor="message-input">{messageLabel}</InputLabel>
            <OutlinedInput
              id="message-input"
              aria-describedby="message-helper-text"
              type="message"
              required
              multiline
              label={messageLabel}
              minRows={3}
              startAdornment={<MessageOutlined sx={{ mr: 1, mb: "auto" }} />}
            />
          </FormControl>
          <Box>
            <Button variant="angled" type="submit">
              Send message
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default ContactFormBox;
