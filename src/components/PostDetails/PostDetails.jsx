import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, Button, TextField } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import useStyles from './styles';
import { updatePostDescription, updatePostQualifications } from '../../actions/posts';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const [postData, setPostData] = useState({ title: '', description: '', qualifications: '', companyName: '', location: '', applicationUrl: '', jobType: '', salary: '' });
    const [descriptionButton, setDescriptionButton] = useState(false);
    const [qualificationsButton, setQualificationsButton] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: post?.title }));
        }
    }, [post]);

    const handleSubmitDescription = async (e) => {
        e.preventDefault();

        dispatch(updatePostDescription(post._id, { ...postData, name: user?.result?.name }));

        window.location.reload();
    };

    const handleSubmitQualifications = async (e) => {
        e.preventDefault();

        dispatch(updatePostQualifications(post._id, { ...postData, name: user?.result?.name }));

        window.location.reload();
    };

    if (!post) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size='7em' />
            </Paper>
        );
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    const openPost = (_id) => navigate(`/posts/${_id}`);

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant='h4' style={{ fontWeight: 'bold' }}>{post.title}</Typography>
                    <Typography>{post.companyName}</Typography>
                    <Typography>{post.location}</Typography>
                    <Button variant='contained' color='primary' href={post.applicationUrl}>Apply!</Button>
                    {(post.salary || post.Type) && (
                        <div>
                            <Divider style={{ margin: '20px 0' }} />
                            <Typography variant='h6' style={{ fontWeight: 'bold' }}>Job details</Typography>
                        </div>
                    )}
                    {post.salary && (
                        <div>
                            <Typography style={{ fontWeight: 'bold' }}>Salary</Typography>
                            <Typography>{post.salary}</Typography>
                        </div>
                    )}
                    {post.jobType && (
                        <div>
                            <Typography style={{ fontWeight: 'bold' }}>Job type</Typography>
                            <Typography>{post.jobType}</Typography>
                        </div>
                    )}
                    {post.qualifications && (
                        <div>
                            <Divider style={{ margin: '20px 0' }} />
                            <div className={classes.subSection}>
                                <Typography variant='h6' style={{ fontWeight: 'bold' }}>Qualifications</Typography>
                                {(user?.result?._id === post?.creator) && (
                                    <div className={classes.overlay2}>
                                        <Button size='small' onClick={() => setQualificationsButton(!qualificationsButton)}>
                                            <MoreHorizIcon fontSize='medium' />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {(qualificationsButton) ? (
                        <form autoComplete='off' noValidate onSubmit={handleSubmitQualifications}>
                            <TextField
                                name='description'
                                variant='outlined'
                                fullWidth
                                multiline
                                minRows={4}
                                value={postData.qualifications}
                                onChange={(e) => setPostData({ ...postData, qualifications: e.target.value })} />
                            <Button className={classes.buttonSubmit} variant='contained' color='primary' type='submit' fullWidth>Save</Button>
                        </form>
                    ) : (<Typography gutterBottom variant='body1' component='p'>{post.qualifications}</Typography>)}
                    <Divider style={{ margin: '20px 0' }} />
                    <div className={classes.subSection}>
                        <Typography variant='h6' style={{ fontWeight: 'bold' }}>Job description</Typography>
                        {(user?.result?._id === post?.creator) && (
                            <div className={classes.overlay2}>
                                <Button size='small' onClick={() => setDescriptionButton(!descriptionButton)}>
                                    <MoreHorizIcon fontSize='medium' />
                                </Button>
                            </div>
                        )}
                    </div>
                    {(descriptionButton) ? (
                        <form autoComplete='off' noValidate onSubmit={handleSubmitDescription}>
                            <TextField
                                name='description'
                                variant='outlined'
                                fullWidth
                                multiline
                                minRows={4}
                                value={postData.description}
                                onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
                            <Button className={classes.buttonSubmit} variant='contained' color='primary' type='submit' fullWidth>Save</Button>
                        </form>
                    ) : (<Typography gutterBottom variant='body1' component='p'>{post.description}</Typography>)}
                    <Typography variant='body1'>{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection post={post} />
                    <Divider style={{ margin: '20px 0' }} />
                </div>
            </div>
            {
                recommendedPosts.length && (
                    <div className={classes.section}>
                        <Typography gutterBottom variant='h5'>You might also like:</Typography>
                        <Divider />
                        <div className={classes.recommendedPosts}>
                            {recommendedPosts.map(({ title, name, description, likes, _id }) => (
                                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                    <Typography gutterBottom variant='h6'>{title}</Typography>
                                    <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                                    <Typography gutterBottom variant='subtitle2'>{description}</Typography>
                                    <Typography gutterBottom variant='subtitle1'>Likes: {likes.length}</Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </Paper >
    );
};

export default PostDetails;