import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post }) => {
    const [likes, setLikes] = useState(post?.likes);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();

    const userId = user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId))
        } else {
            setLikes([...post.likes, userId]);
        }
    };

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <><ThumbUpAltIcon fontSize='small' />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize='small' />&nbsp;Like</>;
    };

    const openPost = () => navigate(`/posts/${post._id}`);

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <Typography className={classes.title} variant="h5" style={{ fontWeight: 'bold' }}>{post.title}</Typography>
                <Typography className={classes.subtitle} variant="subtitle1">{post.companyName}</Typography>
                <Typography className={classes.subtitle} variant="subtitle1">{post.location}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {(post.description.length > 200) ? (post.description.substring(0, 200).concat(' ', '...read more!')) : (post.description)}
                    </Typography>
                </CardContent>
                <div className={classes.overlay}>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?._id === post?.creator) && (
                    <Button size='small' color='secondary' onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small' />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;