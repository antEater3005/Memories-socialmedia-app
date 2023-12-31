import React, { useState, useEffect } from 'react';

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyle from './styles';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const loggedInUser = JSON.parse(localStorage.getItem('profile'));

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
    setCurrentId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId)
      dispatch(
        updatePost(currentId, {
          ...postData,
          creatorName: loggedInUser?.userData.name,
        })
      );
    else
      dispatch(
        createPost(
          { ...postData, creatorName: loggedInUser?.userData.name },
          navigate
        )
      );
    clear();
  };
  if (!loggedInUser?.userData?.name) {
    return (
      <Paper className={classes.paper} raised='true' elevation={6}>
        <Typography variant='h6' align='center'>
          Please log in to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper
      className={`${classes.paper} ${classes.paper}`}
      raised='true'
      elevation={6}
    >
      <form
        autoComplete='off'
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? 'Edit' : 'Create'} a Memory
          <TextField
            name='title'
            variant='outlined'
            label='Title'
            fullWidth
            value={postData.title}
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
          />
          <TextField
            name='message'
            variant='outlined'
            label='Message'
            fullWidth
            multiline
            minRows={4}
            value={postData.message}
            onChange={(e) => {
              setPostData({ ...postData, message: e.target.value });
            }}
          />
          <TextField
            name='tags'
            variant='outlined'
            label='Tags(coma separated)'
            fullWidth
            value={postData.tags}
            onChange={(e) => {
              setPostData({ ...postData, tags: e.target.value.split(',') });
            }}
          />
        </Typography>
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          type='submit'
          color='primary'
          size='large'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
