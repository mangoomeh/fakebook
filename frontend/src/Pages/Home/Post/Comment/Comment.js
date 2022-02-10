import React from "react";
import styles from "./Comment.module.css"

const Comment = ({ user_name, user_surname, timestamp, content }) => {
  return (
    <div id={styles.container}>
      <div id={styles.userAndContent}>
        <div id={styles.userName}>{`${user_name} ${user_surname}`}</div>
        <div id={styles.content}>{content}</div>
      </div>
      <div className="timestamp">{new Date(timestamp).toLocaleString()}</div>
    </div>
  );
};

export default Comment;
