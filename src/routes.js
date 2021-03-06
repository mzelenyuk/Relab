import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app';
import PostsIndex from './blog/components/posts_index';
import PostsNew from './blog/components/posts_new';
import PostsShow from './blog/components/posts_show';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex}/>
    <Route path="/posts/new" component={PostsNew}/>
    <Route path="/posts/:id" component={PostsShow}/>
  </Route>
);
