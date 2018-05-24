import React, { Component } from 'react';
import { compose } from 'recompose';
import './css/form.css'


export class FormInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
      error:false
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange = async function textInputOnChangeFunction(e){
    this.props.onChange(this.props.variable, e.target.value)
  }

  getValue = function getTextInputValue(){
    return this.state.value;
  }

  render(){
    let placeholder = this.props.placeholder ? this.props.placeholder : ''
    let type = this.props.type ? this.props.type : ''
    return(
      <div className='form-input-container'>
        <input 
          type={type} 
          className='form-input' 
          placeholder={placeholder} 
          value={this.props.value} 
          onChange={this.onChange}
        />
      </div>
    )
  }
}

const withFeatures = compose(
  withLabel,
  withError
)
export const FormInputWithFeatures = withFeatures(FormInput);

function withLabel(Component){
  return function({label, ...rest}){
    return(
      <div className='form-input-container'>
        <div className='form-label'>
          {label}
        </div>
        <Component {...rest} />
      </div>
    )
  }
}

function withError(Component){
  return function({error, ...rest}){
    return(
      <div>
        <div className='form-error'>
          {error}
        </div>
        <Component {...rest} />
      </div>
    )
  }
}


export default FormInput;
