import PropTypes from 'prop-types';
import { LogoutOutlined, MenuOpenOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth";


export const NavBar = ({ drawerWidth }) => {
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(startLogout());
    }
    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOpenOutlined />
                </IconButton>

                <Grid container direction="row" justifyContent="space-between">
                    <Typography variant="h6" noWrap component="div"> JournalApp</Typography>
                    <IconButton
                        color="error"
                        onClick={onLogout}
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

NavBar.propTypes = {
    drawerWidth: PropTypes.any,
  };