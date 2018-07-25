import React from 'react';

const Comment = ({
  rating,
  comment,
  username,
  date,
}) => {
  let ratingDisplay = null;
  if (rating === 3) {
    ratingDisplay = (
      <i className="fa fa-plus-circle size3" aria-hidden="true" />
    );
  }
  if (rating === 2) {
    ratingDisplay = (
      <i className="fa fa-plus-circle size2" aria-hidden="true" />
    );
  }
  if (rating === 1) {
    ratingDisplay = (
      <i className="fa fa-plus-circle size1" aria-hidden="true" />
    );
  }
  if (rating === 0) {
    ratingDisplay = (
      <i className="fa fa-circle-o size2" aria-hidden="true" />
    );
  }
  if (rating === -1) {
    ratingDisplay = (
      <i className="fa fa-minus-circle size1" aria-hidden="true" />
    );
  }
  if (rating === -2) {
    ratingDisplay = (
      <i className="fa fa-minus-circle size2" aria-hidden="true" />
    );
  }
  if (rating === -3) {
    ratingDisplay = (
      <i className="fa fa-minus-circle size3" aria-hidden="true" />
    );
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
