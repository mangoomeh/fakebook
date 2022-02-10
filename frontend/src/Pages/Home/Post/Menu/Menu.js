import React from "react";

const Menu = () => {
  return (
    <div
      onClick={() => {
        setEditPost(true);
        setEditPostInput(content);
      }}
    >
      <Button variant="outlined">edit post</Button>
    </div>
  );
};

export default Menu;
