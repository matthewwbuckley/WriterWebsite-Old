import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormInputWithFeatures } from '../form/textInput';
import { TextArea } from '../form/textArea';
import { FormButton } from '../form/button';
import { submitPiece } from '../../apiActions/index';


export class PieceSubmissionForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      text: '',
      wordCount: 0,
      error: true
    }

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  async componentWillReceiveProps(newProps){
    await this.setState({wordLimit:newProps.wordLimit})
    await this.errorCheck()
  }

  async onChange(variable, value){
    await this.setState({[variable]: value})
    await this.errorCheck()
  }

  async onClick(){
    if(!this.state.error){
      await submitPiece(this, this.props.app.state.user.userId, this.state.title, this.state.text, this.props.wordLimit);
      if (this.state.piece && this.state.piece._id) {
        window.location = '/piece/' + this.state.piece._id
      }
    }
  }

  async errorCheck(){
    let errorTitle = '';
    let errorText = '';
    let error = false;

    const isFormIncomplete = Boolean(
      this.state.title.length === 0 ||
      this.state.text.length === 0 
    )

    if(isFormIncomplete){
      error = true;
    }

    if(this.state.wordCount > this.state.wordLimit){
      error = true;
    }

    await this.setState({
      error
    })

  }

  render(){

    if(this.state.piece && this.state.piece._id){
      const redirect = '/piece/' + this.state.piece._id
      return(<Redirect to={redirect} />)
    }

    return(
      <div className='form-container'>
        Piece Submission
        <FormInputWithFeatures 
          onChange={this.onChange} 
          variable='title' 
          placeholder='Title of the Piece' 
          label='Title'
          error={this.state.errorUsername}
        />
        <TextArea 
          onChange={this.onChange} 
          variable='text'
          wordLimit={this.props.wordLimit}
          placeholder='Please write you piece here ...' 
        />
        <div className='form-container-right'>
          <FormButton isActive={!this.state.error} text='Publish' onClick={this.onClick} />
        </div>
      </div>
    )
  }

}