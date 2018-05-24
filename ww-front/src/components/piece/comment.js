import React from 'react';

export const Comment = ({rating, comment, username, date}) => {
  let ratingDisplay = null;
  if(rating === 3){
    ratingDisplay = (
      <div className='rating-button'>
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </div>
    )
  }
  if(rating === 2){
    ratingDisplay = (
      <div className='rating-button'>
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </div>
    )
  }
  if(rating === 1){
    ratingDisplay = (
      <div className='rating-button'>
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </div>
    )
  }
  if(rating === 0){
    ratingDisplay = (
      <div className='rating-button'>
        <i class="fa fa-circle-o" aria-hidden="true"></i>
      </div>
    )
  }
  if(rating === -1){
    ratingDisplay = (
      <div className='rating-button'>
        <i class="fa fa-minus-circle" aria-hidden="true"></i>
      </div>
    )
  }
  if(rating === -2){
    ratingDisplay = (
      <div className='rating-button'>
        <i class="fa fa-minus-circle" aria-hidden="true"></i>
        <i class="fa fa-minus-circle" aria-hidden="true"></i>
      </div>
    )
  }
  if(rating === -3){
    ratingDisplay = (
      <div className='rating-button'>
        <i class="fa fa-minus-circle" aria-hidden="true"></i>
        <i class="fa fa-minus-circle" aria-hidden="true"></i>
        <i class="fa fa-minus-circle" aria-hidden="true"></i>
      </div>
    )
  }
  
  return(
    <div className='comment'>
      {ratingDisplay}
      <div className='comment-info'>
        <div>
          {username}
        </div>
        <div>
          {date}
        </div>
      </div>
      <div className='comment-text'>
        {comment}
      </div>
    </div>
  )
}