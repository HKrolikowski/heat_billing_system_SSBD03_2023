import Box from "@mui/material/Box";
import React, {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {API_URL} from "../../consts";
import axios from 'axios';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import EditPersonalData from "../personalData/EditPersonalData";
import EditPassword from "../passwords/EditPassword";
import EditEmail from "../email/EditEmail";
import {Owner} from "../../types/owner";
import ChangePhoneNumber from "../owner/ChangePhoneNumber";
import UserIcon from "../icons/UserIcon";

const OwnerProfile = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const token = "Bearer " + localStorage.getItem("token");
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [owner, setOwner] = useState<Owner | null>(null);

    const fetchData = async () => {
        axios.get(`${API_URL}/accounts/self/owner`, {
            headers: {
                'Authorization': token
            }
        }).then(response => {
            setOwner(response.data);
        }).catch(error => {
            if (error.response.status == 403) navigate('/');
        });
    };


    useEffect(() => {
        fetchData();
    }, [role]);

    return (
        <div style={{height: '90vh', width: '100vw', boxSizing: 'border-box', left: 0, right: 0, bottom: 0}}>
            <Grid container justifyContent="center" alignItems="center"
                  sx={{background: 'rgb(163 121 230 / 12%)', height: '100%', width: '100%'}}>
                <Grid my={2} item sm={8} md={5} component={Paper} elevation={6}>
                    <Box component="form" sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '2vh'
                    }}>
                        <Typography sx={{padding: '1vh'}} variant="h4">{t('profile.title')}</Typography>
                        <UserIcon/>
                    </Box>
                    <Box sx={{my: 30, display: 'flex', flexDirection: 'column', alignItems: 'left', margin: '2vh'}}>
                        {owner !== null && (
                            <>
                                <Paper elevation={3} style={{position: 'relative'}}>
                                    <div style={{position: 'absolute', top: '1vh', right: '1vh'}}>
                                        <EditPersonalData/>
                                    </div>
                                    <Typography sx={{padding: '1vh'}} variant="h5">
                                        <b>{t('personal_data.name')}:</b> {owner.firstName}
                                    </Typography>
                                    <Typography sx={{padding: '1vh'}} variant="h5">
                                        <b>{t('personal_data.surname')}:</b> {owner.surname}
                                    </Typography>
                                </Paper>
                                <Paper elevation={3} style={{position: 'relative'}}>
                                    <Typography sx={{padding: '1vh'}}
                                                variant="h5"><b>{t('login.username')}:</b> {owner.username}
                                    </Typography>
                                </Paper>
                                <Paper elevation={3} style={{position: 'relative'}}>
                                    <div style={{position: 'absolute', top: '1vh', right: '1vh'}}>
                                        <EditEmail/>
                                    </div>
                                    <Typography sx={{padding: '1vh'}}
                                                variant="h5"><b>{t('register.email')}:</b> {owner.email}</Typography>
                                </Paper>
                                <Paper elevation={3} style={{position: 'relative'}}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '1vh',
                                        right: '1vh',
                                        display: 'flex',
                                        gap: '0.5vh'
                                    }}>
                                        <ChangePhoneNumber/>
                                    </div>
                                    <Typography sx={{padding: '1vh'}}
                                                variant="h5"><b>{t('register.phone_number')}:</b> {owner.phoneNumber}
                                    </Typography>
                                </Paper>
                                <Paper elevation={3} style={{position: 'relative'}}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '1vh',
                                        right: '1vh',
                                        display: 'flex',
                                        gap: '0.5vh'
                                    }}>
                                        <EditPassword/>
                                    </div>
                                    <Typography sx={{padding: '1vh'}}
                                                variant="h5"><b>{t('profile.user_password')}{owner.username}</b>
                                    </Typography>
                                </Paper>
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
export default OwnerProfile;