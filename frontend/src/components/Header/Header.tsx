import { useState } from "react";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Container,
    Toolbar,
    styled,
    useTheme,
    useMediaQuery, 
    Typography, 
    Stack,
} from "@mui/material";
import { Logout, Menu } from '@mui/icons-material';
import {Link} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";
import { MobileNavHeader } from "./MobileNavHeader";

export const Header = () => {
    const theme = useTheme()
    const { onLogout } = useUserContext()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    const [openMobileNav, setOpenMobileNav] = useState(false);

    const onOpenMobileNav = () => setOpenMobileNav(true);
    const onCloseMobileNav = () => setOpenMobileNav(false);

    return (
        <AppBarStyled position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <HeaderTitle variant="h6" noWrap>
                        TO DO LIST
                        {
                            isDesktop && (
                                <Stack sx={{ flexGrow: 1 }} paddingLeft={3} direction="row" gap={1}>
                                    <Link to="/">
                                        <Button variant="text" sx={{ color: '#000' }}>
                                            Home
                                        </Button>
                                    </Link>
                                </Stack>
                            )
                        }
                    </HeaderTitle>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        {
                            isDesktop ? (
                                <Link to="/">
                                    <IconButton 
                                        aria-label="Menu" 
                                        size="large" 
                                        sx={{ color: '#000', cursor: 'pointer' }}
                                        onClick={onLogout}
                                    >
                                        <Logout />
                                    </IconButton>     
                                </Link>
                            ) : (
                                <IconButton 
                                    aria-label="Menu" 
                                    size="large" 
                                    sx={{ color: '#000', cursor: 'pointer' }}
                                    onClick={onOpenMobileNav}
                                >
                                    <Menu />
                                </IconButton>     
                            )
                        }
                    </Box>
                </Toolbar>
            </Container>
            <MobileNavHeader open={openMobileNav} onClose={onCloseMobileNav} />
        </AppBarStyled>
    )
}

const AppBarStyled = styled(AppBar)(({theme}) => ({
    backgroundColor: theme.palette.common.white, // Fond noir pour l'AppBar
    color: theme.palette.common.black, // Éléments en blanc pour contraster
    boxShadow: "none",
}));

const HeaderTitle = styled(Typography)(() => ({
    display: 'flex',
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
}))