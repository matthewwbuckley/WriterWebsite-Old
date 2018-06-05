import React, { Component } from 'react';
import { Reading } from './reading'
import { FormButton } from '../form/button'


export class ReadingList extends Component {
  constructor(props){
    super(props)
  
  }

  componentDidMount(){
    //this.hasUserRated()
  }


  render(){
    

    let readings = this.props.readings.map((reading, i)=> {
      return(
        <div className='readingsContainer'>
          <Reading reading={reading} {...this.props}/>
        </div>
      )
    })
    
    return(
      <div className='readingsContainer'>
        {readings}
      </div>
    )
  }
  
  

}