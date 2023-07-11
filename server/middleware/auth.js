import jwt, { decode } from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500; // if token length is greater than 500 then it's a google Oauth token

    let decoded_data;
    if (token && isCustomAuth) {
      decoded_data = jwt.verify(token, 'test');
      req.userId = decoded_data?.id;
    } else {
      decoded_data = decode(token);
      req.userId = decoded_data?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
