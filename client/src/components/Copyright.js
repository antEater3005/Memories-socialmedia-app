import React from 'react';

import useStyle from './style';

const Copyright = () => {
  const classes = useStyle();
  return (
    <div className={classes.copyright}>
      <p>
        &copy; {new Date().getFullYear()} YourWebsite.com. All rights reserved.{' '}
        <br />
        Create by{' '}
        <a href='https://github.com/antEater3005/Memories-socialmedia-app'>
          Avinash Chaurasiya
        </a>
      </p>
    </div>
  );
};

export default Copyright;
