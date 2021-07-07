import React from 'react';

const Comment = ({
  rating,
  comment,
  username,
  date,
}) => {
  let ratingDisplay = null;

  if (rating > 0) {
    ratingDisplay = (
      <i className=`fa fa-plus-circle size${rating}` aria-hidden="true" />
    )
  } else if (rating < 0) {
    ratingDisplay = (
      <i className=`fa fa-minus-circle size${rating}` aria-hidden="true" />
    )
  } else {
    ratingDisplay = (
      <i className="fa fa-circle-o size2" aria-hidden="true" />
    )
  }

  return (
    <div className="comment">
      {ratingDisplay}
      <div className="comment-info">
        <div>
          {username}
        </div>
        <div>
          {date}
        </div>
      </div>
      <div className="comment-text">
        {comment}
      </div>
    </div>
  );
};

export default Comment;
