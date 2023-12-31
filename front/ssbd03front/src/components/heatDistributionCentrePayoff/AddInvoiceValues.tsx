import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContentText, DialogTitle, Grid, TextField, Snackbar, Alert} from '@mui/material';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import DialogContent from '@mui/material/DialogContent';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import axios from 'axios';
import {API_URL} from '../../consts';
import validator from "validator";
import InvoiceIcon from '../icons/InvoiceIcon';

const AddInvoiceValues = () => {
    const [windowOpen, setWindowOpen] = useState(false);
    const [windowErrorOpen, setWindowErrorOpen] = useState(false);
    const [windowSuccessOpen, setWindowSuccessOpen] = useState(false);
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [addInvoiceConfirmOpen, setAddInvoiceConfirmOpen] = useState(false);
    const buttonStyle = {width: "100%",};
    const token = 'Bearer ' + localStorage.getItem("token");
    const [open, setOpen] = useState(false);

    const [consumption, setConsumption] = useState("");
    const [consumptionValid, setConsumptionValid] = useState(false);
    const [consumptionError, setConsumptionError] = useState("");

    const [consumptionCost, setConsumptionCost] = useState("");
    const [consumptionCostValid, setConsumptionCostValid] = useState(false);
    const [consumptionCostError, setConsumptionCostError] = useState("");

    const [heatingAreaFactor, setHeatingAreaFactor] = useState<string>("");
    const [heatingAreaFactorValid, setHeatingAreaFactorValid] = useState(false);
    const [heatingAreaFactorError, setHeatingAreaFactorError] = useState("");

    const handleClickAddingInvoiceConfirmOpen = () => {
        setAddInvoiceConfirmOpen(true);
    };

    const handleAddingInvoiceConfirmClose = () => {
        setAddInvoiceConfirmOpen(false);
    };

    const handleConsumptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = "^\\d{0,8}(\\.\\d{0,2})?$";
        if (validator.matches(event.target.value, regex) && event.target.value.length > 0) {
            setConsumption(event.target.value);
            setConsumptionValid(true);
            setConsumptionError("");
        } else {
            setConsumptionValid(false);
            setConsumptionError(t("invoice.wrong_consumption_value_error"));
        }
    };

    const handleConsumptionCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = "^\\d{0,8}(\\.\\d{0,2})?$";
        if (validator.matches(event.target.value, regex) && event.target.value.length > 0) {
            setConsumptionCost(event.target.value);
            setConsumptionCostValid(true);
            setConsumptionCostError("");
        } else {
            setConsumptionCostValid(false);
            setConsumptionCostError(t("invoice.wrong_consumption_value_error"));
        }
    };

    const handleHeatingAreaFactorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = "^(?:0(?:\\.\\d{0,2})?|1(?:\\.0{0,2})?)$";
        if (validator.matches(event.target.value, regex) && event.target.value.length > 0) {
            setHeatingAreaFactor(event.target.value);
            setHeatingAreaFactorValid(true);
            setHeatingAreaFactorError("");
        } else {
            setHeatingAreaFactorValid(false);
            setHeatingAreaFactorError(t("invoice.wrong_value_error"));
        }
    };

    const handleCancel = () => {
        handleAddingInvoiceConfirmClose();
    };

    const handleSubmit = () => {
        const addConsumptionDTO = {
            consumption: consumption,
            consumptionCost: consumptionCost,
            heatingAreaFactor: heatingAreaFactor,
        };
        axios.post(`${API_URL}/heat-distribution-centre/parameters/consumption-cost`, addConsumptionDTO, {
            headers: {
                Authorization: token
            }
        }).then(response => {
                handleAddingInvoiceConfirmClose();
                setWindowSuccessOpen(true);
            }
        ).catch(error => {
                handleAddingInvoiceConfirmClose();
                if (error.response.status == 409) {
                    setWindowOpen(true);
                } else {
                    setWindowErrorOpen(true);
                }
            }
        );
    };

    const handleConfirm = () => {
        navigate("/");
    };

    const handleClickOpen = () => {
        setConsumptionCostError("");
        setConsumptionError("");
        setHeatingAreaFactorError("");
        setOpen(true);
    };
    const handleCloseWindow = () => {
        setOpen(false);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    return (
        <div style={{overflow: 'hidden'}}>
            <Snackbar open={windowOpen} autoHideDuration={6000} onClose={handleConfirm}>
                <Alert onClose={handleConfirm} severity="warning" sx={{width: '100%'}}>
                    {t('invoice.already_added')}
                </Alert>
            </Snackbar>

            <Snackbar open={windowErrorOpen} autoHideDuration={6000} onClose={handleConfirm}>
                <Alert onClose={handleConfirm} severity="error" sx={{width: '100%'}}>
                    {t('invoice.error')}
                </Alert>
            </Snackbar>

            <Snackbar open={windowSuccessOpen} autoHideDuration={6000} onClose={handleConfirm}>
                <Alert onClose={handleConfirm} severity="success" sx={{width: '100%'}}>
                    {t('invoice.successfully_added')}
                </Alert>
            </Snackbar>

            <Grid container>
                <Box sx={{justifyContent: 'center', flexGrow: 1}}>
                    <Button onClick={() => handleClickOpen()}
                            style={buttonStyle}
                            variant="text">
                        <InvoiceIcon/>
                    </Button>
                </Box>
            </Grid>

            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>{t('invoice.fill_data')}</DialogTitle>
                <DialogContent>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <div style={{height: "100%", width: "30vh", overflow: "auto"}}>
                            <form>
                                <List>
                                    <ListItem>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="totalArea"
                                            label={t('invoice.consumption')}
                                            type="text"
                                            sx={{width: '100%'}}
                                            variant="standard"
                                            onChange={handleConsumptionChange}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <DialogContentText style={{
                                            fontSize: "13px",
                                            color: "red"
                                        }}>{consumptionError}</DialogContentText>
                                    </ListItem>
                                    <ListItem>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="communalAreaAggregate"
                                            label={t('invoice.consumptionCost')}
                                            type="text"
                                            sx={{width: '100%'}}
                                            variant="standard"
                                            onChange={handleConsumptionCostChange}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <DialogContentText style={{
                                            fontSize: "13px",
                                            color: "red"
                                        }}>{consumptionCostError}</DialogContentText>
                                    </ListItem>
                                    <ListItem>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="street"
                                            label={t('invoice.heatingAreaFactor')}
                                            type="text"
                                            sx={{width: '100%'}}
                                            variant="standard"
                                            onChange={handleHeatingAreaFactorChange}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <DialogContentText style={{
                                            fontSize: "13px",
                                            color: "red"
                                        }}>{heatingAreaFactorError}</DialogContentText>
                                    </ListItem>
                                </List>
                                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Button autoFocus color="inherit" onClick={handleCloseWindow}>
                                        {t('invoice.close')}
                                    </Button>
                                    <Button autoFocus color="inherit"
                                            disabled={!consumptionCostValid || !consumptionValid || !heatingAreaFactorValid}
                                            onClick={handleClickAddingInvoiceConfirmOpen}>
                                        {t('invoice.save')}
                                    </Button>
                                </Box>
                            </form>
                        </div>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog
                open={addInvoiceConfirmOpen}
                onClose={handleAddingInvoiceConfirmClose}>
                <DialogTitle>
                    {t('invoice.confirm')}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCancel}>{t('confirm.no')}</Button>
                    <Button onClick={handleSubmit}>{t('confirm.yes')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddInvoiceValues;