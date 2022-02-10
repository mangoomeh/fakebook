import React, { useState } from "react";
import styles from "./CommentInputBar.module.css";

const CommentInputBar = ({ makeComment, commentInput, setCommentInput }) => {
  return (
    <form className="container" id={styles.container} onSubmit={makeComment}>
      <input
        id={styles.commentInput}
        placeholder="Add a comment"
        onChange={(e) => {
          setCommentInput(e.target.value);
        }}
        value={commentInput}
      />
    </form>
  );
};

export default CommentInputBar;
