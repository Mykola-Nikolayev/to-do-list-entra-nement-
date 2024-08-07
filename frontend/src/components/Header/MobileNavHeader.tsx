import {
    IconButton, Drawer, Stack, styled, Button
} from "@mui/material";
import { Close } from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";

interface IMobileNavDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const MobileNavHeader = ({open, onClose}: IMobileNavDrawerProps) => {
    const { onLogout } = useUserContext()

    const onMobileNavLogout = () => {
        onLogout();
        onClose();
    }

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <MobileNavContentWrapper gap={2}>
                <CloseButton onClick={onClose}>
                    <Close />
                </CloseButton>
                <Stack
                    alignItems='center'
                    justifyContent='center'
                    gap={2}
                >
                    <Link to="/" onClick={onClose}>
                        <Button variant="text" sx={{ color: '#000' }}>
                            Home
                        </Button>
                    </Link>
                    <Button variant="text" sx={{ color: '#000' }} onClick={onMobileNavLogout}>
                            Logout
                    </Button>
                </Stack>
            </MobileNavContentWrapper>
        </Drawer>
    )
}

const MobileNavContentWrapper = styled(Stack)(() => ({
    paddingTop: '50px',
    position: "relative",
    width: '70vw'
}))

const CloseButton = styled(IconButton)(() => ({
    position: 'absolute',
    top: 5,
    right: 5,
    color: '#000',
    "&:hover": {
        backgroundColor: '#a98c2c66'
    }
}))