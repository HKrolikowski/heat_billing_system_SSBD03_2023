import React, {useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import {ButtonGroup} from '@mui/material';
import {useCookies} from 'react-cookie';
import jwt from "jwt-decode";

const NavbarPanel: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [language, setLanguage] = React.useState<string>('');
    const [navbarColor, setNavbarColor] = React.useState('#ffffff');
    const [cookies] = useCookies(["token"]);
    let role = 'GUEST';

    // if (cookies.token != undefined) {
    //     const decodedToken = jwt(cookies.token);
    //     role = JSON.parse(JSON.stringify(decodedToken)).role
    // }

    const handleChange = (event: SelectChangeEvent<typeof language>) => {
        setLanguage(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };
    const handleClickOpenLogin = () => {
        window.location.href = `/accounts/login`;
    };

    useEffect(() => {
        switch (role) {
            case 'ADMIN':
                setNavbarColor('#58d1fa');
                break;
            case 'MANAGER':
                setNavbarColor('#1c75ec');
                break;
            case 'OWNER':
                setNavbarColor('#7b79d4');
                break;
            case 'GUEST':
                setNavbarColor('#1c8de4');
        }
    }, [role]);

    return (
        <AppBar position="static" style={{backgroundColor: navbarColor}}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Rozliczenie ciepła dla lokali w wielu budynkach
                </Typography>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">

                    <Button style={{backgroundColor: navbarColor}}>Zarejestruj</Button>
                    <Button style={{backgroundColor: navbarColor}}>Zmień język</Button>
                    <Button onClick={handleClickOpenLogin} style={{backgroundColor: navbarColor}}>Zaloguj</Button>
                </ButtonGroup>
            </Toolbar>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Zmień język</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{display: 'flex', flexWrap: 'wrap'}}>
                        <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel id="demo-dialog-select-label">Język</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={language}
                                onChange={handleChange}
                                input={<OutlinedInput label="Język"/>}
                            >
                                <MenuItem value={'PL'}>Polski</MenuItem>
                                <MenuItem value={'EN'}>Angielski</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </AppBar>
    );
};

export default NavbarPanel;