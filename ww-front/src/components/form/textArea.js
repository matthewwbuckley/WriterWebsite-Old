import  React, { Component } from 'react';

export class TextArea extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      wordCount: 0
    }

    this.onChange = this.onChange.bind(this);
    this.getValue = this.getValue.bind(this);
  }


  getValue = function getTextInputValue(){
    return this.state.value;
  }

  //https://www.mediacollege.com/internet/javascript/text/count-words.html
  countWords = function textAreaWordCount(s) {
    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /gi,"\n"); // exclude newline with a start spacing
    s = s.replace(/\n/gi," "); // exclude newline with a start spacing
    return s.split(' ').length; 
  }

  onChange = async function textAreaOnValueChange(e) {
    let value = e.target.value;
    let wordCount = this.countWords(value);
    await this.setState({wordCount});
    await this.props.onChange(this.props.variable, value)
    await this.props.onChange('wordCount', this.state.wordCount)
  }

  render(){
    let highlight = (this.state.wordCount > this.props.wordLimit) ? 'span-highlight' : ''
    return(
      <div className='form-input-container'>
        <div className='form-container-right'>
          <span className={highlight}>{this.state.wordCount}/{this.props.wordLimit}</span>
        </div>
        <textarea 
          placeholder={this.props.placeholder} 
          className='form-text-area' 
          rows={this.props.rows} 
          value={this.props.value} 
          onChange={this.onChange}
        ></textarea>
      </div>
    )
  }
} 