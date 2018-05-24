import React, { Component } from 'react';

export class RatingSelect extends Component{
  constructor(props){
    super(props);
    this.state={
      rating: null
    }

    this.onClick = this.onClick.bind(this);
  }

  async onClick(value){
    await this.setState({rating: value})
    await this.props.onClick(value)
  }
  
  render(){  
    return(
      <div className='rating-container'>
        <button className={this.state.rating === -3 ? 'rating-button selected' : 'rating-button'} onClick={ () => {this.onClick(-3)} }>
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
        </button>
        <button className={this.state.rating === -2 ? 'rating-button selected' : 'rating-button'} onClick={ () => {this.onClick(-2)} }>
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
        </button>
        <button className={this.state.rating === -1 ? 'rating-button selected' : 'rating-button'} onClick={ () => {this.onClick(-1)} }>
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
        </button>
        <button className={this.state.rating === 0 ? 'rating-button selected' : 'rating-button'} onClick={ () => {this.onClick(0)} }>
          <i class="fa fa-circle-o" aria-hidden="true"></i>
        </button>
        <button className={this.state.rating === 1 ? 'rating-button selected' : 'rating-button'} onClick={ () => {this.onClick(1)} }>
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </button>
        <button className={this.state.rating === 2 ? 'rating-button selected' : 'rating-button'} onClick={ () => {this.onClick(2)} }>
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </button>
        <button className={this.state.rating === 3 ? 'rating-button selected' : 'rating-button'} onClick={ () => {this.onClick(3)} }>
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </button>

      </div>
    )
  }
}