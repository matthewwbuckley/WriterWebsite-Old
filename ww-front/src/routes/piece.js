import React, { Component } from 'react';
import { PieceDisplay } from '../components/piece/piece';
import { RatingSubmissionForm } from '../components/piece/ratingSubmissionForm';
import { getPiece } from '../apiActions/index';
import { Comment } from '../components/piece/comment';
import { FileUpload } from '../components/form/fileUpload';
import '../components/piece/css/index.css';


class Piece extends Component{
  constructor(props){
    super(props);
    this.state = {
      rated: false,
      user: false,
      revealed: false
    }

    this.refreshPiece = this.refreshPiece.bind(this);
    this.revealRatings = this.revealRatings.bind(this);
  }

  async componentWillMount(){
    this.refreshPiece()
  }

  refreshPiece(userId = undefined){
    let pieceId = this.props.match.params.pieceId;
    getPiece(this, pieceId, userId);
  }

  hasUserRated(){
    let userRated = false;
    this.state.piece.ratings.all.forEach(rating => {
      if(rating.userId._id === this.props.app.state.user.userId){
        userRated = true;
      }
    })
    return userRated;
  }

  revealRatings(){
    this.setState({revealed: !this.state.revealed})
  }

  // will want to move this to a helper file
  //https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number/29272095#29272095
  getGetOrdinal(n) {
    var s=["th","st","nd","rd"],
    v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
  }

  formatDate(dateString){
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'November', 'December'];
    const formattedDate = `${this.getGetOrdinal(date.getUTCDate())} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
    return formattedDate;
  } 

  render(){

    let ratingSubmission = '';
    let ratings = [];
    let revealButton = '';
    // gets new piece if page is changed but this does not unmount
    if(this.state.piece && (this.state.piece._id !== this.props.match.params.pieceId)){
      if(this.state.revealed){
        this.setState({revealed: false})
      }
      if(this.props.app && this.props.app.state && this.props.app.state.user ){
        this.refreshPiece(this.props.app.state.user.userId);
      } else {
        this.refreshPiece();
      }
    }

    
    if(this.props.app && this.props.app.state && this.props.app.state.user ){
      if(!this.state.user){
        this.setState({user: true}, this.refreshPiece(this.props.app.state.user.userId))
      }
      
      if(this.state.piece){
        if(this.hasUserRated()){
        } else { 
          ratingSubmission = (<RatingSubmissionForm {...this.props} wordLimit={this.state.piece.wordLimit/10}/>);
        }
      }
    }

    
    if(this.state.piece && this.state.piece.ratings.all[0] && this.state.piece.ratings.all[0].rating !== null ){
      ratings = this.state.piece.ratings.all.map((rating, i)=> {
        let date = this.formatDate(rating.dateCreated);
        return(
          //<div/>
          <Comment rating={rating.rating} comment={rating.comment} username={rating.userId.username} date={date} />
        )
      })
      revealButton = (<button className='form-button secondary push-up' onClick={this.revealRatings}>{this.state.revealed ? 'Hide Comments' : 'Show Comments'}</button>)
    }

    if(this.state.piece){
      const piece = this.state.piece;
      
      const formattedDate = this.formatDate(piece.datePublished);
       

      return(
        <div className='content-container'>
          <div className='content'>
            <div className='content-left'>
              <PieceDisplay 
                author = {this.state.piece.author.username}
                authorId = {this.state.piece.author._id}
                title = {piece.title}
                text = {piece.text}
                datePublished = {formattedDate}
              />
              <div className='rating-container'>
                {ratingSubmission}
              </div>
              <div className={this.state.revealed ? 'rating-container show' : 'rating-container hide'}>
                {ratings}
              </div>
              {revealButton}
            </div>
            <div className={'content-right'}>
              <FileUpload {...this.props}/>
            </div>
          </div>
        </div>
      );
    }

    return(
      <div>
      </div>
    );
  }
    
}

export default Piece;