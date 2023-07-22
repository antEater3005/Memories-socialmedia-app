import React from 'react';

import useStyle from './style';

const Copyright = () => {
  const classes = useStyle();
  return (
    <div className={classes.copyright}>
      <p>
        &copy; {new Date().getFullYear()}{' '}
        <a
          style={{ textDecoration: 'none', fontWeight: 'bold' }}
          href='https://memories-mern-app2.netlify.app/posts'
        >
          Memories.com
        </a>
        . All rights reserved.
        <br />
        Create by{' '}
        <a
          style={{ textDecoration: 'none', fontWeight: 'bold' }}
          href='https://github.com/antEater3005/Memories-socialmedia-app'
        >
          Avinash Chaurasiya
        </a>
      </p>
    </div>
  );
};

export default Copyright;
