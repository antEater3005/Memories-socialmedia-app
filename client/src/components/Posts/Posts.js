import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyle from './styles';

const Posts = ({ setCurrentId }) => {
  const classes = useStyle();
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
