import React from 'react';

const Post = ({timestamp, content, user_name}) => {
  return (
    <div>
      <div>{user_name}</div>
      <div>{content}</div>
      <div>{(new Date(timestamp)).toLocaleString()}</div>
    </div>
  );
};

export default Post;