import * as React from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, runTransaction } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const RegisterUser = () => {

    // const [data, setData] = useState({
    //     firstName: '',
    //     lastName: '',
    //     username: '',
    //     password: '',
    // });
    const theme = createTheme();

    // const handleUpdateField = e => {
    //     setData({
    //         ...data,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            const res = await createUserWithEmailAndPassword(auth, data.get('email'), data.get('password'));
            const user = res.user;

            const adminRef = doc(db, "profile", data.get('email'));
            const userStoresRef = doc(db, "userStores", data.get('email'));

            await runTransaction(db, async (transaction) => {
                await transaction.set(adminRef, {
                    uid: user.uid,
                    authProvider: "local",
                    email: data.get('email'),
                    firstName: data.get('firstName'),
                    lastName: data.get('lastName')
                })
                await transaction.set(userStoresRef, {
                    "ids": []
                })
            })
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleOnSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider>



    )
}

export default RegisterUser;