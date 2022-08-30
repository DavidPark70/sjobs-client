import React from 'react';
import { CardContent, Card, Container, Typography } from '@material-ui/core';
import useStyles from './styles';

const Faq = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
                <CardContent className={classes.innerCard}>
                    <Typography variant='h5' className={classes.cardTitle}>What is this website for?</Typography>
                    <Typography variant='body2'>To support job seekers with job posts that provide sponsorships. This website will only be accepting job posts that have sponsorship opportunities.</Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent className={classes.innerCard}>
                    <Typography variant='h5' className={classes.cardTitle}>How does it work?</Typography>
                    <Typography variant='body2'>Essentially, anybody that knows job opportunities with sponsorships can post it here. We will be taking the application URL so you can go directly to the company's site to apply.</Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent className={classes.innerCard}>
                    <Typography variant='h5' className={classes.cardTitle}>Contact</Typography>
                    <Typography variant='body2'>If you have any technical issues or have feedback for us let us please email us! flores7272022@gmail.com</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Faq;