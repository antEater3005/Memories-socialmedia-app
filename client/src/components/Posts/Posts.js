import React from 'react';
import { Grid, CircularProgress, Paper } from '@material-ui/core';

import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyle from './styles';

const Posts = ({ setCurrentId }) => {
  const classes = useStyle();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts?.length && !isLoading) {
    return 'No Posts';
  }

  return isLoading ? (
    <CircularProgress size={75} />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
