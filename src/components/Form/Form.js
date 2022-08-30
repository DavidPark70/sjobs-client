import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { createPost, updatePost } from '../../actions/posts';
import LocationSearchInput from './LocationSearchInput/LocationSearchInput';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', description: '', qualifications: '', companyName: '', location: '', applicationUrl: '', jobType: '', salary: '' });
    const [address, setAddress] = useState('');
    const [sponsorship, setSponsorship] = useState('');
    const [showForm, setShowForm] = useState(false);
    const post = useSelector((state) => (currentId ? state.posts.posts.find((description) => description._id === currentId) : null));
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', description: '', qualifications: '', companyName: '', location: '', applicationUrl: '', jobType: '', salary: '' });
    };

    useEffect(() => {
        if (!post?.title) clear();
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sponsorship) {
            alert('We are only accepting job posts that provides sponsorships :)');
            clear();
        } else if (!postData.title || !postData.applicationUrl || !postData.description) {
            alert('Please make sure you have all the required fields. Required fields are denoted with (*).');
        } else {
            if (!currentId) {
                dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
                clear();
            } else {
                dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
                clear();
            }
        }
    };

    const handleSelect = async (value) => {
        setAddress(value);
        setPostData({ ...postData, location: value });
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own job posts.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            {(window.screen.width < 600 && !showForm) ?
                (<Button
                    className={classes.buttonSubmit}
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                    onClick={() => setShowForm(true)}>
                    Post a Job!
                </Button>) :
                (<form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant='h6'>Post a job!</Typography>
                    <FormControl fullWidth variant='outlined' style={{ margin: '8px' }} required>
                        <InputLabel required id='sponsorship-label'>Sponsorship</InputLabel>
                        <Select
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left'
                                },
                                getContentAnchorEl: null
                            }}
                            labelId='sponsorship-label'
                            label='Sponsorship'
                            id='sponsorship'
                            value={sponsorship}
                            onChange={(e) => setSponsorship(e.target.value)}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name='title'
                        variant='outlined'
                        label='Job title'
                        fullWidth
                        required
                        value={postData.title}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    />
                    <TextField
                        name='description'
                        variant='outlined'
                        label='Description'
                        required
                        fullWidth
                        multiline
                        minRows={4}
                        value={postData.description}
                        onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                    />
                    <TextField
                        name='qualifications'
                        variant='outlined'
                        label='Qualifications'
                        fullWidth
                        multiline
                        minRows={4}
                        value={postData.qualifications}
                        onChange={(e) => setPostData({ ...postData, qualifications: e.target.value })}
                    />
                    <TextField
                        name='companyName'
                        variant='outlined'
                        label='Company name'
                        fullWidth
                        value={postData.companyName}
                        onChange={(e) => setPostData({ ...postData, companyName: e.target.value })}
                    />
                    <LocationSearchInput address={address} setAddress={setAddress} handleSelect={handleSelect} />
                    <TextField
                        required
                        name='applicationUrl'
                        variant='outlined'
                        label='Application url'
                        fullWidth
                        value={postData.applicationUrl}
                        onChange={(e) => setPostData({ ...postData, applicationUrl: e.target.value })}
                    />
                    <FormControl fullWidth variant='outlined' style={{ margin: '8px' }}>
                        <InputLabel id='job-type-label'>Job type</InputLabel>
                        <Select
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left'
                                },
                                getContentAnchorEl: null
                            }}
                            labelId='job-type-label'
                            label='Job type'
                            id='job-type'
                            value={postData.jobType}
                            onChange={e => setPostData({ ...postData, jobType: e.target.value })}
                        >
                            <MenuItem value='remote'>Remote</MenuItem>
                            <MenuItem value='hybrid'>Hybrid</MenuItem>
                            <MenuItem value='onsite'>On Site</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name='salary'
                        variant='outlined'
                        label='Salary'
                        fullWidth
                        value={postData.salary}
                        onChange={e => setPostData({ ...postData, salary: e.target.value })}
                    />
                    <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                    <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
                </form>)}
        </Paper>
    );
}

export default Form;