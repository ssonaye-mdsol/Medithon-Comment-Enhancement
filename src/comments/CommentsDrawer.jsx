import React, { useState, useRef, useEffect } from 'react';
import { Button, EmptyState, Icon, Offcanvas, Select } from '@mdsol/onex-design';
import CommentItem from './CommentItem';
import AddCommentDrawer from './AddCommentDrawer';
import './CommentsDrawer.scss';
import  { getData }  from '../API/getUser'
import { useNavigate , useParams } from "react-router-dom"


const sortCommentsByLatestActivity = comments =>
  comments.sort((comment1, comment2) => (comment2.updated_at > comment1.updated_at ? 1 : -1));

const CommentsDrawer = ({ editCheck, resourceURI }) => {
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState({ value: 'open', label: 'Open' });
  const [comments, setComments] = useState([]);
  const [commentRepliesMap, setCommentRepliesMap] = useState({});
  const [showAddCommentDrawer, setShowAddCommentDrawer] = useState(false);
  const [activeReplyDrawerCommentUuid, setActiveReplyDrawerCommentUuid] = useState(null);
  const [hasUnresolvedComments, setHasUnresolvedComments] = useState(false);
  const commentsDrawerRef = useRef(null);
  let params = useParams();
  const navigate = useNavigate();
  const filterOptions = [
    { value: 'open', label: 'Open' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'all', label: 'All' },
  ];
  useEffect(() => {
    if(params.ecId !== undefined && showCommentsDrawer){
      setShowCommentsDrawer(true)
    }
    console.log(editCheck);
    const data = getData().then((response) => {
      console.log(response.data);
    });
  })
  useEffect(() => {
    const loadComments = async () => {
      try {
        const allResourceComments = [
          {
              "uuid": "4430d335-4de5-4eee-b6b2-f2a21896faa5",
              "body": "Comment to resolve",
              "created_by": "Ritik Jaiswal",
              "created_at": "2023-12-05T08:56:16.250Z",
              "updated_by": "Ritik Jaiswal",
              "updated_at": "2023-12-05T08:56:17.677Z",
              "is_resolved": true,
              "resource_uri": "com:mdsol:schedules:8b9a4cb6-3757-4121-979a-c44df17eb8c5",
              "number_of_replies": 0
          },
          {
              "uuid": "e59a2050-48e6-48c2-ae70-542fd63b10b6",
              "body": "New comment",
              "created_by": "Ritik Jaiswal",
              "created_at": "2023-12-05T08:55:47.812Z",
              "updated_by": "Ritik Jaiswal",
              "updated_at": "2023-12-05T08:56:01.982Z",
              "is_resolved": false,
              "resource_uri": "com:mdsol:schedules:8b9a4cb6-3757-4121-979a-c44df17eb8c5",
              "number_of_replies": 1
          }
      ];
        setHasUnresolvedComments(allResourceComments.some(comment => !comment.is_resolved));
        setComments(allResourceComments);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    loadComments();
  }, [resourceURI]);

  const handleAddComment = async newComment => {
    try {
      const commentBody = {
        body: newComment.trim(),
        resource_uri: resourceURI,
      };
      const addedComment = {
        "uuid": "c743d1c4-1394-4410-a845-2560e7a40832",
        "body": "One more comment",
        "created_by": "Ritik Jaiswal",
        "created_at": "2023-12-05T08:57:57.930Z",
        "updated_at": "2023-12-05T08:57:57.930Z",
        "is_resolved": false,
        "resource_uri": "com:mdsol:schedules:8b9a4cb6-3757-4121-979a-c44df17eb8c5",
        "number_of_replies": 0
    };
      const updatedComments = [addedComment, ...comments];
      setComments(updatedComments);
      setHasUnresolvedComments(true);
      setShowAddCommentDrawer(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleCloseCommentsDrawer = () => {
    setSelectedFilterOption({ value: 'open', label: 'Open'});
    setShowAddCommentDrawer(false);
    setShowCommentsDrawer(false);
    navigate(`/study/${editCheck.StudyId}`)
  };

  const handleLoadCommentReplies = async commentUuid => {
    try {
      const commentReplies = [
        {
            "uuid": "9401fa73-3861-410e-a498-017d5b45e041",
            "comment_uuid": "e59a2050-48e6-48c2-ae70-542fd63b10b6",
            "body": "A reply on comment",
            "created_at": "2023-12-05T08:56:01.982Z",
            "created_by": "Ritik Jaiswal"
        }
    ];
      const updatedCommentRepliesMap = Object.assign({}, commentRepliesMap);
      updatedCommentRepliesMap[commentUuid] = commentReplies;
      setCommentRepliesMap(updatedCommentRepliesMap);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const handleAddReplyOnComment = async (commentUuid, newReplyText) => {
    let toShowReplies = true;
    try {
      const replyBody = {
        body: newReplyText.trim(),
      };
      const addedReply = {
        "uuid": "6f8caa5b-f160-43fc-80fe-75733ae26517",
        "comment_uuid": "c743d1c4-1394-4410-a845-2560e7a40832",
        "body": "A new reply",
        "created_at": "2023-12-05T09:52:39.212Z",
        "created_by": "Ritik Jaiswal"
    };
      const updatedComments = [...comments];
      const commentIndex = updatedComments.findIndex(comment => comment.uuid === addedReply.comment_uuid);
      const commentToUpdate = updatedComments[commentIndex];
      if (!commentToUpdate.number_of_replies) {
        commentToUpdate.replies = [addedReply];
      } else if (commentToUpdate.replies) {
        commentToUpdate.replies.push(addedReply);
      } else {
        await handleLoadCommentReplies(commentUuid);
      }
      commentToUpdate.updated_at = addedReply?.created_at;
      commentToUpdate.number_of_replies += 1;
      setComments(updatedComments);
      setActiveReplyDrawerCommentUuid(null);
    } catch (error) {
      console.error(error);
      toShowReplies = false;
    } 
    return toShowReplies;
  };

  const handleResolveComment = async commentUuid => {
    try {
      const resolvedComment = {
        "uuid": "c743d1c4-1394-4410-a845-2560e7a40832",
        "body": "One more comment",
        "created_by": "Ritik Jaiswal",
        "created_at": "2023-12-05T08:57:57.930Z",
        "updated_at": "2023-12-05T09:53:24.141Z",
        "is_resolved": true,
        "resource_uri": "com:mdsol:schedules:8b9a4cb6-3757-4121-979a-c44df17eb8c5",
        "number_of_replies": 1
    };
      const updatedComments = comments.map(comment => {
        if (comment.uuid === commentUuid) {
          resolvedComment.replies = comment.replies;
          return resolvedComment;
        }
        return comment;
      });
      setHasUnresolvedComments(updatedComments.some(comment => !comment.is_resolved));
      setActiveReplyDrawerCommentUuid(null);
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
      throw error;
    } 
  };

  const openDrawer = () =>{
    navigate(`/study/${editCheck.StudyId}/edit_check/${editCheck.Id}`);
    setShowCommentsDrawer(true);
  }

  return (
    <div ref={commentsDrawerRef} className="comments-drawer-container">
      <Button
        className="comments-button"
        onClick={openDrawer}
        size="md"
        variant="secondary"
        dataTestId="comments-button"
      >
        <Icon className={'unresolved-comments-icon'}>comment</Icon>
      </Button>
      <Offcanvas
        hasActionsBlock={false}
        onHide={handleCloseCommentsDrawer}
        show={showCommentsDrawer}
        title={'Comments'}
        subTitle={editCheck.Name}
        container={commentsDrawerRef}
      >
          <div className="comments-action-row">
            <Button
              dataTestId="comments-add-comment-btn"
              className="button-theme"
              onClick={() => setShowAddCommentDrawer(true)}
              disabled={!true || showAddCommentDrawer}
            >
              {'Add comment'}
            </Button>
            <Select
              className="comments-filter"
              closeMenuOnSelect={true}
              isClearable={false}
              isSearchable={false}
              onSelect={option => setSelectedFilterOption(option)}
              options={filterOptions}
              size="sm"
              value={selectedFilterOption}
            />
          </div>
          {showAddCommentDrawer && (
            <AddCommentDrawer
              handleAddComment={handleAddComment}
              handleCloseCommentDrawer={() => setShowAddCommentDrawer(false)}
            />
          )}
          {comments.length > 0 ? (
            <div data-testid="comments-list">
              {sortCommentsByLatestActivity(comments).map(comment => {
                const replies = commentRepliesMap[comment.uuid];
                if (!comment.replies && replies) {
                  comment.replies = replies;
                  comment.number_of_replies = replies.length;
                }

                return (
                  <CommentItem
                    key={comment.uuid}
                    comment={comment}
                    handleLoadCommentReplies={handleLoadCommentReplies}
                    handleResolveComment={handleResolveComment}
                    selectedFilterOption={selectedFilterOption.value}
                    hasWriteCommentAccess={true}
                    activeReplyDrawerCommentUuid={activeReplyDrawerCommentUuid}
                    setActiveReplyDrawerCommentUuid={setActiveReplyDrawerCommentUuid}
                    handleAddReplyOnComment={handleAddReplyOnComment}
                  />
                );
              })}
            </div>
          ) : (
            <EmptyState
              className="comments-zero-state"
              defaultImgVariant="tasks"
              subtitle={'No open comments'}
              variant="section"
            />
          )}
      </Offcanvas>
    </div>
  );
};

export default CommentsDrawer;
