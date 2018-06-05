import React, { Component } from 'react';
import { RatingSelect } from '../piece/ratingSelect'
import { submitReadRating } from '../../apiActions'

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



  render(){

    let username='';
    if(this.props.reading.userId){
      username = this.props.reading.userId.username
    }

    let rate = '';
    if (!this.state.rated){
      rate = <RatingSelect onClick={this.onClick}/>
    }

    return(
      <div>
        <div>
          {rate}
        </div>
        <audio id='player' controls>
            <source src="http://storage.googleapis.com/writer-205511.appspot.com/photocopy-machine-daniel_simon.mp3" type="audio/mp3" />
          </audio>
        <div className='piece-info'>
          by {username}
        </div>
      </div>

    )
  }
}