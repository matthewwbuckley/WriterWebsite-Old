import React, { Component } from 'react';
import { PieceSubmissionForm } from '../components/submissions/pieceSubmissionForm';
import { FormButton } from '../components/form/button'

class Write extends Component{
  constructor(props){
    super(props);
    this.state = {
      wordLimit: 10
    }

    this.onClick = this.onClick.bind(this)
  }

  async onClick(value){
    await this.setState({wordLimit: value})
  }

  componentWillMount(){

  }

  render(){
    let info = `


Please take care to check that the piece before submission. This site does not allow editing post publication.
The piece can be added to a series once published.
Once submitted readings can be made of your work.

Please select the most appropriate word limit for your piece:`


    return(
      <div className='content'>
        <div className='content-left'>
          <PieceSubmissionForm wordLimit={this.state.wordLimit} {...this.props}/>
        </div>
        <div className='content-right'>
          {info}
          <div className='form-container-right'>
            <FormButton isActive={true} value='10' text='10' onClick={this.onClick} />
            <FormButton isActive={true} value='100' text='100' onClick={this.onClick} />
            <FormButton isActive={true} value='250' text='250' onClick={this.onClick} />
            <FormButton isActive={true} value='500' text='500' onClick={this.onClick} />
          </div>
        </div>
      </div>
    )
  }
}


export default Write;