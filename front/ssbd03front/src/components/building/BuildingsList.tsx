import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Dialog, TextField, DialogContentText, DialogActions, DialogTitle, TableBody } from '@mui/material';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NewBuildingIcon from '../icons/NewBuildingIcon';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import IconViewList from "../icons/IconViewList";
import AnnualBalancesIcon from "../icons/AnnualBalancesIcon";
import axios from 'axios';
import { API_URL } from '../../consts';
import { BuildingFromList } from '../../types/buildingFromList';
import validator from "validator";
import { Snackbar, Alert } from '@mui/material';
import RefreshIcon from "../icons/RefreshIcon";

const BuildingsList = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [newBuildingAddOpen, setNewBuildingAddOpen] = useState(false);
    const [newBuildingConfirmOpen, setNewBuildingConfirmOpen] = useState(false);
    const buttonStyle = { width: "100%", };
    const token = 'Bearer ' + localStorage.getItem("token");
    const [buildings, setBuildings] = useState<BuildingFromList[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [size, setSize] = useState(1);
    const [total, setTotal] = useState<number>(0);
    const [open, setOpen] = useState(true);

    const [totalArea, setTotalArea] = useState("");
    const [totalAreaValid, setTotalAreaValid] = useState(false);
    const [totalAreaError, setTotalAreaError] = useState("");

    const [street, setStreet] = useState<string>("");
    const [streetValid, setStreetValid] = useState(false);
    const [streetError, setStreetError] = useState("");

    const [buildingNumber, setBuildingNumber] = useState<string>("");
    const [buildingNumberValid, setBuildingNumberValid] = useState(false);
    const [buildingNumberError, setBuildingNumberError] = useState("");

    const [city, setCity] = useState<string>("");
    const [cityValid, setCityValid] = useState(false);
    const [cityError, setCityError] = useState("");

    const [postalCode, setPostalCode] = useState<string>("");
    const [postalCodeValid, setPostalCodeValid] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState("");

    useEffect(() => {
        fetchData();
        setOpen(false);
    }, [pageNumber, size]);

    const fetchData = async () => {
        axios.get(`${API_URL}/buildings?pageNumber=${pageNumber}&pageSize=${size}`, {
            headers: {
                Authorization: token
            }
        }).then(response => {
            setBuildings(response.data);
            setTotal(response.data.length);
        }).catch(error => {
            if (error.response.status == 403) navigate('/');
        })
    };

    const handleClickNewBuildingAddOpen = () => {
        setBuildingNumber("");
        setBuildingNumberError("");
        setBuildingNumberValid(false);
        setStreet("");
        setStreetError("");
        setStreetValid(false);
        setCityError("");
        setCity("");
        setCityValid(false);
        setPostalCode("");
        setPostalCodeError("");
        setPostalCodeValid(false);
        setTotalArea("");
        setTotalAreaError("");
        setTotalAreaValid(false);
        setNewBuildingAddOpen(true);
    };

    const handleNewBuildingAddClose = () => {
        setNewBuildingAddOpen(false);
    };

    const handleClickNewBuildingConfirmOpen = () => {
        setNewBuildingConfirmOpen(true);
    };

    const handleNewBuildingConfirmClose = () => {
        setNewBuildingConfirmOpen(false);
    };

    const handleTotalAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9]+(?:\.[0-9]+)?$/;
        if (validator.matches(event.target.value, regex) && event.target.value.length > 0) {
            setTotalArea(event.target.value);
            setTotalAreaValid(true);
            setTotalAreaError("");
        } else {
            setTotalAreaValid(false);
            setTotalAreaError(t("buildingFromList.total_area_error"));
        }
    };

    const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[\p{L}\s-]{2,}$/u;
        if (validator.matches(event.target.value, regex) && event.target.value.length < 32 && event.target.value.length > 0) {
            setStreet(event.target.value);
            setStreetValid(true);
            setStreetError("");
        } else {
            setStreetValid(false);
            setStreetError(t("buildingFromList.street_error"));
        }
    };

    const handleBuildingNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^\d+(\/\d+)?[A-Za-z]?$/;
        if (validator.matches(event.target.value, regex)) {
            setBuildingNumber(event.target.value);
            setBuildingNumberValid(true);
            setBuildingNumberError("");
        } else {
            setBuildingNumberValid(false);
            setBuildingNumberError(t("buildingFromList.building_number_error"));
        }
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[\p{L}\s-]{2,}$/u;
        if (validator.matches(event.target.value, regex) && event.target.value.length < 32 && event.target.value.length > 0) {
            setCity(event.target.value);
            setCityValid(true);
            setCityError("");
        } else {
            setCityValid(false);
            setCityError(t("buildingFromList.city_error"));
        }
    };

    const handlePostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^\d{2}-\d{3}$/;
        if (validator.matches(event.target.value, regex)) {
            setPostalCode(event.target.value);
            setPostalCodeValid(true);
            setPostalCodeError("");
        } else {
            setPostalCodeValid(false);
            setPostalCodeError(t("buildingFromList.postal_code_error"));
        }
    };

    const handleCancel = () => {
        handleNewBuildingConfirmClose();
    };
    const handleOpenAnnualBalanceList = (buildingNumber: number) => {
        navigate('/buildings/'+buildingNumber);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const buildingDTO = {
            totalArea: totalArea,
            street: street,
            buildingNumber: buildingNumber,
            city: city,
            postalCode: postalCode
        };

        if(totalAreaValid && streetValid && buildingNumberValid && cityValid && postalCodeValid) {
        axios.post(`${API_URL}/buildings/building`, buildingDTO, {
            headers: {
                Authorization: token
            }
        }).then(response => {
            handleNewBuildingConfirmClose();
            handleNewBuildingAddClose();
            fetchData();
        }
        ).catch(error => {
            console.log(error);
            setNewBuildingConfirmOpen(false);
            setOpen(true);
        }
        );
    } else {
        setNewBuildingConfirmOpen(false);
        setOpen(true);
    }
    };

    const goToBuilding = (buildingId: string) => {
        navigate('/buildings/building/' + buildingId);
    }

    const handleClick = () => {
        fetchData();
        navigate('/buildings');
    };

    return (
        <div style={{ height: '90vh', width: '100vw', boxSizing: 'border-box', left: 0, right: 0, bottom: 0 }}>
            <TableContainer component={Paper} sx={{display: 'flex', flexDirection: 'column', overflowY: 'auto'}}>
                <Table aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {t('buildingFromList.created_by')}
                            </TableCell>
                            <TableCell>
                                {t('buildingFromList.total_area')}
                            </TableCell>
                            <TableCell>
                                {t('buildingFromList.communal_area_aggregate')}
                            </TableCell>
                            <TableCell>
                                {t('buildingFromList.street')}
                            </TableCell>
                            <TableCell>
                                {t('buildingFromList.building_number')}
                            </TableCell>
                            <TableCell>
                                {t('buildingFromList.city')}
                            </TableCell>
                            <TableCell>
                                {t('buildingFromList.postal_code')}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleClickNewBuildingAddOpen()}
                                        style={buttonStyle}
                                        variant="text">
                                    <NewBuildingIcon />
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button className="landing-page-button" onClick={handleClick}>
                                    <RefreshIcon/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{flexGrow: '1', minHeight: '0', overflowY: 'scroll'}}>
                        {buildings.map((buildings) => (
                            <TableRow key={buildings.id}>
                                <TableCell>{buildings.createdBy}</TableCell>
                                <TableCell>{buildings.totalArea}</TableCell>
                                <TableCell>{buildings.communalAreaAggregate}</TableCell>
                                <TableCell>{buildings.street}</TableCell>
                                <TableCell>{buildings.buildingNumber}</TableCell>
                                <TableCell>{buildings.city}</TableCell>
                                <TableCell>{buildings.postalCode}</TableCell>
                                <TableCell>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={() => goToBuilding(buildings.id.toString())}
                                        aria-label="close"
                                    >
                                        <IconViewList />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={() => handleOpenAnnualBalanceList(buildings.id)}
                                        aria-label="close">
                                        <AnnualBalancesIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                fullScreen
                open={newBuildingAddOpen}
                onClose={handleNewBuildingAddClose}
                scroll="paper" 
                maxWidth="sm" 
                fullWidth>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleNewBuildingAddClose}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {t('buildingFromList.building_add')}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClickNewBuildingConfirmOpen}>
                            {t('buildingFromList.building_save')}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={200}>
                    <div style={{ height: "100%", overflow: "auto" }}>
                    <form>
                        <List>
                            <ListItem>
                                <ListItem>
                                    <DialogContentText>
                                        {t('buildingFromList.building_total_area')}
                                    </DialogContentText>
                                </ListItem>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="totalArea"
                                    label={t('buildingFromList.total_area')+ "*"}
                                    type="text"
                                    sx={{ width: '50%' }}
                                    variant="standard"
                                    onChange={handleTotalAreaChange}/>
                            </ListItem>
                            <ListItem>
                                <DialogContentText style={{ fontSize: "13px", color: "red" }}>{totalAreaError}</DialogContentText>
                            </ListItem>
                            <Divider />
                            <List>
                                <ListItem>
                                    <ListItem>
                                        <DialogContentText>
                                            {t('buildingFromList.building_address')}
                                        </DialogContentText>
                                    </ListItem>
                                </ListItem>
                                <ListItem>
                                    <ListItem>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="street"
                                            label={t('buildingFromList.street')+ "*"}  
                                            type="text"
                                            sx={{ width: '50%' }}
                                            variant="standard"
                                            onChange={handleStreetChange}/>
                                    </ListItem>
                                </ListItem>
                                <ListItem>
                                <DialogContentText style={{ fontSize: "13px", color: "red" }}>{streetError}</DialogContentText>
                            </ListItem>
                                <ListItem>
                                    <ListItem>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="buildingNumber"
                                            label={t('buildingFromList.building_number')+ "*"}
                                            type="text"
                                            sx={{ width: '50%' }}
                                            variant="standard"
                                            onChange={handleBuildingNumberChange}/>
                                    </ListItem>
                                </ListItem>
                                <ListItem>
                                <DialogContentText style={{ fontSize: "13px", color: "red" }}>{buildingNumberError}</DialogContentText>
                            </ListItem>
                                <ListItem>
                                    <ListItem>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="city"
                                            label={t('buildingFromList.city')+ "*"}
                                            type="text"
                                            sx={{ width: '50%' }}
                                            variant="standard"
                                            onChange={handleCityChange}/>
                                    </ListItem>
                                </ListItem>
                                <ListItem>
                                <DialogContentText style={{ fontSize: "13px", color: "red" }}>{cityError}</DialogContentText>
                            </ListItem>
                                <ListItem>
                                    <ListItem>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="postalCode"
                                            label={t('buildingFromList.postal_code')+ "*"}
                                            type="text"
                                            sx={{ width: '50%' }}
                                            variant="standard"
                                            onChange={handlePostalCodeChange}/>
                                    </ListItem>
                                </ListItem>
                                <ListItem>
                                <DialogContentText style={{ fontSize: "13px", color: "red" }}>{postalCodeError}</DialogContentText>
                            </ListItem>
                            </List>
                        </List>
                    </form>
                    </div>
                </Box>
            </Dialog>

            <Dialog
                open={newBuildingConfirmOpen}
                onClose={handleNewBuildingConfirmClose}>
                <DialogTitle>
                    {t('buildingFromList.building_add_confirm')}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCancel}>{t('confirm.no')}</Button>
                    <Button onClick={handleSubmit}>{t('confirm.yes')}</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                 {t('buildingFromList.add_building_error')}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default BuildingsList;