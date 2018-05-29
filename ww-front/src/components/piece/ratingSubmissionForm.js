import React, { Component } from 'react';
import { TextArea } from '../form/textArea'
import { FormButton } from '../form/button'
import { RatingSelect } from './ratingSelect';
import { submitRating } from '../../apiActions'

export class RatingSubmissionForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      error: true,
      text: '',
      wordCount: 0,
      rating: null
    }
    this.onChange = this.onChange.bind(this);
    this.errorCheck = this.errorCheck.bind(this);
    this.setRating = this.setRating.bind(this);
    this.submit = this.submit.bind(this);
  }

  async onChange(variable, value){
    await this.setState({[variable]: value})
    await this.errorCheck()
  }

  async setRating(value){
    await this.setState({rating: value})
    await this.errorCheck()
  }

  async submit(){
    submitRating(
      this,
      this.props.match.params.pieceId,
      this.props.app.state.user.userId,
      this.state.rating,
      this.state.text,
      this.props.wordLimit
    )
  }

  async errorCheck(){
    let error = false;

    if(this.state.wordCount > this.props.wordLimit){
      error = true;
    }

    if(this.state.rating === null){
      error = true;
    }

    await this.setState({error})
  }

  render(){
    return(
    <div>
      <RatingSelect onClick={this.setRating} />
      <TextArea 
        variable='text' 
        wordLimit={this.props.wordLimit} 
        placeholder='Optionally, submit a comment with your rating.'
        onChange={this.onChange} 
      />
      <div className='form-container-right'>
        <FormButton text='Submit Rating' isActive={!this.state.error} onClick={this.submit}/>
        
      </div>
    </div>
    )
  }
}