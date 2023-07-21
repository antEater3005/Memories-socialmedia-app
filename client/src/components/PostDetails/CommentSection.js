import React, { useRef, useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { commentPost } from '../../actions/posts';
const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'))?.userData;
  const commentsRef = useRef();

  const submitComment = async () => {
    const finalComment = `${user.name}: ${comment}`;
    const newComment = await dispatch(commentPost(finalComment, post._id));
    setComments(newComment);
    setComment('');

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className={classes.commentsOuterContainer}>
      <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant='h6'>
          Comments
        </Typography>
        {comments.map((comm, idx) => (
          <Typography key={idx} gutterBottom variant='subtitle1'>
            <strong>{comm.split(':')[0]}</strong>: {comm.split(':')[1]}
          </Typography>
        ))}
        <div ref={commentsRef} />
      </div>
      {user ? (
        <div style={{ width: '60%' }}>
          <Typography gutterBottom variant='h6'>
            <TextField
              fullWidth
              minRows={4}
              variant='outlined'
              label='Comment'
              multiline
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              variant='contained'
              disabled={!comment}
              color='primary'
              onClick={submitComment}
            >
              Comment
            </Button>
          </Typography>
        </div>
      ) : null}
    </div>
  );
};

export default CommentSection;
