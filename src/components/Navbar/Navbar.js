import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { AppBar, Button, Toolbar, Typography, Avatar } from '@material-ui/core';
import * as actionType from '../../constants/actionTypes';
import sjobs from '../../images/sJobs-logo.png';
import useStyles from './styles';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        navigate('/');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img className={classes.image} src={sjobs} alt='sjobs' height='80'></img>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} color='primary'>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} onClick={logout} color='primary'>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                        <Button component={Link} to='/faq' variant='contained' style={{ marginLeft: '10px' }} color='primary'>FAQ</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;