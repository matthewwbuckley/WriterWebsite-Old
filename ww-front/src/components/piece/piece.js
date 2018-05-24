import React from 'react';
import { Link } from 'react-router-dom';
import './css/index.css'

export const PieceDisplay = ({author, authorId, datePublished, title, text}) => {
  return(
    <div className="piece-container">
      <div className="piece-title">
        {title}
      </div>
      <div className="piece-info">
        <div className="piece-info">
          Published  {datePublished}  by <Link to='/'>{author}</Link>
        </div>
      </div>
      <div className="piece-text">
        {text}
      </div>
    </div>
  )
}