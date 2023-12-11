import React, { useState } from 'react';
import AddDrawer from './AddDrawer';

const MAX_COMMENT_LENGTH = 500;

const AddCommentDrawer = ({ handleAddComment, handleCloseCommentDrawer }) => {
  const [newComment, setNewComment] = useState('');

  return (
    <div className="comments-add-drawer">
      <AddDrawer
        handleCheckButtonClick={() => handleAddComment(newComment)}
        handleCancelButtonClick={handleCloseCommentDrawer}
        textValue={newComment}
        setTextValue={setNewComment}
        placeholder={"add comment"}
        maxLength={MAX_COMMENT_LENGTH}
      />
    </div>
  );
};


export default AddCommentDrawer;
