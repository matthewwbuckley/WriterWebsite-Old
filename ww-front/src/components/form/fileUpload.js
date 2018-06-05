import React, { Component } from 'react';
import { submitReading } from '../../apiActions';
import { FormButton } from '../form/button'
import './css/form.css'

export class FileUpload extends Component {
  constructor(props){
    super(props);
    this.state={
      file: null,
      error: true,
      filename: 'Please select a file to upload'
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.errorCheck = this.errorCheck.bind(this);
  }
  
  async handleSelect(e){
    await this.setState({file: e.target.files[0], filename:e.target.files[0].name});
    this.errorCheck()
  }

  handleUpload(e){
    // e.preventDefault()
    submitReading(this, this.state.file, this.props.app.state.user.userId, this.props.match.params.pieceId);
  }

  async errorCheck(){
    let error = false;

    if(this.state.file === null){
      error = true
    }

    await this.setState({error})
  }
  
  render() {
    return(
      <div class="form-container">
        
        <form onSubmit={this.handleUpload}>
          <div className="form-container-right">
            
            <input className="file" type="file" id='file' name='file' onChange={this.handleSelect}/>
            <label for='file' id='file-label'><i class="fa fa-headphones" aria-hidden="true"></i> Select Audio File</label>
          </div>
          <div className='form-container-right'>
            {this.state.filename}
          </div>
          <div className='form-container-right'>
          <FormButton isActive={!this.state.error} text='Submit Reading' onClick={this.handleUpload} />
          </div>
        </form>
      </div>
    )
  }
}