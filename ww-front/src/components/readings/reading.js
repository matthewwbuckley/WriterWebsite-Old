import React, { Component } from 'react';
import { RatingSelect } from '../piece/ratingSelect'
import { submitReadRating } from '../../apiActions'
import Player from './player'
import ReactPlayer from 'react-player'


export class Reading extends Component{
  constructor(props){
    super(props);

    this.state = {rated: true};

    this.onClick = this.onClick.bind(this)
  }

  componentDidMount(){
    console.log('audio',this.props.readingId);
    let audioFile = `./audio/${this.props.reading.readingId}.mp3`
    this.setState({rated:this.hasUserRated()});

  }

  onClick(num){
    console.log(num);
    submitReadRating(
      this,
      this.props.reading._id,
      this.props.app.state.user.userId,
      num,
      '',
      -1
    )
  }

  hasUserRated(){
    let rated = this.props.reading.ratings.all.map(rating => {
      let userRated = false;
      // if(rating.userId._id === this.props.app.state.user.userId){
      //   userRated = true;
      // }
      return userRated;
    })
    
    this.setState({rated:rated})
  }

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

    let username='';
    if(this.props.reading.userId){
      username = this.props.reading.userId.username
    }

    let rate = '';
    if (!this.state.rated){
      rate = <RatingSelect onClick={this.onClick}/>
    }

    let dateSubmitted = this.formatDate(this.props.reading.datePublished)

    return(
      <div className='audio'>
        <div style={{transform: 'scale(0.9)'}}>
          {rate}
        </div>
        <Player />
        <div className='reading-info'>
          Read on the {dateSubmitted} by {username}
        </div>
        
      </div>

    )
  }
}