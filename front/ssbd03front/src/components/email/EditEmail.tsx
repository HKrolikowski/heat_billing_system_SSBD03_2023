import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Alert, Snackbar, TextField} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from 'axios';
import {API_URL} from '../../consts';
import {useTranslation} from "react-i18next";

const EditEmail = () => {
    const {t} = useTranslation();
    const token = "Bearer " + localStorage.getItem("token");
    const [version, setVersion] = useState("");
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [email, setEmail] = useState("");

    const [emailError, setEmailError] = useState("");
    const [dataError, setDataError] = useState("");

    const [emailValid, setEmailValid] = useState(false);

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorOpenMessage, setErrorOpenMessage] = useState("");

    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const handleNewEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        let email = event.target.value;
        setEmail(email);
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,10}$/;
        if (!regex.test(email)) {
            setEmailError(t('register.email_error'));
            setEmailValid(false);
        } else {
            setEmailError("");
            setEmailValid(true);
        }
    };

    const handleClickOpen = () => {
        const fetchData = async () => {
            await axios.get(`${API_URL}/accounts/self`, {
                headers: {
                    Authorization: token
                }
            })
                .then(response => {
                    localStorage.setItem("etag", response.headers["etag"]);
                    setVersion(response.data.version)
                });
        };
        fetchData();
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
        window.location.reload();
    };

    const handleConfirmClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setConfirmOpen(false);
        }
    }

    const handleConfirmConfirm = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setConfirmOpen(false);
        }
        const changeEmailDTO = {
            newEmail: email.toString(),
            version: parseInt(version)
        }

        axios.patch(`${API_URL}/accounts/self/email`,
            changeEmailDTO, {
                headers: {
                    'Authorization': token,
                    'If-Match': localStorage.getItem("etag"),
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                setSuccessOpen(true);
            })
            .catch(error => {
                setErrorOpenMessage(t('email.failure_title'))
                setErrorOpen(true);
            });
        handleClose(event, reason);
    }

    const handleConfirm = () => {
        if (emailValid) {
            setDataError("");
            setConfirmOpen(true);
        } else {
            setDataError(t('register.email_error'));
        }
    }

    const handleSuccessClose = () => {
        setEmail("");
        setSuccessOpen(false);
    }

    const handleErrorClose = () => {
        setErrorOpen(false);
    };
    
    return (
        <div>
            <div>
                <Button onClick={handleClickOpen} variant="contained">{t('email.title')}</Button>
            </div>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>{t('email.form_title')}</DialogTitle>
                <DialogContent>
                    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                        <form onSubmit={handleSumbit}>
                            <List component="nav" aria-label="mailbox folders">
                                <ListItem>
                                    <div className="form-group" onChange={handleNewEmail}>
                                        <TextField
                                            id="outlined-helperText"
                                            label={t('email.new_email')}
                                            defaultValue={email}
                                            type="email"
                                            helperText={t('email.new_email_text')}
                                        />
                                        <div className="form-group">
                                            {emailError}
                                        </div>
                                    </div>
                                </ListItem>
                            </List>
                            <div className="form-group">
                                {dataError}
                            </div>
                        </form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('confirm.cancel')}</Button>
                    <Button onClick={handleConfirm} disabled={!emailValid}>{t('confirm.ok')}</Button>
                </DialogActions>
            </Dialog>

            <Dialog disableEscapeKeyDown open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>{t('email.confirm_changes')}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>{t('confirm.no')}</Button>
                    <Button onClick={handleConfirmConfirm}>{t('confirm.yes')}</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success" sx={{width: '100%'}}>
                    {t('email.success_title')}
                </Alert>
            </Snackbar>

            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{width: '100%'}}>
                {t('errorOpenMessage')}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default EditEmail;