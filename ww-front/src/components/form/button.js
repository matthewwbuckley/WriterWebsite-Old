import React, { Component } from 'react';
import './css/form.css'


export class FormButton extends Component {
  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this)
  }

  onClick = async function formButtonOnClickFunction(e){
    await this.setState({selected:true});
    this.props.onClick(this.props.value)
  }


  render(){
    let classString = this.props.isActive ? 'form-button' : 'form-button inactive';
    return(
      <div className='form-input-container'>
        <button type='button' className={classString} onClick={this.onClick}>{this.props.text}</button>
      </div>
    )
  }
}