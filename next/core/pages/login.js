import { Avatar, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Router from 'next/router';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export const Login = () => {
    const classes = useStyles();
    const [csrfToken, setCsrfToken] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    React.useEffect(() => {

        fetch("http://127.0.0.1:8000/account/csrf/", {
            credentials:"include",
        })
        .then((res) => {
            let csrfToken = res.headers.get("X-CSRFToken")
            setCsrfToken(csrfToken);
            console.log(csrfToken)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:8000/account/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify({username: username, password: password}),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Connecting problem');
          }
        }).then((data) => {
            Router.push('/dashboard');
            console.log(data)
        }).catch((err) => {
            console.log(err);
            setError("Connection issue.") 
        });
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    {error}
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="password"
                            value={password}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="current password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In 
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot Password?
                                </Link>
                            </Grid>

                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Dont't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default Login;