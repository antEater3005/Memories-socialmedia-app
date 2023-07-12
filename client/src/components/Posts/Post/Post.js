import React, { useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  CardMedia,
  Typography,
  ButtonBase,
} from '@material-ui/core';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHoriIcon from '@material-ui/icons/MoreHoriz';
import useStyle from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const user = JSON.parse(localStorage.getItem('profile'));

  // console.log(user);
  useEffect(() => {}, [dispatch]);
  const navigate = useNavigate();
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.userData?.sub || user?.userData?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;
          {`${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
    {/* not working */}
      {/* <ButtonBase
        className={classes.cardActions}
        onClick={openPost}
        component='span'
        name='test'
      ></ButtonBase> */}
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        title={post.title}
        component='div'
      />
      <div className={classes.overlay}>
        <Typography variant='h6'> {post.creatorName} </Typography>
        <Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size='small'
          onClick={(e) => {
            e.stopPropagation();
            setCurrentId(post._id);
          }}
        >
          <MoreHoriIcon fontSize='medium' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary' component='h2'>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant='h5' component='h2'>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.message.split(' ').splice(0, 20).join(' ')}...
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          onClick={() => dispatch(likePost(post._id))}
          disabled={!user?.userData}
        >
          <Likes />
        </Button>
        {}
        <Button
          size='small'
          color='primary'
          onClick={() => dispatch(deletePost(post._id))}
          disabled={
            !(
              user?.userData?.sub === post.creator ||
              user?.userData?._id === post.creator
            )
          }
        >
          <DeleteIcon fontSize='small' />
          &nbsp;
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
