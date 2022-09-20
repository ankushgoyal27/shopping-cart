import * as React from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const SignIn = () => {

    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const theme = createTheme();

    useEffect(() => {
        if (user) navigate('/cart')
    }, [navigate, user]);


    const handleUpdateField = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        try {
            const userDoc = await signInWithEmailAndPassword(auth, data.get('email'), data.get('password'));
            console.log(userDoc);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
        e.preventDefault();
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleOnSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        // <form onSubmit={handleOnSubmit}>
        //     <Container>
        //         <Row>
        //             <Col>
        //                 <label>Enter Username</label>
        //                 <input type="text" value={data.username} name="username" onChange={handleUpdateField} />
        //             </Col>
        //         </Row>
        //         <Row>
        //             <Col>
        //                 <label>Enter Password</label>
        //                 <input type="password" value={data.password} name="password" onChange={handleUpdateField} />
        //             </Col>
        //         </Row>
        //         <Row>
        //             <Col>
        //                 <button type="submit">Sign In</button>
        //             </Col>
        //         </Row>
        //     </Container>
        // </form>
    )
}

export default SignIn;