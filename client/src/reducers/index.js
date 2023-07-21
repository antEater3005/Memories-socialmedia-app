import { combineReducers } from 'redux';

import posts from './posts';
import authReducer from './auth';

export const reducers = combineReducers({ posts, authReducer });
 