import React from 'react';
import { useState } from 'react';
import AddDrawer from './AddDrawer';

const MAX_COMMENT_LENGTH = 500;

const AddReplyDrawer = ({ handleAddReply, handleCloseReplyDrawer }) => {
  const [newReply, setNewReply] = useState('');

  return (
    <AddDrawer
      handleCheckButtonClick={() => handleAddReply(newReply)}
      handleCancelButtonClick={handleCloseReplyDrawer}
      textValue={newReply}
      setTextValue={setNewReply}
      placeholder={"Enter Reply"}
      maxLength={MAX_COMMENT_LENGTH}
    />
  );
};


export default AddReplyDrawer;
