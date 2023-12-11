import React from 'react';
import moment from 'moment-timezone';
import { Avatar } from '@mdsol/onex-design';
import './ReplyItem.scss';

const ReplyItem = ({ reply }) => {
  const { body, created_at: createdAt, created_by: author } = reply;
  const timestamp = moment
    .utc(createdAt)
    .local()
    .format('hh:mma DD-MMM-YYYY');

  return (
    <div className="reply-item-container">
      <div className="reply-item-header-row">
        <div className="reply-item-header-meta">
          <Avatar size="xs" _isButton={false} />
          <p className="reply-item-author">{author}</p>
          <p className="reply-item-timestamp">{timestamp}</p>
        </div>
      </div>
      <p className="reply-item-body">{body}</p>
    </div>
  );
};

export default ReplyItem;
