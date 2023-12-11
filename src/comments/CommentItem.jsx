import React, { useState } from 'react';
import classNames from 'classnames';
import moment from 'moment-timezone';
import { Check, Icon, Button, Avatar } from '@mdsol/onex-design';
import ReplyItem from './ReplyItem';
import AddReplyDrawer from './AddReplyDrawer';
import './CommentItem.scss';

const CommentItem = ({
  activeReplyDrawerCommentUuid,
  comment,
  handleAddReplyOnComment,
  handleLoadCommentReplies,
  handleResolveComment,
  hasWriteCommentAccess,
  selectedFilterOption,
  setActiveReplyDrawerCommentUuid,
}) => {
  const {
    created_by: author,
    body,
    created_at: createdAt,
    number_of_replies: numberOfReplies,
    replies,
    is_resolved: resolved,
    uuid,
  } = comment;
  const [showReplies, setShowReplies] = useState(false);
  const repliesText = showReplies || numberOfReplies > 1 ? 'Replies' : 'Reply';
  const timestamp = moment(createdAt)
    .local()
    .format('hh:mma DD-MMM-YYYY');
  const expandIcon = showReplies ? 'expand_less' : 'expand_more';
  const displayComment =
    selectedFilterOption === 'all' ||
    (selectedFilterOption === 'open' && !resolved) ||
    (selectedFilterOption === 'resolved' && resolved);

  const handleToggleShowReplies = async () => {
    if (!replies) {
      await handleLoadCommentReplies(uuid);
    }
    setShowReplies(!showReplies);
  };
  const handleAddReply = async newReplyText => {
    const toShowReplies = await handleAddReplyOnComment(uuid, newReplyText);
    setShowReplies(toShowReplies);
  };

  return (
    <>
      {displayComment && (
        <div className={classNames('comment-item-container', { resolved: resolved })}>
          <div className="comment-item-header-row">
            <div className="comment-item-header-meta">
              <Avatar size="xs" _isButton={false} />
              <p className="comment-item-author">{author}</p>
              <p className="comment-item-timestamp">{timestamp}</p>
            </div>
            <Check
              className={classNames('comment-item-resolve', { 'replies-collapsed': showReplies })}
              dataTestId="comment-resolve-btn"
              checked={resolved}
              size="sm"
              disabled={!hasWriteCommentAccess || resolved}
              onChange={() => handleResolveComment(uuid)}
            >
              {'Resolve'}
            </Check>
          </div>
          <p className="comment-item-body">{body}</p>
          {numberOfReplies > 0 && (
            <div className="comment-item-replies-header">
              <span
                className={classNames('comment-item-replies-collapse-button', { collapsed: showReplies })}
                onClick={handleToggleShowReplies}
              >
                {!showReplies && `${numberOfReplies} `}
                {repliesText}
                <Icon>{expandIcon}</Icon>
              </span>
              <span className="comment-item-replies-divider"></span>
            </div>
          )}
          {showReplies && (
            <div data-testid="replies-list">{replies?.map(reply => <ReplyItem key={reply.uuid} reply={reply} />)}</div>
          )}

          {!resolved && activeReplyDrawerCommentUuid !== uuid && (
            <Button
              className="comment-item-reply-btn"
              dataTestId="comment-reply-btn"
              buttonType="icon"
              variant="secondary"
              buttonStyle="ghost"
              disabled={!hasWriteCommentAccess || activeReplyDrawerCommentUuid}
              onClick={() => setActiveReplyDrawerCommentUuid(uuid)}
            >
              <Icon className="reply-icon">reply</Icon>
              {'reply'}
            </Button>
          )}
          {activeReplyDrawerCommentUuid === uuid && (
            <AddReplyDrawer
              handleAddReply={handleAddReply}
              handleCloseReplyDrawer={() => setActiveReplyDrawerCommentUuid(null)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CommentItem;
